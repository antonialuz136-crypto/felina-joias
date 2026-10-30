
const express = require("express");
const cors = require("cors");
const db = require("./database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.send("API da Felíria Joias funcionando!");
});


app.post("/login", (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({
            mensagem: "Preencha o e-mail e a senha."
        });
    }

    const usuario = db.prepare(
        "SELECT * FROM usuarios WHERE email = ?"
    ).get(email);

    if (!usuario || !bcrypt.compareSync(senha, usuario.senha)) {
        return res.status(401).json({
            mensagem: "E-mail ou senha incorretos."
        });
    }

    const token = jwt.sign(
        { id: usuario.id, email: usuario.email },
        process.env.JWT_SECRET || "chave-dev-temporaria",
        { expiresIn: "1h" }
    );

    res.json({
        mensagem: "Login realizado com sucesso!",
        token: token
    });
});


app.post("/cadastro", (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({
            mensagem: "Preencha todos os campos."
        });
    }

    try {
        const senhaProtegida = bcrypt.hashSync(senha, 10);

        db.prepare(
            "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)"
        ).run(nome, email, senhaProtegida);

        res.status(201).json({
            mensagem: "Conta criada com sucesso!"
        });

    } catch (erro) {
        res.status(500).json({
            mensagem: "Erro ao criar a conta."
        });
    }
});


app.listen(3000, () => {
    console.log("Servidor executando na porta 3000");
});

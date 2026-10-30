const formularioLogin = document.getElementById("login-form");

if (formularioLogin) {
    formularioLogin.addEventListener("submit", async function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;

        try {
            const resposta = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, senha })
            });

            const dados = await resposta.json();
            alert(dados.mensagem);
        } catch (erro) {
            alert("Não foi possível conectar ao servidor.");
        }
    });
}

const formularioCadastro = document.getElementById("cadastro-form");

if (formularioCadastro) {
    formularioCadastro.addEventListener("submit", async function (event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;
        const confirmarSenha = document.getElementById("confirmar-senha").value;

        if (senha !== confirmarSenha) {
            alert("As senhas não são iguais!");
            return;
        }

        try {
            const resposta = await fetch("http://localhost:3000/cadastro", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ nome, email, senha })
            });

            const dados = await resposta.json();
            alert(dados.mensagem);
        } catch (erro) {
            alert("Erro encontrado:" + erro.message);
            console.error(erro);
        }
    });
}
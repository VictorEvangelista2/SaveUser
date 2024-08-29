// Validação de preenchimento
function acessar(){
    let loginEmail = document.getElementById('loginEmail').value;
    let loginSenha = document.getElementById('loginSenha').value;
 
    if(!loginEmail || !loginSenha){
        alert('Preencha todos os campos para acessar');
    }
    else{
        
        window.location.href = 'cadastro.html';
        alert('Campos preenchidos com sucesso');
    }
}
 
// Arrays para armazenar dados
var dadosLista = [];
var emailLista = [];
var cpfLista = []; // Novo array para CPF

// Adicionando escutador ao botão de salvar
document.getElementById('salvarBtn').addEventListener('click', salvarUser);

// Função para salvar usuário
function salvarUser() {
    let nomeUser = document.getElementById('nomeUser').value;
    let emailUser = document.getElementById('emailUser').value;
    let cpfUser = document.getElementById('cpfUser').value; // Adicionando CPF
    let msg = document.getElementById('message'); // Elemento para exibir mensagem

    // Validação de nome
    if (!nomeUser) {
        alert("Insira algum nome!");
        return;
    }

    // Validação de email
    if (!emailUser) {
        alert("Informe algum Email válido!!!");
        return;
    }

    // Validação de CPF
    if (!cpfUser) {
        alert("Informe um CPF válido!");
        return;
    }

    if (!validarCPF(cpfUser)) {
        msg.textContent = 'O CPF é inválido!';
        msg.style.color = 'red';
        return;
    } else {
        msg.textContent = 'O CPF é válido!';
        msg.style.color = 'green';
    }

    // Adiciona os valores nos arrays se todas as validações passarem
    dadosLista.push(nomeUser);
    emailLista.push(emailUser);
    cpfLista.push(cpfUser);
    console.log(dadosLista, emailLista, cpfLista);

    // Limpar campos de entrada
    document.getElementById('nomeUser').value = "";
    document.getElementById('emailUser').value = "";
    document.getElementById('cpfUser').value = "";
    
    criaLista();
}

// Função para validar CPF
function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos

    // Estrutura de decisão para verificar quantidade de dígitos e se todos os dígitos são iguais
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false;
    }

    let soma = 0;
    let resto;

    // Validando o primeiro dígito verificador
    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    resto = (soma * 10) % 11;

    if ((resto === 10) || (resto === 11)) {
        resto = 0;
    }
    if (resto !== parseInt(cpf.substring(9, 10))) {
        return false;
    }

    soma = 0;
    // Validando o segundo dígito verificador
    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    resto = (soma * 10) % 11;

    if ((resto === 10) || (resto === 11)) {
        resto = 0;
    }

    if (resto !== parseInt(cpf.substring(10, 11))) {
        return false;
    }

    return true;
}

// Função para criar a lista de usuários na tabela
function criaLista() {
    let tabela = "<tr><th>Nome Usuario</th><th>Email</th><th>CPF</th><th>Ações</th></tr>";
    for (let i = 0; i < dadosLista.length; i++) {
        tabela += "<tr><td>" + dadosLista[i] + "</td><td>" + emailLista[i] + "</td><td>" + cpfLista[i] + "</td><td><button onclick='editar(" + i + ")'>Editar</button><button onclick='excluir(" + i + ")'>Excluir</button></td></tr>";
    }
    document.getElementById('tabela').innerHTML = tabela;
}

// Função para excluir um usuário da lista
function excluir(index) {
    dadosLista.splice(index, 1);
    emailLista.splice(index, 1);
    cpfLista.splice(index, 1); // Exclui também o CPF correspondente
    criaLista(); // Atualiza a tabela após a exclusão
}

// Função para editar um usuário da lista
function editar(index) {
    document.getElementById('nomeUser').value = dadosLista[index];
    document.getElementById('emailUser').value = emailLista[index];
    document.getElementById('cpfUser').value = cpfLista[index]; // Preenche o campo de CPF para edição

    // Remove os valores dos arrays para permitir a edição
    dadosLista.splice(index, 1);
    emailLista.splice(index, 1);
    cpfLista.splice(index, 1);

    criaLista(); // Atualiza a tabela após a remoção para edição
}

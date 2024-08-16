// Validação de preenchimento
function acessar(){
    let loginEmail = document.getElementById('loginEmail').value;
    let loginSenha = document.getElementById('loginSenha').value;
 
    if(!loginEmail || !loginSenha){
        alert('Favor preencher todos os campos');
    }
    else{
        //alert('campos preenchidos com sucesso');
        window.location.href = 'cadastro.html';
    }
}
 
//função de criação de array para armazenamento de nomes
 
var dadosLista = [];
var emailLista = [];
// Array criado para um valor indefinido
 
function salvarUser(){
    let nomeUser = document.getElementById('nomeUser').value;
 
    if(nomeUser){   
        dadosLista.push(nomeUser);
        console.log(dadosLista);   
        criaLista(); 
        document.getElementById('nomeUser').value = "";    
    }
    else{
        alert("Informe algum nome !!!");
    }

    let emailUser = document.getElementById('emailUser').value;
 
    if(emailUser){   
        emailLista.push(emailUser);
        console.log(emailLista);    
        document.getElementById('emailUser').value="";  
        criaLista();  
    }
    else{
        alert("Informe algum Email Válido!!!");
    }
}

function criaLista(){

    let tabela = document.getElementById('tabela').innerHTML = "<tr><th>Nome Usuario</th><th>Email</th><th>Ações</th></tr>";
    for(let i = 0; i <= (dadosLista.length - 1); i ++){
        tabela += "<tr><td>" + dadosLista[i] + "</td><td>" + emailLista[i] + "</td><td> <button onclick='editar(this.parentNode.parentNode.rowIndex)'>Editar</button><button onclick='excluir(this.parentNode.parentNode.rowIndex)'>Excluir</button> </td></tr>";
        document.getElementById('tabela').innerHTML = tabela;
    }
}


// FUNÇÃO PARA EXCLUIR NOME DE LISTA
function excluir(i){
    dadosLista.splice((i - 1), 1);
    emailLista.splice((i - 1), 1);
    document.getElementById('tabela').deleteRow(i);
}

// FUNÇÃO PARA EDITAR NOMES DE LISTA
function editar(i){
    document.getElementById('nomeUser').value = dadosLista[(i - 1)];
    dadosLista.splice(dadosLista[(i - 1)], 1);
    dadosLista.splice(emailLista[(i - 1)], 1);
}



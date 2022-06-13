var btnSignin = document.querySelector("#signin");
var btnSignup = document.querySelector("#signup");

var body = document.querySelector("body");


btnSignin.addEventListener("click", function () {
   body.className = "sign-in-js"; 
});

btnSignup.addEventListener("click", function () {
    body.className = "sign-up-js";
});


document.querySelector("#cadastro-button").addEventListener("click",  cadastro);
document.querySelector("#login-button").addEventListener("click",  login);

function cadastro() {
    var campoNome = document.querySelector("#nome-cadastro");
    var campoEmail = document.querySelector("#email-cadastro");
    var campoSenha = document.querySelector("#senha-cadastro");
    var botaoCadastro = document.querySelector("#cadastro-button");

    botaoCadastro.innerText = "Carregando..."

    var enpointCadastroUsuario = "https://easyvagas.herokuapp.com/user";


    //inicia a requisição para o back
    fetch(enpointCadastroUsuario, {
        method: 'POST',
        headers: {
            "Content-Type":  "application/json"
        },
        body: JSON.stringify(
            { //envia os valores dos campos para a nossa API que está rodando no heroku
                name: campoNome.value, 
                email: campoEmail.value, 
                password: campoSenha.value, 
            }
        )
    }).then(function(response) { //quando o servidor retornar a resposta


        if(response.ok) { //se deu tudo certo na criação do usuário
            
            
            //instancia aviso de sucesso usando a biblioteca sweetalert
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
            }); 

            //lança o aviso na tela do usuário
            Toast.fire({
                icon: 'success',
                title: 'Usuário cadastrado com sucesso!'
            }); 



            //limpa campos
            campoNome.value ="";
            campoEmail.value ="";
            campoSenha.value ="";
            botaoCadastro.innerText = "Cadastrar";

            response.json().then(loginInfo => {
                localStorage.setItem("login-info", JSON.stringify(loginInfo)) //guarda a autorização do usuário no local storage (banco de dados do navegador)
                location.href =  "../Mapa/Mapa.html";  //redireciona para o mapa.
            })
        
        }else if(response.status == 400) { //email inválido
            
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
            }); 
    
            Toast.fire({
                icon: 'error',
                title: 'Opa, parece que você está tentando usar um e-mail inválido... 🤨'
            }); 



        }
    })
    //caso o servidor retorne algum erro
    .catch(function(error) {

        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
        }); 

        Toast.fire({
            icon: 'error',
            title: 'Algo deu errado 🤨'
        }); 
        console.log(error)
    });

}


function login() {

    var campoEmail = document.querySelector("#login-email");
    var campoSenha = document.querySelector("#login-senha");
    var botaoLogin = document.querySelector("#login-button");

    botaoLogin.innerText = "Carregando...";


    var enpointCadastroUsuario = "https://easyvagas.herokuapp.com/user/login";


    //inicia a requisição para o back
    fetch(enpointCadastroUsuario, {
        method: 'POST',
        headers: {
            "Content-Type":  "application/json"
        },
        body: JSON.stringify(
            { //envia os valores dos campos para a nossa API que está rodando no heroku
                email: campoEmail.value, 
                password: campoSenha.value, 
            }
        )
    }).then(function(response) { //quando o servidor retornar a resposta


        if(response.ok) { //se deu tudo certo na criação do usuário
            
            
            //instancia aviso de sucesso usando a biblioteca sweetalert
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
            }); 

            //lança o aviso na tela do usuário
            Toast.fire({
                icon: 'success',
                title: 'logado!'
            }); 



            //limpa campos
            campoEmail.value ="";
            campoSenha.value ="";
            botaoLogin.innerText = "Entrar";

            response.json().then(loginInfo => {
                localStorage.setItem("login-info", JSON.stringify(loginInfo)) //guarda a autorização do usuário no local storage (banco de dados do navegador)
                location.href =  "../Mapa/Mapa.html";  //redireciona para o mapa.
            })

        }else if (response.status == 404) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
            }); 
    
            Toast.fire({
                icon: 'error',
                title: 'E-mail ou senha está incorreto...🤨'
            }); 
            botaoLogin.innerText = "Entrar";
        }




    })
    //caso o servidor retorne algum erro
    .catch(function(error) {

        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
        }); 

        Toast.fire({
            icon: 'error',
            title: 'Alguma coisa deu errado🤨'
        }); 
        console.log(error)
    });





}
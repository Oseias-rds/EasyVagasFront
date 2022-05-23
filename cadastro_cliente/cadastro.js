var btnSignin = document.querySelector("#signin");
var btnSignup = document.querySelector("#signup");

var body = document.querySelector("body");


btnSignin.addEventListener("click", function () {
   body.className = "sign-in-js"; 
});

btnSignup.addEventListener("click", function () {
    body.className = "sign-up-js";
})


document.querySelector("#btn-cadastrar").addEventListener("click", cadastrarCliente);

document.querySelector("#btn-entrar").addEventListener("click", e => {

});



function cadastrarCliente() {
    const nome = document.querySelector("#nome").value;
    const email = document.querySelector("#email").value;
    const cnpjOuCpf = document.querySelector("#cnpjOuCpf").value;
    const senha = document.querySelector("#senha");
    const senhaCheck = document.querySelector("#senha-check");


    if(senha.value !== senhaCheck.value) {
        alert("Senhas não estão idênticas");
        senha.value = "";
        senhaCheck.value = "";
    }



    var enpointCadastroCliente = "https://easyvagas.herokuapp.com/client/";


    //inicia a requisição para o back
    fetch(enpointCadastroCliente, {
        method: 'POST',
        headers: {
            "Content-Type":  "application/json"
        },
        body: JSON.stringify(
            { //envia os valores dos campos para a nossa API que está rodando no heroku
                "name" : nome,
                "email" : email,
                "cnpj" : cnpjOuCpf,
                "password" : senhaCheck.value,
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


            //Guarda as informações do usuário no front
            response.json().then(json => {
                sessionStorage.setItem("user", JSON.stringify(json));
            });

            location.href =  "../main_page_cliente/cadastro_auxiliar.html";  //redireciona para o mapa.
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
function loginCliente() {}
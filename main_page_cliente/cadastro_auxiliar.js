const btnFinish = document.querySelector("#finished-button");


document.querySelector("#cep-estacionamento").addEventListener("blur", e => {

    var cep = e.target.value;

    //vamos chamar a api de cep para consultar qual é o nome da rua e cidade do estacionamento
    var API_DE_CEP = `https://viacep.com.br/ws/${cep}/json/`;

    

    fetch(API_DE_CEP).then(respostaServidor => {

        respostaServidor.json().then(informacoes => {

            if(informacoes.erro) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: true,
                }); 
        
                Toast.fire({
                    icon: 'error',
                    title: 'Infelizmente esse local ainda não é suportado, mas estamos trabalhando duro para que algum dia, você possa fazer parte do Easy Vagas',
                }); 
                return
            }

            var campo = document.querySelector("#local-estacionamento");

            campo.value = ` ${informacoes.logradouro}, ${informacoes.bairro} - ${informacoes.localidade}/ ${informacoes.uf} `;


            consultaLatitudeLongitude(informacoes.bairro, informacoes.uf).then(info => {

                if(info.length > 0) {
                    document.querySelector("#lat").value = info[0].lat;
                    document.querySelector("#lon").value =  info[0].lon;
                }else{
    
                    //caso a API de latitude e longitude não consiga encontrar as informações
                    //preenchemos os campos com os valores da localidade;

                    consultaLatitudeLongitude(informacoes.localidade, informacoes.uf).then(info2 => {
                        if(info2.length > 0) {
                            document.querySelector("#lat").value = info2[0].lat;
                            document.querySelector("#lon").value =  info2[0].lon;
                        }
                    });

                    
                }




            });
    



        });

    });

});

btnFinish.addEventListener("click" , e => {

    const nomeEstacionamento = document.querySelector("#nome-estacionamento");
    const local = document.querySelector("#local-estacionamento");
    const vagas = document.querySelector("#vagas-estacionamento");
    const complemento = document.querySelector("#dados-complementares");
    const cep = document.querySelector("#cep-estacionamento");
    const latitude = document.querySelector("#lat");
    const longitude = document.querySelector("#lon");
    
    var enpointCadastroClienteAuxiliar = "https://easyvagas.herokuapp.com/client/auxiliary";



    //inicia a requisição para o back
    fetch(enpointCadastroClienteAuxiliar, {
        method: 'POST',
        headers: {
            "Content-Type":  "application/json"
        },
        body: JSON.stringify(
            { //envia os valores dos campos para a nossa API que está rodando no heroku
                "name" : nomeEstacionamento.value,
                "email" : JSON.parse(sessionStorage.getItem("user")).email,
                "locale" : local.value,
                "cep" : cep.value,
                "lat" : latitude.value,
                "lon" : longitude.value,
                "complementary" : complemento.value,
                "vacancies" : vagas.value,
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
                title: 'Tudo certo! Obrigado.'
            }); 

            location.href =  "./main_page_cliente.html";  //redireciona para o mapa.
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


});

async function consultaLatitudeLongitude(localidade, estado) {
    
    //Usaremos apenas o bairro do estacionamento para pegar a latitude e longitude 
    //para evitar complexidade que a API do mapquest precisaria se usassemos o endereço completo
    var API_DE_LATITUDE_LONGITUDE = `https://open.mapquestapi.com/nominatim/v1/search.php?key=LpiYWCp1XH2FgjJYXGDFGxTPGEU6LBGy&format=json&q=${localidade} ${estado}&countrycodes=BR`;

    try {
        const resposta = await fetch(API_DE_LATITUDE_LONGITUDE);
        return resposta.json();
    } catch (err) {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
        });

        Toast.fire({
            icon: 'error',
            title: 'Alguma coisa deu errado ao consultar a latitude e longitude'
        });
    }
}
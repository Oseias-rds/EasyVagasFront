const user = JSON.parse(sessionStorage.getItem("user"));

document.querySelector("#letraInicial").innerText = user.name.split("")[0].toUpperCase();
document.querySelector("#letraInicial").setAttribute("title", user.name);
const list = document.querySelector("#fatherList");

function mountView(map) {
    var i = 1;
    for(index in map) {
        const user = map[index];

        var template = `
        
            <li class="list-inline-item" style="width: 18rem; border: 1px solid black; border-radius: 10px">                        
                <div class="card-body">
                    <h1 class="card-title">Vaga ${i}</h4>
                    <p class="card-text">${user.email} reservou essa vaga</p>
                    <p href="#" class="">Data: ${moment().format("DD/MM/yyyy") }</p>
                </div>
            </li>
        `

        list.innerHTML += template;
        i+=1

    }
}

var enpointCadastroUsuario = `https://easyvagas.herokuapp.com/parking/${user.email}`;


//inicia a requisição para o back
fetch(enpointCadastroUsuario).then(function(response) {

    response.json().then(parkingInfo => {
        console.log(parkingInfo)
        mountView(parkingInfo.relacionamento)
    });
    
});
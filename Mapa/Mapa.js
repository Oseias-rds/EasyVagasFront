function reservarVaga(email, estacionamento){
    const API_EASY_VAGAS = `https://easyvagas.herokuapp.com/parking/reserve`; //endpoint para reservar a vaga.
    const autorizacaoDoUsuario = JSON.parse(localStorage.getItem("login-info"));
  
    fetch(API_EASY_VAGAS, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            "id" : autorizacaoDoUsuario.id,
            "email" : email,
            "numero" : 1 // reservar uma vaga
        })
    }).then(respostaServidor => {
        if(respostaServidor.ok){

            //configura o aviso
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
            }); 

            //lança o aviso na tela do usuário
            Toast.fire({
                icon: 'success',
                title: `Vaga no estacionamento ${estacionamento} reservada com sucesso.`
            }); 

        }
    });
   
}
require([
    "esri/config",
     "esri/Map",
     "esri/views/MapView",
     "esri/widgets/Search",
     "esri/Graphic",
     "esri/layers/GraphicsLayer",
 
   ], function (esriConfig,Map, MapView, Search, Graphic, GraphicsLayer) {

     esriConfig.apiKey = "AAPK34314164c7b942248c11e2d4a27e2b73FWOvfLlytB1UscawdK5SX5scpcWGY8oK5Ebj-CnL54h5zfOUc04IbKYQ6xxaEzvO";
     const map = new Map({
       basemap: "arcgis-navigation" // Basemap layer
     });


     const view = new MapView({
         map: map,
         center: [-34.8631778, -7.9507823], //latitude e longitude
         zoom: 10, // scale: 72223.819286
         container: "viewDiv",
         constraints: {
             snapToZoom: false
         }
     });


     const graphicsLayer = new GraphicsLayer();
     map.add(graphicsLayer);

    
     const simpleMarkerSymbol = {
         type: "simple-marker",
         color: [255, 0, 0],  // Red
         outline: {
             color: [255, 255, 255], // White
             width: 1
         }
     };

     const API_EASY_VAGAS = `https://easyvagas.herokuapp.com/parking/get-all`; //endpoint para pegar tds os estacionamentos cadastrados.
     
     fetch(API_EASY_VAGAS).then(respostaServidor => {
         respostaServidor.json().then(estacionamentos => {
            console.log(estacionamentos)
            estacionamentos.forEach(estacionamento => {

                
                const point = { //Create a point
                    type: "point",
                    longitude: Number(estacionamento.lon), 
                    latitude: Number(estacionamento.lat)
                };
                const popupTemplate = {
                    title: "{Name}",
                    content: function(feature) {
                        const obj = feature.graphic.attributes

                        const div = document.createElement("div");
                        
                        div.innerHTML = `${obj.vacancies} vagas livres <br><br><br><br> 
                        
                        
                        
                            <button class="btn btn-primary" onclick="reservarVaga('${estacionamento.email}', '${estacionamento.name}')"> Reservar vaga 🚗 </button>
                        
                        `
                        return div
                    }
                }
                const attributes = {
                    Name: estacionamento.name,
                    vacancies: Number(estacionamento.vacancies) - Number(estacionamento.reserved)
                }

                const pointGraphic = new Graphic({
                    geometry: point,
                    symbol: simpleMarkerSymbol,
                    attributes: attributes,
                    popupTemplate: popupTemplate
                });
                graphicsLayer.add(pointGraphic);


            });


             console.log(estacionamentos);
         });
     });

   });

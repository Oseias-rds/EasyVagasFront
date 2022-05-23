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

            estacionamentos.forEach(estacionamento => {

                
                const point = { //Create a point
                    type: "point",
                    longitude: Number(estacionamento.lon), 
                    latitude: Number(estacionamento.lat)
                };
                const popupTemplate = {
                    title: "{Name}",
                    content: "{vacancies} vagas livres"
                }
                const attributes = {
                    Name: estacionamento.name,
                    vacancies: estacionamento.vacancies
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

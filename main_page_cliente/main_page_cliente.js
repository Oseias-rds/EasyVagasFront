const user = JSON.parse(sessionStorage.getItem("user"));

document.querySelector("#letraInicial").innerText = user.name.split("")[0].toUpperCase();
document.querySelector("#letraInicial").setAttribute("title", user.name);
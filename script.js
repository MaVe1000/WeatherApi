function consultarClima() {
  const ciudad = document.querySelector("#ciudad").value.trim();
  const apiKey = "fc63d7944314f573bf96a4b3bc6c2306"; // Clave personal de OpenWeatherMap----> fc63d7944314f573bf96a4b3bc6c2306    key profe:  799edad109b009ce1a9a4a6bc519ccf1
  //const pais = document.querySelector("#pais").value;
  if (ciudad === "") {
    document.getElementById("resultado").innerHTML =
      "Por favor, escribe una ciudad.";
    return;
  }

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&APPID=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.cod === 200) {
        const celsius = Math.round(data.main.temp - 273.15);
        document.getElementById("resultado").innerHTML = `
              <h2>${data.name}, ${data.sys.country}</h2>
              <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}">
              <p>Temperatura: ${celsius} °C</p>
              <p>Estado: ${data.weather[0].description}</p>
            `;
      } else {
        document.getElementById("resultado").innerHTML =
          "Ciudad no encontrada.";
      }
    })
    .catch((error) => {
      console.error("Error al consultar el clima:", error);
      document.getElementById("resultado").innerHTML =
        "Error al consultar el clima.";
    });
  document.getElementById("ciudad").value = ""; // Limpiar el campo de entrada después de la consulta
}

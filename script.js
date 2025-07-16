function consultarClima() {
  const ciudad = document.querySelector("#ciudad").value.trim();
  if (ciudad === "") {
    document.getElementById("resultado").innerHTML =
      "Por favor, escribe una ciudad.";
    return;
  }

  fetch('https://backendweatherapi-ny6r.onrender.com/api/clima?ciudad=' + ciudad)
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

var fetch_wetaher = place => {
  fetch("/weather-app?address=" + place).then(response => {
    response.json().then(data => {
      //   console.log(data);

      if (data.error) {
        // document.getElementById("forecast").innerHTML = data.error
        document.getElementById("forecast").textContent = data.error;
      } else {
        document.getElementById("forecast").textContent =
          data.forecastData.summary +
          " Temperature: " +
          data.forecastData.temperature +
          " Chance of Rain: " +
          data.forecastData.chanceofrain +
          " Max Temp: " +
          data.forecastData.temperatureMax +
          " Min Temp: " +
          data.forecastData.temperatureMin;
      }
    });
  });
};

const weather_form = document.querySelector("form");
const input = document.querySelector("input");
weather_form.addEventListener("submit", e => {
  e.preventDefault();
  //   console.log(input.value);
  fetch_wetaher(input.value);
});

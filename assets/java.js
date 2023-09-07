$(function () {
  var lat;
  var lon;
  var currentTemp;
  var currentWind;
  var currentHumid;
  var currentMain;
  var currentWeatherUrl;
  var currentWeatherDiv;
  var city;

  ("https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=cc6f6bc9f9f94c4868709006cb781c83");
  $("#searchBtn").on("click", async function () {
    await getLatLon();
    await getCurrentWeather();
    await getWeather();
  });

  async function getCurrentWeather() {
    var currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=cc6f6bc9f9f94c4868709006cb781c83`;

    await fetch(currentWeatherUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        $("#currentTemp").text(data.main.temp);
        $("#currentWind").text(data.main.speed);
        $("#currentHumid").text(data.main.humidity);
        $("#currentMain").text(data.weather[0].main);
        currentTemp = data.main.temp;
        currentWind = data.wind.speed;
        currentHumid = data.main.humidity;
        currentMain = data.weather[0].main;
      });
  }

  async function getLatLon() {
    city = $("#cityInput").val();
    $("#cityName").text(city);
    var latLonUrl =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      ",us&appid=cc6f6bc9f9f94c4868709006cb781c83";

    await fetch(latLonUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        lat = data.city.coord.lat;
        lon = data.city.coord.lon;
      });
    console.log("lat", lat);
  }

  async function getFiveDayForcast() {
    var weatherUrl =
      "https://api.openweathermap.org/data/2.5/forecast?lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=cc6f6bc9f9f94c4868709006cb781c83";

    await fetch(weatherUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
      });
  }
});
// var $div = $("<div>");
// $div.click(function(){ /* ... */ });
// $("#box").append($div);

$(function () {
  var lat;
  var lon;
  var city;
  var historicalCities = [];

  function createHistoricalBtn(city) {
    var but = $("<button></button>").text(city);
    but.click(async function () {
      $("#cityInput").val($(this).text());
      await getLatLon();
      await getCurrentWeather();
      await getFiveDayForcast();
    });
    $("#historicalBtns").append(but);
  }

  $("#searchBtn").on("click", async function () {
    await getLatLon();
    await getCurrentWeather();
    await getFiveDayForcast();
    $(".hidden").addClass("visible").removeClass("hidden");

    var city = $("#cityInput").val();
    var exsists = false;
    for (index in historicalCities) {
      if (historicalCities[index] === city) {
        exsists = true;
      }
    }
    if (!exsists) {
      createHistoricalBtn(city);
      historicalCities.push(city);
    }
  });

  async function getCurrentWeather() {
    var currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=cc6f6bc9f9f94c4868709006cb781c83`;

    await fetch(currentWeatherUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        $("#currentTemp").text(
          "Current Temperature: " + data.main.temp + " Fahrenheit"
        );
        $("#currentWind").text(
          "Current Windspeeds: " + data.wind.speed + " Mph"
        );
        $("#currentHumid").text(
          "Current Humidity: " + data.main.humidity + " % "
        );
        $("#currentMain").text("Current Conditions: " + data.weather[0].main);
        $("#currentIcon").attr(
          "src",
          "assets/images/" + data.weather[0].icon + ".png"
        );
        $("#currentDate").text("Todays Date: " + convertDate(data.dt));
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
  }

  async function getFiveDayForcast() {
    var weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=cc6f6bc9f9f94c4868709006cb781c83`;

    await fetch(weatherUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        $("#temp0").text(
          "Temperature: " + data.list[0].main.temp + " Fahrenheit "
        );
        $("#wind0").text("Windspeed: " + data.list[0].wind.speed + " Mph");
        $("#humid0").text("Humidity: " + data.list[0].main.humidity);
        $("#main0").text("Conditions: " + data.list[0].weather[0].main);
        $("#date1").text("Date: " + convertDate(data.list[0].dt));
        $("#dayOneIcon").attr(
          "src",
          "assets/images/" + data.list[0].weather[0].icon + ".png"
        );
        $("#temp1").text(
          "Temperature: " + data.list[6].main.temp + " Fahrenheit "
        );
        $("#wind1").text("Windspeed: " + data.list[6].wind.speed + " Mph");
        $("#humid1").text("Humidity: " + data.list[6].main.humidity);
        $("#main1").text("Conditions: " + data.list[6].weather[0].main);
        $("#date2").text("Date: " + convertDate(data.list[6].dt));
        $("#temp2").text(
          "Temperature: " + data.list[0].main.temp + " Fahrenheit "
        );
        $("#wind2").text("Windspeed: " + data.list[14].wind.speed + " Mph");
        $("#humid2").text("Humidity: " + data.list[14].main.humidity);
        $("#main2").text("Conditions: " + data.list[14].weather[0].main);
        $("#date3").text("Date: " + convertDate(data.list[14].dt));
        $("#temp3").text(
          "Temperature: " + data.list[22].main.temp + " Fahrenheit "
        );
        $("#wind3").text("Windspeed: " + data.list[22].wind.speed + " Mph");
        $("#humid3").text("Humidity: " + data.list[22].main.humidity);
        $("#main3").text("Conditions: " + data.list[22].weather[0].main);
        $("#date4").text("Date: " + convertDate(data.list[22].dt));
        $("#temp4").text(
          "Temperature: " + data.list[30].main.temp + " Fahrenheit "
        );
        $("#wind4").text("Windspeed: " + data.list[30].wind.speed + " Mph");
        $("#humid4").text("Humidity: " + data.list[30].main.humidity);
        $("#main4").text("Conditions: " + data.list[30].weather[0].main);
        $("#date5").text("Date: " + convertDate(data.list[30].dt));
      });
  }
});

function convertDate(unixDate) {
  var date = new Date(unixDate * 1000);

  return date.getMonth() + "-" + date.getDate() + "-" + date.getFullYear();
}

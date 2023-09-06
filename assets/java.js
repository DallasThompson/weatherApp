var buttons = document.querySelectorAll("button");
var weatherUrl =
  "https://api.openweathermap.org/data/2.5/forecast?q=Denver,us&appid=cc6f6bc9f9f94c4868709006cb781c83";

for (var i = 0; i < buttons.length; i++) {
  if (buttons[i].id !== "searchBtn") {
    buttons[i].classList.add("cityBtn");
  } else {
    buttons[i].classList.add("getWeatherBtn");
  }
}
fetch(weatherUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });

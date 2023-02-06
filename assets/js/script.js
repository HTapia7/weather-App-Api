// API key
var key = "8e250082de660cb836b05dc1a82ad502";
var userForm = document.querySelector("#user-form");
var cityInput = document.querySelector("#city-input");
var cityContainer = document.querySelector("#city-container");
var citySearchTerm = document.querySelector("#city-search-term");
var currentWeather = document.querySelector("#current-weather");
var previousCity = document.getElementById("search-container");
var fiveDay = document.querySelector("#forecast-cards");

var newCity = [];

// search city form submission 
var formSubmitHandler = function(event) {
    event.preventDefault();

    var city = cityInput.value.trim();

    if (city) {
        getCityWeather(city);
        getForecast(city);

        newCity.push(city);
        localStorage.setItem("city", JSON.stringify(newCity));

        cityInput.value = "";

     } else {
        alert("Please enter a City name");
    }
};

// // clicking on previous searched city
var clickHandler = function (event) {

    var clickCity = event.currentTarget.textContent;

    getCityWeather(clickCity);
    getForecast(clickCity);
};

// requesting Current Weather API
var getCityWeather = function(city) {
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + key;

    fetch(apiURL).then(function(response) {
        if (response.ok) {
            response.json()
                .then(function(data) {
                displayCityWeather(data, city);
            });
        } else {
            alert("Error:" + response.statusText);
        }
    })
    .catch(function(error) {
        alert("Unable to connect to Open Weather");
    })

}

// Displaying current weather data 
var displayCityWeather = function(city, searchTerm) {

    cityContainer.textContent = '';
    citySearchTerm.textContent = searchTerm;

    var displayCurrentDate = document.querySelector("#city-current-date");
    var currentDate = moment();
    displayCurrentDate.textContent = currentDate.format("(L)");

    // weather icon 
    var displayIcon = document.querySelector("#city-current-icon");
    var currentIcon = "https://openweathermap.org/img/wn/" + city.weather[0].icon + "@2x.png"
    displayIcon.setAttribute ("src", currentIcon);

    // temperature 
    var displayTemp = document.querySelector("#temp-input");
    var currentTemp = Math.round(city.main.temp) + " °F";
    displayTemp.textContent = currentTemp; 

    // humidity
    var displayHumidity = document.querySelector("#humidity-input");
    var currentHumidity = city.main.humidity + "%";
    displayHumidity.textContent = currentHumidity; 

    // wind speed 
    var displayWind = document.querySelector("#wind-input");
    var currentWind = city.wind.speed + " MPH";
    displayWind.textContent = currentWind;

    // display list items
    var newCity = document.createElement("li");
    newCity.className = "list-group-item";
    newCity.textContent = searchTerm;
    newCity.addEventListener("click", clickHandler);
    previousCity.appendChild(newCity);
};


// 5 day 
var getForecast = function(city) {
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&cnt=6&appid=" + key;

    fetch(forecastURL)
    .then(function(response) {
        if (response.ok) { response.json()
            .then(function(data) {
                displayForecast(data.list);
            });
        } else {
            alert("Error:" + response.statusText);
        }
    })

    .catch(function(err) {
        alert("Unable to connect to Open Weather");
    })
};

// display 5 days
var displayForecast = function (list) { 

        for (var i = 0; i <= 4; i++) {

        //date
        var displayDay1 = document.querySelector("#date-0");
        var forecastDay1 = moment().add(1, "days").format("L");
        displayDay1.textContent = forecastDay1;

        var displayDay2 = document.querySelector("#date-1");
        var forecastDay2 = moment().add(2, "days").format("L");
        displayDay2.textContent = forecastDay2;

        var displayDay3 = document.querySelector("#date-2");
        var forecastDay3 = moment().add(3, "days").format("L");
        displayDay3.textContent = forecastDay3;

        var displayDay4 = document.querySelector("#date-3");
        var forecastDay4 = moment().add(4, "days").format("L");
        displayDay4.textContent = forecastDay4;

        var displayDay5 = document.querySelector("#date-4");
        var forecastDay5 = moment().add(5, "days").format("L");
        displayDay5.textContent = forecastDay5;

        // temp
        var displayTemp = document.querySelector(`#temp-${i}`);
        var forecastTemp = "Temp: " + list[i].main.temp + " °F";
        displayTemp.textContent = forecastTemp; 

        //humidity
        var displayHumidity = document.querySelector(`#humidity-${i}`);
        var forecastHumidity = "Humidity: " + list[i].main.humidity + "%";
        displayHumidity.textContent = forecastHumidity;
        
        // Wind
        var displayWind = document.querySelector(`#wind-${i}`);
        var currentWind = "Wind Speed: " + list[i].wind.speed + " MPH";
        displayWind.textContent = currentWind;

        // weather icons 
        var displayIcon1 = document.querySelector("#city-icon-1");
        var currentIcon1 = "https://openweathermap.org/img/wn/" + list[1].weather[0].icon + "@2x.png"
        displayIcon1.setAttribute ("src", currentIcon1);

        var displayIcon2 = document.querySelector("#city-icon-2");
        var currentIcon2 = "https://openweathermap.org/img/wn/" + list[2].weather[0].icon  + "@2x.png"
        displayIcon2.setAttribute ("src", currentIcon2);

        var displayIcon3 = document.querySelector("#city-icon-3");
        var currentIcon3 = "https://openweathermap.org/img/wn/" + list[3].weather[0].icon  + "@2x.png"
        displayIcon3.setAttribute ("src", currentIcon3);

        var displayIcon4 = document.querySelector("#city-icon-4");
        var currentIcon4 = "https://openweathermap.org/img/wn/" + list[4].weather[0].icon  + "@2x.png"
        displayIcon4.setAttribute ("src", currentIcon4);

        var displayIcon5 = document.querySelector("#city-icon-5");
        var currentIcon5 = "https://openweathermap.org/img/wn/" + list[5].weather[0].icon  + "@2x.png"
        displayIcon5.setAttribute ("src", currentIcon5);

        }
}; 

// search button 
userForm.addEventListener("submit", formSubmitHandler);



var apiKey = "eb36efeec9e8db03dceda4aa497b1c1f"
var currentWeather = document.querySelector("#currentWeather")
var forecast = document.querySelector("#forecast")
var cityName = document.querySelector('#cityName')
var forecastContainer = document.querySelector('#forecastContainer')

var searchHistory = JSON.parse(localStorage.getItem("history"))

// listening for search
document.getElementById("searchButton").addEventListener("click",function(){
    getCityWeather()
    
})


//pulling the info inside input
function getCityWeather() {
    let cityInput = document.getElementById("userSearch").value.trim();
    getOpenWeatherMapInfo(cityInput);

};

function setSearchHistory(cityName) {
    searchHistory = getSearchHistory()
    if (!searchHistory.hasOwnProperty(cityName)) {
        searchHistory[cityName] = true
    }
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    renderSearchHistory()
}

function getSearchHistory() {
    let searchHistory = localStorage.getItem("searchHistory")

    if (searchHistory === undefined || searchHistory === null) {
        return {}
    }
    return JSON.parse(searchHistory)
}

// Adds all cities from the search history to the side of the page
function renderSearchHistory() {
    searchHistory = getSearchHistory()
    let cities = Object.keys(searchHistory);

    // Delete "searchHistory" div from html if it exists

    
    for (var i = 0; i < cities.length; i++) {
        console.log('searchHistory: ' + cities[i])
          // Append inner div to the string
    }

}

var getOpenWeatherMapInfo = function(currentCityInfo){
    var requestUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + currentCityInfo + "&appid="+ apiKey;
        fetch(requestUrl).then(function(response) {
            response.json().then(function(data) {   
                console.log(data) 

                var latitude = data.city.coord.lat;
                var longitude = data.city.coord.lon;
                var nameOfCity = data.city.name;

                console.log(latitude)
                console.log(longitude)
                console.log(nameOfCity)
                setSearchHistory(nameOfCity)
                                               
                var secondUrl ="https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon="+ longitude + "&exclude=minutely,hourly,alert&units=imperial&appid="+ apiKey;

                fetch(secondUrl).then(function(response){
                    response.json().then(function(data){
                        console.log(data)

                        var date = new Date(data.current.dt *1000)
                                const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
                                var day = weekdays[date.getDay()]
                                var dd = date.getDate()
                                var mm = date.getMonth()
                                var yyyy = date.getFullYear()
                                console.log(date)

                        $("#cityName").text(nameOfCity + ": " + day + "/" + mm + "/" + dd + "/" + yyyy)

                        displayCurrentWeather(data)
                        //calling the data in current weather
                        displayForecast(data)
                    })
                })
           })   
        })     
    }

    //pulling the data into the function
function displayCurrentWeather(data) { 
    const {icon} = data.current.weather[0];
    const {temp, wind_speed, humidity, uvi} = data.current;

    var colorBlock ="";   
    if (uvi > 7) {
      $(colorBlock) = "bg-danger";
    } else if (uvi > 4 && uvi < 7) {
      colorBlock = "bg-warning";
    } else if (uvi < 4) {
      colorBlock = "bg-success";
    };

    currentWeather.innerHTML = `<div class="current-data card-body">
        <img scr="https://openweathermap.org/img/wn/${icon}.png">
            <div class = "card-text">Temp: ${temp}F</div>
            <div class = "card-text">Wind: ${wind_speed}mph</div>
            <div class = "card-text">Humidity: ${humidity}%</div>
            <p class = "card-text ${colorBlock}">UV Index:${uvi}</p>
        </div>`;
    };

//function to display the 5 day forecast
function displayForecast(data) {

    for (var i = 1; i <= 5; i++) {
        var weatherData = {
            date: data.daily[i].dt,
            temp: data.daily[i].temp.day,
            wind_speed: data.daily[i].wind_speed,
            humidity: data.daily[i].humidity,
            icon: data.daily[i].weather[0].icon,
            };
        

    var currentDate = moment.unix(weatherData.date).format("MM/DD/YYYY");

    //append the 5 day into html        
    document.getElementById (
        "forecast-" + i
    ).innerHTML = `<div class="card" id="day-card">
        <div class = "card-body text-center">
            <h5 class = "card-title">${currentDate}</h5>
            <div><img src="https://openweathermap.org/img/wn/${weatherData.icon}.png"></div>
            <div class = "card-text">Temp: ${weatherData.temp}°F</div>
            <div class = "card-text">Wind: ${weatherData.wind_speed}mph</div>
            <div class = "card-text">Humidity: ${weatherData.humidity}%</div>
        </div>
        </div>`;
    }
    };



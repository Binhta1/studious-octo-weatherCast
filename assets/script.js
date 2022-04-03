var searchBtn = document.querySelector("#searchButton")
var searchCity = document.querySelector("#userSearch")
var apiKey = "eb36efeec9e8db03dceda4aa497b1c1f"
var currentWeather = document.querySelector("#currentWeather")
var forecast = document.querySelector("#forecast")
var cityName =document.querySelector('#cityName')
var forecastContainer = document.querySelector('#forecastContainer')


var getCityWeather = function(currentCityInfo){
    var requestUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + currentCityInfo + "&appid="+ apiKey;
        fetch(requestUrl).then(function(response) {
            response.json().then(function(data) {   
                console.log(data) 

                var latitude = data.city.coord.lat;
                var longitude = data.city.coord.lon;
                var nameOfCity =data.city.name;

                console.log(latitude)
                console.log(longitude)
                console.log(nameOfCity)
                
                //cityName.innerHTML= `<h3 class="current-city card-title">${nameOfCity}</h3>`
                

                var secondUrl ="https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon="+ longitude + "&exclude=minutely,hourly,alert&units=imperial&appid="+ apiKey;

                fetch(secondUrl).then(function(response){
                    response.json().then(function(data){
                        console.log(data)

                        var date = new Date(data.current.dt *1000)
                                const weekdays = ["Sunday","Monday","Tuesda","Wednesday","Thursday","Friday","Saturday"]
                                var day = weekdays[date.getDay()]
                                var dd = date.getDate()
                                var mm = date.getMonth()
                                var yyyy = date.getFullYear()
                                console.log(date)

                        $("#cityName").text(nameOfCity + ": " + day + "/" + mm + "/" + dd + "/" + yyyy)

                        displayCurrentWeather(data)
                        //calling the data in current weather

                    })
                })
           })   
        })     
    }

    //pulling the data into the function
function displayCurrentWeather(data) { 
    const {icon} = data.current.weather[0];
    const {temp, wind_speed, humidity, uvi} = data.current;
    var colorBlock ="bg-danger";

    currentWeather.innerHTML = `<div class="current-data card-body">
        <img scr="https://openweathermap.org/img/wn/${icon}.png">
        <div class = "card-text">Temp: ${temp}F</div>
        <div class = "card-text">Wind: ${wind_speed}mph</div>
        <div class = "card-text">Humidity: ${humidity}%</div>
        <div class = "card-text">Wind: ${colorBlock}">UV Index:${uvi}</div>
        </div>`;

}



function displayForecast(data) {
    for (var i = 1; i <= 5; i++) {
        var weatherData = {
            date: data.daily[i].dt,
            Temp: data.daily[i].temp.day,
            wind_speed: data.daily[i].wind_speed,
            humidity: data.daily[i].humidity,
            icon: data.current.weather[0].icon
        };
    var currentDate = moent.unix(weatherData.date).format("MM/DD/YYYY");

    document.getElementById (
        "forecast-" + i
    ).innerHTML = `<div class="card" id="day-card:> 
        <div><img src="https://openweathermap.org/img/wn/${weatherData.icon}.png"></div>
        <div class = "card-text">Temp: ${weatherData.temp}°F</div>
        <div class = "card-text">Wind: ${weatherData.wind_speed}mph</div>
        <div class = "card-text">Humidity: ${weatherData.humidity}%</div>
        `
    }
}



getCityWeather('tampa')










// for( var i = 0; i < data.length; i++){
//           console.log(data)
//             var cityName = document.createElement('h2');
//             cityName.textContent = data[i].city.name;
//             cityInfo.append(cityName)

//         }
//         });
      


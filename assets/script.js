var searchBtn = document.querySelector("#searchButton")
var searchCity = document.querySelector("#userSearch")
var apiKey = "eb36efeec9e8db03dceda4aa497b1c1f"

//console.log(searchCity)

searchBtn.addEventListener("click", function(){
    console.log(searchCity)
    var requestUrl = 
        "https://api.openweathermap.org/data/2.5/forecast?q=" + searchCity.value + "&appid=eb36efeec9e8db03dceda4aa497b1c1f";
        
        fetch(requestUrl)
        .then(function(forecast){
            return forecast.json();
        })
        .then(function(data) {
          console.log(data) 
          var city = data.city 
        })
        for( var i = 0; i < data.length; i++){
            console.log(city)
        }

      console.log(searchBtn);  
})




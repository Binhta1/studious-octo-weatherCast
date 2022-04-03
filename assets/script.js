var searchBtn = document.querySelector("#searchButton")
var searchCity = document.querySelector("#userSearch")
var apiKey = "eb36efeec9e8db03dceda4aa497b1c1f"
var cityInfo = document.querySelector("cityName")

//console.log(searchCity)

searchBtn.addEventListener("click", function(){
    
    //console.log(searchCity)

    var requestUrl = 
        "https://api.openweathermap.org/data/2.5/forecast?q=" + searchCity.value + "&appid=eb36efeec9e8db03dceda4aa497b1c1f";
        
        fetch(requestUrl)
        .then(function(forecast){
            return forecast.json();
        })
        .then(function(data) { 
          console.log(data) 
          //console.log(data.city)
          console.log(data.city.name)
          
       
        for( var i = 0; i < data.length; i++){
          console.log(data)
            var cityName = document.createElement("h2")
            cityName.textContent = data[i].city.name;
            cityName.appendChild(cityInfo)

        }
        });
      console.log(searchBtn);  
})




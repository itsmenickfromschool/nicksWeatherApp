const apiKey = `40c5846d93a5d9298ee752b2e4b83b4f`;
var city = document.querySelector('#cityInput') // need a value?
var searchButton = document.querySelector('#search')
var insertCity = document.querySelector('#insertCity')
var todaysConditions = document.querySelector('#conditions')
var todaysTemp = document.querySelector('#todaysTemp')
var todaysWind = document.querySelector('#todaysWind')
var todaysHumidity = document.querySelector('#todaysHumidity')
// window.addEventListener('load', function(){
//     this.localStorage.getItem('')
// })

searchButton.addEventListener('click', function(event){
    event.preventDefault()
    var citySearch = city.value
    insertCity.textContent = `Today's weather in ${citySearch}`
    var currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=${apiKey}&units=imperial`

    var fiveDayURL = `https://api.openweathermap.org/data/2.5/forecast?q=${citySearch}&appid=${apiKey}&units=imperial`

    fetch(currentWeatherURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            todaysConditions.textContent = `${data.weather[0].main}`
            todaysTemp.textContent = `${data.main.temp}\xB0 F`
            todaysWind.textContent = `windspeed: ${data.wind.speed}mph`
            todaysHumidity.textContent = `${data.main.humidity}% relative humidity`
            
        })
        .catch(function(error){ 
            alert("City not found!")
    });
           
    
    
   
    
    
    // temp.textContent = `Temp: ${}response.main`
        


        
        


    fetch(fiveDayURL)
        .then(function (response){
            return response.json();
        })
        .then(function(data){
            console.log(data)
            for (let index = 7; index < 46; index += 8) {
                var indexString = index.toString()
                console.log(indexString)
                // var targetCard = document.querySelector(`#${indexString}`)
                // console.log("Target card:"+ targetCard)
                console.log(data.list[index].dt_txt) 
            }
            
        })
    


})




/* Tutoring session

***************************
TODO
Figure out why/ how the city input  value isn't working, think I need an event listener? 
-how to get the data from the api that I need to do the search in one go
- assign each piece to a variable
- 

*/
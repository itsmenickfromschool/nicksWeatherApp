const apiKey = `40c5846d93a5d9298ee752b2e4b83b4f`;
var city = document.querySelector('#cityInput') // need a value?
var searchButton = document.querySelector('#search')
console.log("🚀 ~ file: script.js:4 ~ searchButton:", searchButton)
var currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=imperial`
var fiveDayURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city.value}&appid=${apiKey}&units=imperial`

searchButton.addEventListener('click', function(event){
    event.preventDefault()
    console.log(event)
    console.log(city.value)
    
    console.log(currentWeatherURL);
    
    function search(){
        fetch(currentWeatherURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        });
    fetch(fiveDayURL)
        .then(function (response){
            console.log(response);
            return response.json();
        })
        .then(function(promise){
            console.log(promise)
        })
    
    }})
    



/* Tutoring session

***************************
TODO
Figure out why/ how the city input  value isn't working, think I need an event listener? 
-how to get the data from the api that I need to do the search in one go
- assign each piece to a variable
- 

*/
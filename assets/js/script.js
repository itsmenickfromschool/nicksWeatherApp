const apiKey = `40c5846d93a5d9298ee752b2e4b83b4f`;
var city = document.querySelector('#cityInput') // need a value?
var searchButton = document.querySelector('#search')
var insertCity = document.querySelector('#insertCity')
var todaysConditions = document.querySelector('#conditions')
var todaysTemp = document.querySelector('#todaysTemp')
var todaysWind = document.querySelector('#todaysWind')
var todaysHumidity = document.querySelector('#todaysHumidity')
var icon = document.getElementById('icon')

// window.addEventListener('load', function(){
//     this.localStorage.getItem('')
// })

searchButton.addEventListener('click', function(event){
    event.preventDefault()
    var citySearch = city.value
    // localStorage.setItem(key, value)
    insertCity.textContent = `Today's weather in ${citySearch}`
    var currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=${apiKey}&units=imperial`

    var fiveDayURL = `https://api.openweathermap.org/data/2.5/forecast?q=${citySearch}&appid=${apiKey}&units=imperial`

    fetch(currentWeatherURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            icon.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
            todaysConditions.textContent = `${data.weather[0].main}`
            todaysTemp.textContent = `${data.main.temp}\xB0 F`
            todaysWind.textContent = `windspeed: ${data.wind.speed}mph`
            todaysHumidity.textContent = `${data.main.humidity}% relative humidity`
            
        })
        .catch(function(error){ 
            alert("City not found!")
    });
           
    
    
   
    
    
        


        
        


    fetch(fiveDayURL)
        .then(function (response){
            return response.json();
        })
        .then(function(data){
            console.log(data)
            for (let index = 7; index < 46; index += 8) {
                var date = data.list[index].dt_txt;
                console.log(date);
                var conditions = data.list[index].weather[0].main;
                console.log(conditions);
                var temp = data.list[index].main.temp;
                console.log(`${temp}\xB0 F`);
                var wind = data.list[index].wind.speed;
                console.log(`wind: ${wind}mph`);
                var humidity = data.list[index].main.humidity;
                console.log(`${humidity}% rh`);
                var cardContainer = document.getElementById("forecast")
                var card = document.createElement('div')
                card.classList.add('card','col-6','col-md-2')
                cardContainer.append(card)
                var cardBody = document.createElement('div')
                cardBody.classList.add('card-body')
                card.append(cardBody)
                var cardTitle = document.createElement('h5')
                cardTitle.classList.add('card-title')
                cardTitle.textContent = date
                cardBody.append(cardTitle)
                var cardText = document.createElement('p')
                cardText.classList.add('card-text')
                cardText.textContent = `${conditions}\n${temp}\xB0 F\nwind: ${wind}mph\n${humidity}% rh`
                cardBody.append(cardText)


           







           
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
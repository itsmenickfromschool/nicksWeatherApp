const apiKey = `40c5846d93a5d9298ee752b2e4b83b4f`;
var city = document.querySelector('#cityInput') 
var searchButton = document.querySelector('#search')
var insertCity = document.querySelector('#insertCity')
var todaysConditions = document.querySelector('#conditions')
var todaysTemp = document.querySelector('#todaysTemp')
var todaysWind = document.querySelector('#todaysWind')
var todaysHumidity = document.querySelector('#todaysHumidity')
var icon = document.getElementById('icon')
var cardContainer = document.getElementById("forecast")
var cityArray = [] 
var buttonDiv = document.getElementById('buttonDiv')

console.log(typeof cityArray)

window.addEventListener('load', function(event){
    event.preventDefault();
    letsPlayFetch('Zigzag')
    searchHistory();
})

searchButton.addEventListener('click', function(event){
    event.preventDefault()
    letsPlayFetch(city.value);
    searchHistory();
    
})

function letsPlayFetch (citySearch){
    
    insertCity.textContent = `Today's weather in ${citySearch}`;
    var currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=${apiKey}&units=imperial`;
    
    var fiveDayURL = `https://api.openweathermap.org/data/2.5/forecast?q=${citySearch}&appid=${apiKey}&units=imperial`;
    
    fetch(currentWeatherURL)
        .then(function (response) {
            if (response.status === 200) {
                cityArray.unshift(citySearch);
                var stringy = JSON.stringify(cityArray)
                localStorage.setItem("search", stringy);
            }
            return response.json();
        })
        .then(function (data) {
            icon.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
            todaysConditions.textContent = `${data.weather[0].main}`;
            todaysTemp.textContent = `${data.main.temp}\xB0 F`;
            todaysWind.textContent = `windspeed: ${data.wind.speed}mph`;
            todaysHumidity.textContent = `${data.main.humidity}% relative humidity`; 
        })
        .catch(function(){ 
            alert("City not found!");
    });  
    fetch(fiveDayURL)
        .then(function (response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            cardContainer.innerHTML = ''
            for (let index = 7; index < 46; index += 8) {
                var date = data.list[index].dt_txt;
                var icon2 = `http://openweathermap.org/img/w/${data.list[index].weather[0].icon}.png`;
                var conditions = data.list[index].weather[0].main;
                var temp = data.list[index].main.temp;
                var wind = data.list[index].wind.speed;
                var humidity = data.list[index].main.humidity;
                var card = document.createElement('div');
                card.classList.add('card','col-12','col-sm-3','col-md-2','bg-dark', 'text-light');
                cardContainer.append(card);
                var cardBody = document.createElement('div');
                cardBody.classList.add('card-body');
                card.append(cardBody);
                var cardTitle = document.createElement('h5');
                cardTitle.classList.add('card-title');
                cardTitle.textContent = dayjs(date).format('ddd MMMM D');
                cardBody.append(cardTitle);
                var cardIcon = document.createElement('img');
                cardIcon.src = icon2;
                cardBody.append(cardIcon);
                var condies = document.createElement('p');
                condies.classList.add('card-text');
                condies.textContent = `${conditions}`;
                cardBody.append(condies);
                var tempText = document.createElement('p');
                tempText.classList.add('card-text');
                tempText.textContent = `${temp}\xB0 F`;
                cardBody.append(tempText);
                var windy = document.createElement('p');
                windy.classList.add('card-text');
                windy.textContent = `wind: ${wind}mph`;
                cardBody.append(windy);
                var humid = document.createElement('p');
                humid.classList.add('card-text');
                humid.textContent = `${humidity}% rh`;
                cardBody.append(humid);
            }
            searchHistory();
    })
    
};

function searchHistory(){
    var retriever = localStorage.getItem("search")
    var buttonArray = JSON.parse(retriever)
    buttonDiv.innerHTML = ''
    if (buttonArray.length !== 0){
        for (var i = 0; i < buttonArray.length; i++){
            var newButton = document.createElement('button');
            newButton.classList.add('btn', 'btn-secondary');
            newButton.textContent = buttonArray[i];
            buttonDiv.append(newButton);

    }
    }

}

buttonDiv.addEventListener("click", function(event){
    event.preventDefault();
    letsPlayFetch(event.target.textContent)

    // letsPlayFetch(EventTarget);
})
    


/* TODO *******************
-add icons in cards for 5 day DONE
-add search to local storage DONE
-create buttons for history
-get localstorage on the page load and also on the click event, maybe have a standard city? 
-remove cards when new search happens. DONE
*/
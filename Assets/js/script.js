// var button = document.querySelector('#button');
// var inputValue = document.querySelector('.inputValue');
// var name = document.querySelector('.name');
// var desc = document.querySelector('.desc');
// var temp = document.querySelector('.temp')

// button.addEventListener('click', function() {
//     fetch('https://api.openweathermap.org/data/2.5/forecast?q='+inputValue.value+'&appid=f1ab2ed732905c862f6fb08d5a231029') 
//         .then(response => response.json())
//         .then(data => (console.log(data)))
    
//         .catch(err => alert("Wrong city name!"))
// })
function initPage() {
    const cityEl= document.getElementById("city-search");
    const searchEl = document.getElementById("search-button");
    const clearEl = document.getElementById("clear-history");
    const currentWeatherEl = document.getElementById("current-weather");
    const nameEl = document.getElementById("city-name");
    const iconEl = document.getElementById("temp-icon");
    const humidityEl = document.getElementById("humidity");
    const windspeedEl = document.getElementById("windspeed");
    const uvIndexEl = document.getElementById("UV-index");
    const historyEl = document.getElementById("history");
    // converting text into JavaScript object 
    let searchHistory = JSON.parse(localStorage.getItem("search"));
    console.log(searchHistory);

    const APIKey = "f1ab2ed732905c862f6fb08d5a231029";
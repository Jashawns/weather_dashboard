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
// Current Weather
    function getWeather(cityName) {
        //  Using saved city name, execute a current condition get request from open weather map api
                let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
                axios.get(queryURL)
                .then(function(response){
                    console.log(response);
                //  Uses date to convert the unix timestamp into milliseconds by multiplying it by 1000
                    const currentDate = new Date(response.data.dt*1000);
                    console.log(currentDate);
                    const day = currentDate.getDate();
                    const month = currentDate.getMonth() + 1;
                    const year = currentDate.getFullYear();
                    nameEl.innerHTML = response.data.name + " (" + month + "/" + day + "/" + year + ") ";
                    let picture = response.data.weather[0].icon;
                    currentPicEl.setAttribute("src","https://openweathermap.org/img/wn/" + picture + "@2x.png");
                    currentPicEl.setAttribute("alt",response.data.weather[0].description);
                    // Convert from Celsius to Fahrenheit
                    currentTempEl.innerHTML = "Temperature: " + celtoFah(response.data.main.temp) + " &#176F";
                    currentHumidityEl.innerHTML = "Humidity: " + response.data.main.humidity + "%";
                    currentWindEl.innerHTML = "Wind Speed: " + response.data.wind.speed + " MPH";
                let latitude = response.data.coord.latitude;
                let longitude = response.data.coord.longitude;
                let UVQueryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + APIKey + "&cnt=1";
                axios.get(UVQueryURL)
                .then(function(response){
                    let UVIndex = document.createElement("span");
                    UVIndex.setAttribute("class","badge badge-danger");
                    UVIndex.innerHTML = response.data[0].value;
                    currentUVEl.innerHTML = "UV Index: ";
                    currentUVEl.append(UVIndex);
                });
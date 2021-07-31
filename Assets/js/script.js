function initPage() {
    const cityEl= document.getElementById("city-search");
    const searchEl = document.getElementById("search-button");
    const clearEl = document.getElementById("clear-history");
    const currentWeatherEl = document.getElementById("current-weather");
    const nameEl = document.getElementById("city-name");
    const iconEl = document.getElementById("temp-icon");
    const humidityEl= document.getElementById("humidity");
    const windspeedEl = document.getElementById("windspeed");
    const cUVIndexEl = document.getElementById("UV-index");
    const historyEl = document.getElementById("history");
    // converting text into JavaScript object 
    let searchHistory = JSON.parse(localStorage.getItem("search"));
    console.log(searchHistory);

    const APIKey = "f1ab2ed732905c862f6fb08d5a231029";

// Current Weather
//  CityQuery makes it easier to understand vs naming it a and doing + a + on line 15
    function displayWeather(cityName) {
        //  Using saved city name, execute a current condition get request from open weather map api
        let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
            // axios translating params and adding to query string ; GET Method
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
                iconEl.setAttribute("src","https://openweathermap.org/img/wn/" + picture + "@2x.png");
                iconEl.setAttribute("alt",response.data.weather[0].description);
                // Convert from Celsius to Fahrenheit
                currentWeatherEl.innerHTML = "Temperature: " + celtoFah(response.data.main.temp) + " &#176F";
                humidityEl.innerHTML = "Humidity: " + response.data.main.humidity + "%";
                windspeedEl.innerHTML = "Wind Speed: " + response.data.wind.speed + " MPH";
                let latitude = response.data.coord.lat;
                let longitude = response.data.coord.lon;
                let UVQueryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + APIKey + "&cnt=1";
                axios.get(UVQueryURL)
                    .then(function(response){
                        let UVIndex = document.createElement("span");
                        UVIndex.setAttribute("class","badge badge-danger");
                        UVIndex.innerHTML = response.data[0].value;
                        cUVIndexEl.innerHTML = "UV Index: ";
                        cUVIndexEl.append(UVIndex);
                    });

            // 5 Day forcast 
                let cityID = response.data.id;
                let weatherforQueryURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=" + APIKey;
            // axios translating params and adding to query string ; GET Method, appending to HTML
                axios.get(weatherforQueryURL)
                .then(function(response){
                    console.log(response);
                    const weatherForEls = document.querySelectorAll(".weatherFor");
                    for (i=0; i<weatherForEls.length; i++) {
                        weatherForEls[i].innerHTML = "";
                        const weatherForIndex = i*8 + 4;
                        const weatherForDate = new Date(response.data.list[weatherForIndex].dt * 1000);
                        const weatherForDay = weatherForDate.getDate();
                        const weatherForMonth = weatherForDate.getMonth() + 1;
                        const weatherForYear = weatherForDate.getFullYear();
                        const weatherForDateEl = document.createElement("p");

                        weatherForDateEl.setAttribute("class","mt-3 weatherFor-date");
                        weatherForDateEl.innerHTML = weatherForMonth + "/" + weatherForDay + "/" + weatherForYear;
                        weatherForEls[i].append(weatherForDateEl);

                        const weatherForWeatherEl = document.createElement("img");

                        weatherForWeatherEl.setAttribute("src","https://openweathermap.org/img/wn/" + response.data.list[weatherForIndex].weather[0].icon + "@2x.png");
                        weatherForWeatherEl.setAttribute("alt",response.data.list[weatherForIndex].weather[0].description);
                        weatherForEls[i].append(weatherForWeatherEl);

                        const weatherForTempEl = document.createElement("p");
                        weatherForTempEl.innerHTML = "Temp: " + celtoFah(response.data.list[weatherForIndex].main.temp) + " &#176F";
                        weatherForEls[i].append(weatherForTempEl);

                        const weatherForHumidityEl = document.createElement("p");
                        weatherForHumidityEl.innerHTML = "Humidity: " + response.data.list[weatherForIndex].main.humidity + "%";
                        weatherForEls[i].append(weatherForHumidityEl);

                        }
                    })
                });  
    }

    // On click 
        searchEl.addEventListener("click",function() {
            const searchTerm = cityEl.value;

            displayWeather(searchTerm);
            searchHistory.push(searchTerm);
            localStorage.setItem("search",JSON.stringify(searchHistory));
            renderSearchHistory();
        })
    // Clear
        clearEl.addEventListener("click",function() {
            searchHistory = [];
            rendersearchHistory();
        })

    // Celsius to Fahrenheit
    function celtoFah(K) {
        return Math.floor((K - 273.15) *1.8 +32);
    }

    // History 
        function renderSearchHistory() {
            historyEl.innerHTML = "";
            for (let i=0; i<searchHistory.length; i++) {
                const shistoryitem = document.createElement("input");

                shistoryitem.setAttribute("type","text");
                shistoryitem.setAttribute("readonly",true);
                shistoryitem.setAttribute("class", "form-control d-block bg-white");
                shistoryitem.setAttribute("value", searchHistory[i]);
                shistoryitem.addEventListener("click",function() {
                    displayWeather(shistoryitem.value);
                })
                historyEl.append(shistoryitem);
            }
        }
    // Render
        renderSearchHistory();
        if (searchHistory.length > 0) {
            displayWeather(searchHistory[searchHistory.length - 1]);
        }
}
initPage();
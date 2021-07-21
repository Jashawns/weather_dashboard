var button = document.querySelector('#button');
var inputValue = document.querySelector('.inputValue');
var name = document.querySelector('.name');
var desc = document.querySelector('.desc');
var temp = document.querySelector('.temp')

button.addEventListener('click', function() {
    fetch('https://api.openweathermap.org/data/2.5/forecast?q='+inputValue.value+'&appid=f1ab2ed732905c862f6fb08d5a231029') 
        .then(response => response.json())
        .then(data => (console.log(data)))
    
        .catch(err => alert("Wrong city name!"))
})
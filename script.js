const weatherApi = {
    key: "c604e862dc7263d13eed34f453db00bd",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather", 
}
//my one 
wIcon = document.querySelector(".weather-status img");
const searchInputBox = document.getElementById('input-box');

// Event Listener Function on keypress
searchInputBox.addEventListener('keypress', (event) => {
    
    if(event.keyCode == 13) {
        console.log(searchInputBox.value);
        getWeatherReport(searchInputBox.value);
        document.querySelector('.weather-body').style.display = "block";
    }

});

// Get Weather Report
function getWeatherReport(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then(weather => {
        return weather.json();
    }).then(showWeatherReport);
}

// Show Weather Report
function showWeatherReport(weather){
    console.log(weather);

    let city = document.getElementById('city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let temperature = document.getElementById('temp');
    temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

    let minMaxTemp = document.getElementById('min-max');
    minMaxTemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min)/ ${Math.ceil(weather.main.temp_max)}&deg;C (max) `;

    let weatherType = document.getElementById('weather');
    weatherType.innerText = `${weather.weather[0].main}`;

    let date = document.getElementById('date');
    let todayDate = new Date();
    date.innerText = dateManage(todayDate);
    
    
    if(weatherType.textContent == 'Clear') {
            wIcon.src= "images/clear.svg";       
    } else if(weatherType.textContent == 'Clouds') {
            wIcon.src= "images/cloud.svg";        
    } else if(weatherType.textContent == 'Haze') {

            wIcon.src= "images/haze.svg";
        
    } else if(weatherType.textContent == 'Rain') {
        
            wIcon.src= "images/rain.svg";
        
    } else if(weatherType.textContent == 'Snow') {
        
            wIcon.src= "images/snow.svg";
    
    } else if(weatherType.textContent == 'Thunderstorm') {
    
            wIcon.src= "images/storm.svg";
        
    } 
}

// Date manage
function dateManage(dateArg) {


    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();

    return `${date} ${month} , ${year}`;
}
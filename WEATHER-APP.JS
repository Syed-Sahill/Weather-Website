const cityName = document.querySelector(".weather-city");
// cityName.textContent = "Karachi , Pakistan"
const dateTime = document.querySelector(".weather-date-time");
const w_Forecast = document.querySelector(".weather-forcast");
const w_icon = document.querySelector(".weather-icon");
const w_Temperature = document.querySelector(".weather-temperature");
const w_minTem = document.querySelector(".weather-min");
const w_maxTem = document.querySelector(".weather-max");

// const inputName = document.querySelector(".city-name");

const w_feelsLike = document.querySelector(".weather-feelsLike");
const w_humidity = document.querySelector(".weather-humidity");
const w_wind = document.querySelector(".weather-wind");
const w_pressure = document.querySelector(".weather-pressure");
const citySearch = document.querySelector(".weather-search");

// 01e6a934f7a8f6e6d2834dea81fc55be


// const inputColorChange = ()=>{
//     inputName.classList = "border = 2px solid white";
// }

// inputName.addEventListener(click , inputColorChange());

// TO GET THE ACTUAL COUNTRY NAME


const getCountryName = (code) =>{
    return new Intl.DisplayNames([code] , {type : "region"}).of(code);
};


// TO GET THE DATE AND TIME

const getDateTime = (dt) =>{
    // let dt = 1749907407;
    const curDate = new Date(dt * 1000);
    console.log(curDate);
    
    const options = {
        weekday : "long",
        year : "numeric",
        month : "long",
        day : "numeric",
        hour: "numeric",
        minute : "numeric",
    };

    const formatter = new Intl.DateTimeFormat("en-Us" , options);

    return formatter.format(curDate);
};

let city = "karachi";
citySearch.addEventListener("submit" , (e) =>{
    e.preventDefault();

    let cityName = document.querySelector(".city-name");
    console.log(cityName.value);
    city = cityName.value;

    getWeatherData();

    cityName.value = "";

})

const getWeatherData = async () =>{
    const weatherUrl  = `https://api.openweathermap.org/data/2.5/weather?q= ${city} 
    &appid=01e6a934f7a8f6e6d2834dea81fc55be`;
    try {
        const res = await fetch(weatherUrl);
        const data = await res.json();
        console.log(data);

        const {main , name , weather , wind , sys , dt} = data;

        w_Forecast.innerHTML = weather[0].main;
        w_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />` 
        cityName.innerHTML = `${name} , ${getCountryName(sys.country)}`;
        dateTime.innerHTML = getDateTime(dt);

        w_Temperature.innerHTML = `${main.temp}&#176`;
        w_minTem.innerHTML = `Min :${main.temp_min.toFixed()}&#176`;
        w_maxTem.innerHTML = `Max :${main.temp_max.toFixed()}&#176`;
        w_feelsLike.innerHTML = `${main.feels_like.toFixed(2)}&#176`;
        w_humidity.innerHTML = `${main.humidity}%`;
        w_wind.innerHTML = `${wind.speed} m/s`;
        w_pressure.innerHTML = `${main.pressure} hpa`;

    } catch (error) {
        console.log(error);
    }
}


document.addEventListener("load" , getWeatherData());

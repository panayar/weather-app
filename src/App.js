import React, { useState } from 'react';
import Cloud from './assets/cloudy.png';
import Mist from './assets/mist.png';
import Clear from './assets/sunny.png';
import Rain from './assets/rain.png';
import Snow from './assets/snow.png';
import Logo from './assets/logo.svg';
import Thunder from './assets/thunderstorm.png';

const api = {
  key: "f21ad80c65e7b28c836b69dde16a350b",
  base: "https://api.openweathermap.org/data/2.5/"
}



function App() {

  const [updateBg, setBg] = useState('app');
  const [icon, setIcon] = useState('/src/assets/clear.png');
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  

  const search = evt => {
    try {

      if (evt.key === "Enter") {
        fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
          .then(res => res.json())
          .then(result => {
            setWeather(result);
            setQuery('');
            console.log(result);
            changeBG(result)
          });
      }

    }catch(Exception){
      console.log("City no found")
    }

  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }


  const changeBG =(w) => {

  try {

  let nowWeather =  w.weather[0].main ;
  let types = ["Clear" , "Clouds" , "Mist", "Rain", "Fog", "Snow", "Thunderstorm"]


  if(w.main !== "undefined") {

      if(nowWeather === types[0]) {

      setBg('app clear')
      setIcon(Clear)

      } else if (nowWeather === types[1]) {

        setBg('app cloud')
        setIcon(Cloud)

      } else if (nowWeather === types[2] || nowWeather === types[4]){

        setBg('app mist')
        setIcon(Mist)

      } else if (nowWeather === types[3]){

        setBg('app rain')
        setIcon(Rain)

      }else if (nowWeather === types[5]){
        setBg('app snow')
        setIcon(Snow)

      }else if (nowWeather === types[6]){
        setBg('app thunder')
        setIcon(Thunder)
      }


    }

  }catch(Exception){
  }

  }




  return (
    <div className={updateBg}>
      <main>
        <div className='logo'><img src={Logo} width="160px" alt='logo' /></div>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search for a city"
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>


        {(typeof weather.main != "undefined") ? (
        <div className='full-weather'>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
            <div className="icon-weather"><img src={icon} width="100" height="100" alt='' /></div>
              {Math.round(weather.main.temp)}°c
            </div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
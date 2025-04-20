import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";
import searchicon from "../assets/searchicon.png";
import cloudy from "../assets/cloudy.png";
import drizzle from "../assets/drizzle.png";
import heavyrain from "../assets/heavyrain.png";
import humidity from "../assets/humidity.png";
import snowflake from "../assets/snowflake.png";
import sun from "../assets/sun.png";
import wind from "../assets/wind.png";

const Weather = () => {
  const handleInputChange = (event) => {
    const query = event.target.value;
    if (query.length >= 2) {
      fetchCityOptions(query);
    } else {
      setCityOptions([]);
    }
  };
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState({
    humidity: 0,
    windSpeed: 0,
    temperature: 0,
    location: "",
    icon: sun, // Default icon
  });

  const allIcons = {
    "01d": sun,
    "01n": sun,
    "02d": cloudy,
    "02n": cloudy,
    "03d": cloudy,
    "03n": cloudy,
    "04d": drizzle,
    "04n": drizzle,
    "09d": heavyrain,
    "09n": heavyrain,
    "10d": heavyrain,
    "10n": heavyrain,
    "013d": snowflake,
    "013n": snowflake,
  };

  const search = async (city) => {
    if (city === "") return;
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${
        import.meta.env.VITE_APP_ID
      }`;

      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      const icon = allIcons[data.weather[0].icon] || sun;

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp - 273.15),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      setWeatherData(false);
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    search("London");
  }, []);

  return (
    <div className="weather">
      <div className="search-bar">
      <input
          ref={inputRef}
          type="text"
          placeholder="Search"
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") search(inputRef.current.value);
          }}
        />
        
        
      </div>
      {weatherData ? (
        <>
          <img src={weatherData.icon} alt="" className="weather-icon" />
          <p className="temperature">{weatherData.temperature}</p>
          <p className="location">{weatherData.location}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidity} alt="" height={100} />
              <div>
                <p>{weatherData.humidity}</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind} alt="" height={100} />
              <div>
                <p>{weatherData.windSpeed}</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      
    </div>
  );
};

export default Weather;

import React from "react";
import "../index.css";
import {weatherCodes} from "../constants.js"

const HourlyWeatherItem = ({hourlyWeather}) => {
  const temperature = Math.floor(hourlyWeather.temp_c)
  const time = hourlyWeather.time.split(" ")[1].substring(0, 5)

  console.log("time:", time)
  const weatherIcon = Object.keys(weatherCodes).find((icon) =>
    weatherCodes[icon].includes(hourlyWeather.condition.code)
  );

  return (
    <li className="weather-item">
      <p className="time">{time}</p>
      <img
        src={`../../weather-app-images/icons/${weatherIcon}.svg`}
        alt="clouds"
        className="weather-icon"
      />
      <p className="temperature">{temperature}</p>
    </li>
  );
};

export default HourlyWeatherItem;

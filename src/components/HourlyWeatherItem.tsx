import React from "react";
import "../index.css";

const HourlyWeatherItem = () => {
  return (
    <li className="weather-item">
      <p className="time">00:00</p>
      <img
        src="../../weather-app-images/icons/clouds.svg"
        alt="clouds"
        className="weather-icon"
      />
      <p className="temperature">20°</p>
    </li>
  );
};

export default HourlyWeatherItem;

import React from "react";
import "../index.css";

const CurrentWeather = () => {
  return (
    <div className="current-weather">
      <img src="../../weather-app-images/icons/clouds.svg" className="weather-icon" />
      <h2 className="temperature">
        20 <span>°C</span>
      </h2>
      <p className="description">Partly cloudy</p>
    </div>
  );
};

export default CurrentWeather;

import { useState } from "react";
import SearchSection from "./components/SearchSection";
import CurrentWeather from "./components/CurrentWeather";
import HourlyWeatherItem from "./components/HourlyWeatherItem";
import "./index.css";
import { weatherCodes } from "./constants.js";

const App = () => {
  const [currentWeather, setCurrentWeather] = useState<{
    temperature: number;
    description: string;
    weatherIcon?: string;
  }>({ temperature: 0, description: "" });

  const [hourlyForecasts, setHourlyForecasts] = useState<
    {
      time_epoch: number;
      time: string;
      temp_c: number;
      condition: { text: string };
    }[]
  >([])

  const filterHourlyForecast = (hourlyData) => {
    const currentHour = new Date().setMinutes(0, 0, 0);

    const next24Hours = currentHour + 24 * 60 * 60 * 1000;
    const next24HoursData = hourlyData.filter(({ time }) => {
      const forecastTime = new Date(time).getTime();
      return forecastTime >= currentHour && forecastTime <= next24Hours;
    });
    setHourlyForecasts(next24HoursData); // State güncelleniyor

    console.log(next24HoursData);
  };
  //Fetches weather details based on the API URL
  const getWeatherDetails = async (API_URL: string) => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      console.log("data", data);
      const weatherIcon = Object.keys(weatherCodes).find((icon) =>
        weatherCodes[icon].includes(data.current.condition.code)
      );

      const temperature = Math.floor(data.current.temp_c);
      const description = data.current.condition.text;

      setCurrentWeather({ temperature, description, weatherIcon });

      const combinedHourlyData = [
        ...data.forecast?.forecastday[0]?.hour,
        ...data.forecast?.forecastday[1]?.hour,
      ];

      filterHourlyForecast(combinedHourlyData);

      console.log(combinedHourlyData);
    } catch (error) {
      console.error("Hava durumu verileri alınırken hata oluştu:", error);
    }
  };

  return (
    <div className="container">
      <SearchSection getWeatherDetails={getWeatherDetails} />

      <div className="weather-section">
        <CurrentWeather currentWeather={currentWeather} />

        <div className="hourly-forecast">
          <ul className="weather-list">
            {hourlyForecasts.map((hourlyWeather) => (
              <HourlyWeatherItem
                key={hourlyWeather.time_epoch}
                hourlyWeather={hourlyWeather}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;

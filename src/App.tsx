import { useState } from "react";
import SearchSection from "./components/SearchSection";
import CurrentWeather from "./components/CurrentWeather";
import HourlyWeatherItem from "./components/HourlyWeatherItem";
import "./index.css";

const App = () => {
  const [currentWeather, setCurrentWeather] = useState<any>({});
  //Fetches weather details based on the API URL
  const getWeatherDetails = async (API_URL: string) => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      console.log("data", data);

      const temperature = Math.floor(data.current.temp_c)
      const description = data.current.condition.text;

      setCurrentWeather({ temperature, description });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <SearchSection getWeatherDetails={getWeatherDetails} />

      <div className="weather-section">
        <CurrentWeather currentWeather={currentWeather} />

        <div className="hourly-forecast">
          <ul className="weather-list">
            <HourlyWeatherItem />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;

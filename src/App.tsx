import { useState, useRef } from "react";
import SearchSection from "./components/SearchSection";
import CurrentWeather from "./components/CurrentWeather";
import HourlyWeatherItem from "./components/HourlyWeatherItem";
import "./index.css";
import { weatherCodes } from "./constants";
import {NoResultsDiv} from "./components/NoResultsDiv"

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
  >([]);

  const [hasNoResults, setHasNoResults] = useState<boolean>(false);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Saatlik tahminleri filtreler
  const filterHourlyForecast = (hourlyData: any[]) => {
    const currentHour = new Date().setMinutes(0, 0, 0);
    const next24Hours = currentHour + 24 * 60 * 60 * 1000;
    const next24HoursData = hourlyData.filter(({ time }) => {
      const forecastTime = new Date(time).getTime();
      return forecastTime >= currentHour && forecastTime <= next24Hours;
    });

    setHourlyForecasts(next24HoursData);
  };

  const getWeatherDetails = async (API_URL: string) => {
    setHasNoResults(false);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error();
      const data = await response.json();
      console.log("API Verisi:", data);

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

      console.log("Search Input Ref:", searchInputRef.current);
      console.log("data.location.name:", data.location.name);

      if (searchInputRef.current) {
        searchInputRef.current.value = data.location.name;
      }

      filterHourlyForecast(combinedHourlyData);
    } catch {
      setHasNoResults(true);
    }
  };

  return (
    <div className="container">
      <SearchSection
        getWeatherDetails={getWeatherDetails}
        searchInputRef={searchInputRef}
      />

      {hasNoResults ? (
        <NoResultsDiv />
      ) : (
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
      )}
    </div>
  );
};

export default App;

import SearchSection from "./components/SearchSection";
import CurrentWeather from "./components/CurrentWeather";
import HourlyWeatherItem from "./components/HourlyWeatherItem";
import "./index.css";

const App = () => {
  //Fetches weather details based on the API URL
  const getWeatherDetails = async (API_URL) => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json()
      console.log("data", data)
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <SearchSection getWeatherDetails={getWeatherDetails} />

      <div className="weather-section">
        <CurrentWeather />

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

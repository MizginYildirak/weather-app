import React, { useRef, FormEvent } from "react";
import "../index.css";

interface SearchSectionProps {
  getWeatherDetails: (url: string) => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({ getWeatherDetails }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const API_KEY = import.meta.env.VITE_API_KEY;

  const handleCitySearch = (e: FormEvent) => {
    e.preventDefault();
    const inputValue = inputRef.current?.value || "";
    console.log("inputValue:", inputValue);

    const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${inputValue}`;
    getWeatherDetails(API_URL);
  };

  return (
    <div className="search-section">
      <form className="search-form" onSubmit={handleCitySearch}>
        <span className="material-symbols-rounded">search</span> 
        <input
          type="search"
          ref={inputRef}
          placeholder="Enter a city name"
          className="search-input"
          required
        />
      </form>
      <button type="button" onClick={handleCitySearch} className="location-button">
        <span className="material-symbols-rounded">ok</span>
      </button>
    </div>
  );
};

export default SearchSection;

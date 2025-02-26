import React, { useRef, FormEvent, useEffect, useState } from "react";
import "../index.css";

interface SearchSectionProps {
  getWeatherDetails: (url: string) => void;
  searchInputRef: React.RefObject<HTMLInputElement>;
}

const SearchSection: React.FC<SearchSectionProps> = ({
  getWeatherDetails,
  searchInputRef,
}) => {
  const API_KEY = import.meta.env.VITE_API_KEY;

  const [currentLocation, setCurrentLocation] = useState<{
    latitude: number | null;
    longitude: number | null;
  }>({
    latitude: null,
    longitude: null,
  });

  console.log("currentLocation:", currentLocation);

  const handleCitySearch = (e: FormEvent) => {
    e.preventDefault();
    const inputValue = searchInputRef.current?.value || "";
    console.log("inputValue:", inputValue);

    const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${inputValue}&days=2`;
    getWeatherDetails(API_URL);
  };

  useEffect(() => {
    const parisCoordinates = { latitude: 48.8566, longitude: 2.3522 };
    setCurrentLocation(parisCoordinates);
  }, []);

  useEffect(() => {
    if (currentLocation.latitude && currentLocation.longitude) {
      const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${currentLocation.latitude},${currentLocation.longitude}&days=2`;
      getWeatherDetails(API_URL);
      window.innerWidth >= 768 && searchInputRef.current.focus();
    }
  }, [currentLocation]);

  const handleLocationSearch = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log("Konum verisi:", { latitude, longitude });
        setCurrentLocation({ latitude, longitude });
      },
      () => {
        alert(
          "Location access denied. Please enable permissions to use this feature."
        );
      }
    );
  };

  return (
    <div className="search-section">
      <form className="search-form" onSubmit={handleCitySearch}>
        <span className="material-symbols-rounded">search</span>
        <input
          type="search"
          placeholder="Enter a city name"
          className="search-input"
          ref={searchInputRef}
          required
        />
      </form>
      <button
        type="button"
        className="location-button"
        onClick={handleLocationSearch}
      >
        <span className="material-symbols-rounded">ok</span>
      </button>
    </div>
  );
};

export default SearchSection;

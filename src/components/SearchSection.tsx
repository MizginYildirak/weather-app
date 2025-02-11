import React, { useRef, FormEvent } from "react";
import "../index.css";

const SearchSection: React.FC = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleCitySearch = (e: FormEvent) => {
    e.preventDefault();
    if (inputRef.current) {
      console.log("inputCurrentvalue:", inputRef.current.value);
    }
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

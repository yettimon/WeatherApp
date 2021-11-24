import React, { FC, useState, KeyboardEvent } from "react";
import classes from "./LocationSearch.module.css";

interface LocationSearchProps {
  onSearch: (search: string) => void;
}

export const LocationSearch: FC<LocationSearchProps> = ({ onSearch }) => {
  const [locationSearch, setLocationSearch] = useState("");
  const disableSearch = locationSearch.trim() === "";

  const addLocation = () => {
    onSearch(locationSearch);
    setLocationSearch("");
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      addLocation();
    }
  };

  return (
    <div>
      <input
        placeholder="Search for city"
        className={classes.searchInput}
        type="text"
        value={locationSearch}
        onChange={(e) => setLocationSearch(e.target.value)}
        onKeyUp={handleKeyDown}
      />
      <button
        className="btn btn-primary"
        onClick={addLocation}
        disabled={disableSearch}
      >
        Search
      </button>
    </div>
  );
};

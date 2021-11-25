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
    <>
      <div className="row justify-content-center">
        <div className="col col-md-auto align-self-center">
          <input
            placeholder="Search for city"
            className={classes.searchInput}
            type="text"
            value={locationSearch}
            onChange={(e) => setLocationSearch(e.target.value)}
            onKeyUp={handleKeyDown}
          />
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col col-md-auto align-self-center">
          <button
            className="btn btn-primary btn-sm"
            onClick={addLocation}
            disabled={disableSearch}
          >
            Search
          </button>
        </div>
      </div>
    </>
  );
};

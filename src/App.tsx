import React, { FC, useState } from "react";
import "./App.css";
import { LocationSearch } from "./components/LocationSearch/LocationSearch";
import { LocationTable } from "./components/LocationTable/LocationTable";
import { WeatherLocation } from "./model/Weather";
import { searchLocation } from "./services/WeatherService";
import { ErrorAlert, WarningAlert } from "./components/Alerts/Alerts";
import { WeatherSummary } from "./components/WeatherSummary/WeatherSummary";

import "bootstrap/dist/css/bootstrap.min.css";

const App: FC = () => {
  const [locations, setLocations] = useState<WeatherLocation[]>([]);
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");
  const [currentLocation, setCurrentLocation] =
    useState<WeatherLocation | null>(null);

  const resetAlerts = () => {
    setError("");
    setWarning("");
  };

  const addLocation = async (term: string) => {
    resetAlerts();
    const location = await searchLocation(term);

    if (!location) {
      setError(`There is no such city '${term}'`);
    } else if (locations.find((item) => item.id === location.id)) {
      setWarning(`City '${term}' is already in the list, click below.`);
    } else {
      setLocations([location, ...locations]);
      setCurrentLocation(location);
    }
  };

  return (
    <div className="container">
      <h1>Weather forecast application</h1>
      <LocationSearch onSearch={addLocation} />
      <ErrorAlert message={error} />
      <WarningAlert message={warning} />
      <LocationTable
        locations={locations}
        current={currentLocation}
        onSelect={(location) => setCurrentLocation(location)}
      />
      <WeatherSummary location={currentLocation} />
    </div>
  );
};

export default App;

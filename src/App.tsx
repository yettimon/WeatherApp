import React, { FC, useState } from "react";
import "./App.css";
import { LocationSearch } from "./components/LocationSearch/LocationSearch";
import { LocationTable } from "./components/LocationTable/LocationTable";
import { WeatherLocation } from "./model/Weather";
import { searchLocation } from "./services/WeatherService";
import { ErrorAlert, WarningAlert } from "./components/Alerts/Alerts";
import { WeatherSummary } from "./components/WeatherSummary/WeatherSummary";

const App: FC = () => {
  const [locations, setLocations] = useState<WeatherLocation[]>([]);
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");
  const [currentLocation, setCurrentLocation] =
    useState<WeatherLocation | null>(null);

  console.log(process.env.REACT_APP_OPEN_WEATHER_API_KEY);
  const resetAlerts = () => {
    setError("");
    setWarning("");
  };

  let addLocation = async (term: string) => {
    resetAlerts();
    const location = await searchLocation(term);

    if (!location) {
      setError(`No location found called '${term}'`);
    } else if (locations.find((item) => item.id === location.id)) {
      setWarning(`Location '${term}' is already in the list.`);
    } else {
      setLocations([location, ...locations]);
    }
  };

  return (
    <div className="container">
      <h1>Poisk govna</h1>

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

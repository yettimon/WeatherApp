import React, { FC, useState } from "react";
import "./App.css";
import { LocationSearch } from "./components/LocationSearch/LocationSearch";
import { LocationTable } from "./components/LocationTable/LocationTable";
import { WeatherLocation } from "./model/Weather";
import { searchLocation } from "./services/WeatherService";
import { ErrorAlert, WarningAlert } from "./components/Alerts/Alerts";

const App: FC = () => {
  const [locations, setLocations] = useState<WeatherLocation[]>([]);
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");

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
      <LocationTable locations={locations} />
    </div>
  );
};

export default App;

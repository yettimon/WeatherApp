import React, { FC } from "react";
import { Weather } from "../../model/Weather";
import { getIconUrl } from "../../services/WeatherService";
import classes from "./WeatherCard.module.css";

interface WeatherEntry {
  weather: Weather;
  location: string;
}

const convertUnixTimeToDate = (unixUtc: number): Date => {
  return new Date(unixUtc * 1000);
};
const getCurrentDayName = () => {
  const dateObj = new Date();
  return dateObj.toLocaleString("en-US", { weekday: "long" });
};

export const WeatherCard: FC<WeatherEntry> = ({ weather, location }) => (
  <div className={classes.parameters}>
    <div className="row">
      <div className="col col- align-self-center">
        <p className={classes.currentTime}>
          <strong>{location}</strong>
        </p>
        <p>
          {convertUnixTimeToDate(weather.dt).toLocaleTimeString(
            navigator.language,
            { hour: "2-digit", minute: "2-digit" }
          )}
          , {getCurrentDayName()}
        </p>
      </div>
      <div className="col col- align-self-center">
        {weather.weather.map((condition) => (
          <div className={classes.centerAlign} key={condition.id}>
            <p className={classes.currentDegrees}>
              <strong>{Math.round(weather.main.temp)}°C</strong>
            </p>
            <img src={getIconUrl(condition.icon)} alt={condition.main} />{" "}
            <p>{condition.main}</p>
            {/* <p>"{condition.description}"</p> */}
          </div>
        ))}
      </div>
      <div className="col col- align-self-center">
        <p>Min : {Math.round(weather.main.temp_min)}°C</p>
        <p>Max : {Math.round(weather.main.temp_max)}°C</p>
        <p>🌢 Humidity : {weather.main.humidity}</p>
        <p>Pressure : {weather.main.pressure}</p>
        <p>Feels like : {Math.round(weather.main.feels_like)}°C</p>
      </div>
    </div>
  </div>
);

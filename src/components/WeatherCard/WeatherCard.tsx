import React, { FC } from "react";
import { Weather } from "../../model/Weather";
import { getIconUrl } from "../../services/WeatherService";
import classes from "./WeatherCard.module.css";

interface WeatherEntry {
  weather: Weather;
}

function convertUnixTimeToDate(unixUtc: number): Date {
  return new Date(unixUtc * 1000);
}

export const WeatherCard: FC<WeatherEntry> = ({ weather }) => (
  <div className={classes.parameters}>
    <p>
      {convertUnixTimeToDate(weather.dt).toLocaleTimeString(
        navigator.language,
        { hour: "2-digit", minute: "2-digit" }
      )}
    </p>
    <p className={classes.currentDegrees}>
      <strong>{Math.round(weather.main.temp)}°C</strong>
    </p>
    <div className="row">
      <div className="col col-md-6">
        <p>Min : {Math.round(weather.main.temp_min)}°C</p>
        <p>Max :{Math.round(weather.main.temp_max)}°C</p>
        <p>Humidity : {weather.main.humidity}🌢</p>
        <p>Pressure : {weather.main.pressure}</p>
        <p>Feels like : {Math.round(weather.main.feels_like)}°C</p>
      </div>
      <div className="col col-md-6">
        {weather.weather.map((condition) => (
          <div className={classes.centerAlign} key={condition.id}>
            <img src={getIconUrl(condition.icon)} alt={condition.main} />{" "}
            <p>{condition.main}</p>
            {/* <p>"{condition.description}"</p> */}
          </div>
        ))}
      </div>
    </div>
  </div>
);

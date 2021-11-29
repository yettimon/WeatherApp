import React, { FC } from "react";
import { Weather } from "../../model/Weather";
import { getIconUrl } from "../../services/WeatherService";
import classes from "./ForecastCard.module.css";

interface ForecastEntry {
  weather: Weather;
}

const convertUnixTimeToDate = (unixUtc: number): Date => {
  return new Date(unixUtc * 1000);
};

export const ForecastCard: FC<ForecastEntry> = ({ weather }) => (
  <div className={classes.parameters}>
    <p>
      {convertUnixTimeToDate(weather.dt).toLocaleDateString("en-US", {
        weekday: "long",
        hour: "2-digit",
        minute: "2-digit",
      })}
    </p>
    <p className={classes.currentDegrees}>
      <strong>{Math.round(weather.main.temp)}°C</strong>
    </p>
    <div className={classes.forecastCol}>
      {weather.weather.map((condition) => (
        <div className={classes.centerAlign} key={condition.id}>
          <img src={getIconUrl(condition.icon)} alt={condition.main} />{" "}
          <p>{condition.main}</p>
          {/* <p>"{condition.description}"</p> */}
        </div>
      ))}
      <p>
        <strong>
          {Math.round(weather.main.temp_min)}°C /{" "}
          {Math.round(weather.main.temp_max)}°C
        </strong>
      </p>
    </div>
  </div>
);

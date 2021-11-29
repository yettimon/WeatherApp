import React, { FC } from "react";
import { WeatherDaily } from "../../model/Weather";
import { getIconUrl } from "../../services/WeatherService";
import classes from "./DailyCard.module.css";

interface ForecastEntry {
  weather: WeatherDaily;
}

function convertUnixTimeToDate(unixUtc: number): Date {
  return new Date(unixUtc * 1000);
}

export const DailyCard: FC<ForecastEntry> = ({ weather }) => (
  <div className={classes.parameters}>
    <p>
      {convertUnixTimeToDate(weather.dt).toLocaleDateString("en-US", {
        weekday: "long",
      })}
    </p>
    <p className={classes.currentDegrees}>
      <strong>{Math.round(weather.temp.day)}°C</strong>
    </p>
    <div className={classes.forecastCol}>
      {weather.weather.map((condition) => (
        <div className={classes.centerAlign} key={condition.id}>
          <img src={getIconUrl(condition.icon)} alt={condition.main} />{" "}
          <p>{condition.main}</p>
          {/* <p>"{condition.description}"</p> */}
        </div>
      ))}
    </div>
  </div>
);

import React, { FC } from "react";
import { Weather } from "../../model/Weather";
import { getIconUrl } from "../../services/WeatherService";

interface WeatherEntry {
  weather: Weather;
}

function convertUnixTimeToDate(unixUtc: number): Date {
  return new Date(unixUtc * 1000);
}

export const WeatherCard: FC<WeatherEntry> = ({ weather }) => (
  <div>
    <div>{convertUnixTimeToDate(weather.dt).toLocaleTimeString()}</div>
    <div>
      Current: <strong>{weather.main.temp}°C</strong>
      <div>
        (Min : {weather.main.temp_min}°C / Max :{weather.main.temp_max}°C)
        (Humidity : {weather.main.humidity}) (Pressure : {weather.main.pressure}
        ) (Feels like : {weather.main.feels_like})
      </div>
    </div>
    {weather.weather.map((condition) => (
      <div key={condition.id}>
        <img src={getIconUrl(condition.icon)} alt={condition.main} />{" "}
        {condition.main} {condition.description}
      </div>
    ))}
  </div>
);

import React, { FC } from "react";
import { useState, useEffect } from "react";
import { Weather, WeatherLocation } from "../../model/Weather";
import { getForecast, getWeather } from "../../services/WeatherService";
import { WeatherCard } from "../WeatherCard/WeatherCard";

interface WeatherSummaryProps {
  location: WeatherLocation | null;
}

export const WeatherSummary: FC<WeatherSummaryProps> = ({ location }) => {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [forecast, setForecast] = useState<Weather[] | null>(null);

  useEffect(() => {
    (async function () {
      if (location) {
        const [weather, forecast] = await Promise.all([
          getWeather(location.id),
          getForecast(location.id),
        ]);
        setWeather(weather);
        setForecast(forecast);
      }
    })();
  }, [location]);

  if (!location || !weather || !forecast) return null;
  console.log(forecast);
  console.log(weather);
  return (
    <div>
      <hr />
      <h2>{location.name}</h2>
      <WeatherCard weather={weather} />
      <h2>Forecast</h2>{" "}
      <ol>
        {forecast.map((timePoint) => (
          <li key={timePoint.dt}>
            <WeatherCard weather={timePoint} />
          </li>
        ))}
      </ol>
    </div>
  );
};

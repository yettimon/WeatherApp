import React, { FC } from "react";
import { useState, useEffect } from "react";
import { classicNameResolver } from "typescript";
import { Weather, WeatherLocation } from "../../model/Weather";
import { getForecast, getWeather } from "../../services/WeatherService";
import { WeatherCard } from "../WeatherCard/WeatherCard";
import { ForecastCard } from "../ForecastCard/ForecastCard";
import classes from "./WeatherSummary.module.css";

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
    <div className="row justify-content-center d-flex">
      <div className="col col-md-12">
        <div className={classes.block}>
          <h2>{location.name}</h2>
          <WeatherCard weather={weather} />
        </div>
      </div>
      <h2 className="text-center">Forecast</h2>{" "}
      <div className={classes.forecastSection}>
        <div className={classes.forecastMain}>
          {forecast.map((timePoint) => (
            <div className={classes.forecastBlock} key={timePoint.dt}>
              <ForecastCard weather={timePoint} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

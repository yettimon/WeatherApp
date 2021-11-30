import React, { FC } from "react";
import { useState, useEffect } from "react";
import { Weather, WeatherDaily, WeatherLocation } from "../../model/Weather";
import {
  getDailyForecast,
  getForecast,
  getWeather,
} from "../../services/WeatherService";
import { WeatherCard } from "../WeatherCard/WeatherCard";
import { ForecastCard } from "../ForecastCard/ForecastCard";
import classes from "./WeatherSummary.module.css";
import { DailyCard } from "../DailyCard/DailyCard";

interface WeatherSummaryProps {
  location: WeatherLocation | null;
}

export const WeatherSummary: FC<WeatherSummaryProps> = ({ location }) => {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [forecast, setForecast] = useState<Weather[] | null>(null);
  const [dailyForecast, setDailyForecast] = useState<WeatherDaily[] | null>(
    null
  );

  useEffect(() => {
    (async () => {
      if (location) {
        const [weather, forecast, dailyForecast] = await Promise.all([
          getWeather(location.id),
          getForecast(location.id),
          getDailyForecast(location.name),
        ]);
        setWeather(weather);
        setForecast(forecast);
        setDailyForecast(dailyForecast);
      }
    })();
  }, [location]);

  if (!location || !weather || !forecast || !dailyForecast) return null;
  return (
    <div className="row justify-content-center d-flex">
      <div className="col col-md-12">
        <div className={classes.block}>
          <WeatherCard weather={weather} location={location.name} />
          <hr />
          <div className={classes.forecastMain}>
            {forecast.map((timePoint) => (
              <div className={classes.forecastBlock} key={timePoint.dt}>
                <ForecastCard weather={timePoint} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <h2 className="text-center">Forecast full Week</h2>{" "}
      <div className={classes.forecastSection}>
        <div className={classes.forecastMain}>
          {dailyForecast.map((timePoint) => (
            <div className={classes.forecastBlock} key={timePoint.dt}>
              <DailyCard weather={timePoint} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

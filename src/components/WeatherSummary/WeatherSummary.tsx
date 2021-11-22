import React, { FC } from "react";
import { useState, useEffect } from "react";
import { Weather, WeatherLocation } from "../../model/Weather";
import { getWeather } from "../../services/WeatherService";
import { WeatherCard } from "../WeatherCard/WeatherCard";

interface WeatherSummaryProps {
  location: WeatherLocation | null;
}

export const WeatherSummary: FC<WeatherSummaryProps> = ({ location }) => {
  const [weather, setWeather] = useState<Weather | null>(null);

  useEffect(() => {
    if (location) {
      getWeather(location.id).then((weather) => setWeather(weather));
    }
  }, [location]);

  if (!location || !weather) return null;
  return (
    <div>
      <hr />
      <h2>{location.name}</h2>
      <WeatherCard weather={weather} />
    </div>
  );
};

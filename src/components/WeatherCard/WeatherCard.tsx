import React, { FC } from "react";
import { Weather, WeatherData } from "../../model/Weather";

interface WeatherCard {
  weather: Weather;
}

function convertUnixTimeToDate(unixUtc: number): Date {
  return new Date(unixUtc * 1000);
}

export const WeatherCard: FC<WeatherData> = ({ weather }) => {};

export interface WeatherConditions {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface WeatherData {
  feels_like: number;
  humidity: number;
  pressure: number;
  temp: number;
  temp_min: number;
  temp_max: number;
}

export interface Weather {
  weather: WeatherConditions[];
  main: WeatherData;
  dt: number;
}
export interface Temp {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
}

export interface WeatherDaily {
  weather: WeatherConditions[];
  dt: number;
  sunrise: number;
  sunset: number;
  temp: Temp;
  pressure: number;
  humidity: number;
  gust: number;
}

export interface Coordinates {
  lon: number;
  lat: number;
}

export interface WeatherLocation {
  coord: Coordinates;
  id: number;
  name: string;
}

export interface WeatherConditions {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface WeatherData {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
}

export interface Weather {
  weather: WeatherConditions[];
  main: WeatherData;
  dt: number;
}

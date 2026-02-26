const API_KEY = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export interface WeatherData {
  city: string;
  country: string;
  temp: number;
  feelsLike: number;
  tempMin: number;
  tempMax: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  description: string;
  icon: string;
}

function mapResponse(data: any): WeatherData {
  return {
    city: data.name,
    country: data.sys.country,
    temp: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    tempMin: Math.round(data.main.temp_min),
    tempMax: Math.round(data.main.temp_max),
    humidity: data.main.humidity,
    windSpeed: Math.round(data.wind.speed * 3.6), // m/s to km/h
    condition: data.weather[0].main,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
  };
}

export async function fetchWeatherByCity(city: string): Promise<WeatherData> {
  const res = await fetch(
    `${BASE_URL}/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
  );
  if (!res.ok) {
    if (res.status === 404) throw new Error("City not found. Please check the name and try again.");
    if (res.status === 401) throw new Error("Invalid API key. Please add your OpenWeatherMap API key.");
    throw new Error("Failed to fetch weather data.");
  }
  return mapResponse(await res.json());
}

export async function fetchWeatherByCoords(lat: number, lon: number): Promise<WeatherData> {
  const res = await fetch(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
  );
  if (!res.ok) {
    if (res.status === 401) throw new Error("Invalid API key. Please add your OpenWeatherMap API key.");
    throw new Error("Failed to fetch weather data.");
  }
  return mapResponse(await res.json());
}

export function getWeatherIconUrl(icon: string): string {
  return `https://openweathermap.org/img/wn/${icon}@4x.png`;
}

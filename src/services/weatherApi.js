const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export async function getWeather(city, units = "metric") {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${API_KEY}`
  );
  return response.json();
}

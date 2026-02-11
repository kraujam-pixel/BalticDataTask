import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getWeather } from "../services/weatherApi";

export default function CityDetails({ units }) {
  const { name } = useParams();
  const [city, setCity] = useState(null);

  useEffect(() => {
    async function load() {
      const data = await getWeather(name, units);
      setCity(data);
    }
    load();
  }, [name, units]);

  if (!city) return <p>Loading...</p>;

  return (
    <div className="details-page">
      <Link to="/">← Back</Link>

      <h1>{city.name}</h1>

      <div className="big-temp">
        {Math.round(city.main.temp)}°
      </div>

      <div className="stats">
        <p>🌡 Feels like: {city.main.feels_like}</p>
        <p>💨 Wind: {city.wind.speed}</p>
        <p>💧 Humidity: {city.main.humidity}%</p>
        <p>☁ Clouds: {city.clouds.all}%</p>
        <p>🌧 Pressure: {city.main.pressure}</p>
        <p>🌅 Sunrise: {new Date(city.sys.sunrise * 1000).toLocaleTimeString()}</p>
      </div>
    </div>
  );
}

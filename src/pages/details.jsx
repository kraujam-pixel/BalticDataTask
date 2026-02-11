// import { useParams, Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { getWeather } from "../services/weatherApi";

// export default function CityDetails({ units }) {
//   const { name } = useParams();
//   const [city, setCity] = useState(null);

//   useEffect(() => {
//     async function load() {
//       const data = await getWeather(name, units);
//       setCity(data);
//     }
//     load();
//   }, [name, units]);

//   if (!city) return <p>Loading...</p>;

//   return (
//     <div className="details-page">
//       <Link to="/">← Back</Link>

//       <h1>{city.name}</h1>

//       <div className="big-temp">
//         {Math.round(city.main.temp)}°
//       </div>

//       <div className="stats">
//         <p>🌡 Feels like: {city.main.feels_like}</p>
//         <p>💨 Wind: {city.wind.speed}</p>
//         <p>💧 Humidity: {city.main.humidity}%</p>
//         <p>☁ Clouds: {city.clouds.all}%</p>
//         <p>🌧 Pressure: {city.main.pressure}</p>
//         <p>🌅 Sunrise: {new Date(city.sys.sunrise * 1000).toLocaleTimeString()}</p>
//       </div>
//     </div>
//   );
// }
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getWeather } from "../services/weatherApi";
import { getBackground } from "../utils/getBackground";

export default function CityDetails({ units }) {
  const { name } = useParams();
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await getWeather(name, units);
        setCity(data);
        document.body.className = getBackground(data.weather?.[0]?.main);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [name, units]);

  if (loading) return <div className="container"><p>Loading...</p></div>;
  if (!city) return <div className="container"><p>Pilsēta nav atrasta</p></div>;

  const unitSymbol = units === "metric" ? "°C" : units === "imperial" ? "°F" : "K";

  return (
    <div className="details-page">
      <Link to="/" style={{display: 'inline-block', marginBottom: '30px', color: 'white'}}>
        ← Atpakaļ uz dashboard
      </Link>

      <h1>{city.name}</h1>
      
      <img
        src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@4x.png`}
        alt="Weather icon"
        style={{width: '120px', marginBottom: '20px'}}
      />

      <div className="big-temp">
        {Math.round(city.main.temp)}{unitSymbol}
      </div>

      <div className="stats">
        <div>🌡️ Sajūta: {Math.round(city.main.feels_like)}{unitSymbol}</div>
        <div>💨 Vējs: {city.wind.speed} m/s</div>
        <div>💧 Mitrums: {city.main.humidity}%</div>
        <div>☁️ Mākoņi: {city.clouds.all}%</div>
        <div>📊 Spiediens: {city.main.pressure} hPa</div>
        <div>🌅 Saullēkts: {new Date(city.sys.sunrise * 1000).toLocaleTimeString()}</div>
        <div>🌇 Saules lēkts: {new Date(city.sys.sunset * 1000).toLocaleTimeString()}</div>
      </div>
    </div>
  );
}

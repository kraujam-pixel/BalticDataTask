// import { useEffect, useState } from "react";
// import { getWeather } from "../services/weatherApi";
// import WeatherCard from "../components/WeatherCard";
// import { getBackground } from "../utils/getBackground";





// export default function Dashboard({ units, setUnits }) {
//   const [weather, setWeather] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
  

//   useEffect(() => {
//     async function loadWeather() {
//       try {
//         setLoading(true);
//         setError(null);

//         const data = await Promise.all(
//           cities.map(city => getWeather(city, units))
//         );

//         setWeather(data);
//       } catch (err) {
//         setError("Failed to load weather data.");
//       } finally {
//         setLoading(false);
//       }
//     }

//     loadWeather();
//   }, [units]);
  
//   useEffect(() => {
//   if (weather.length > 0) {
//     const mainCondition = weather[0]?.weather?.[0]?.main;
//     const bgClass = getBackground(mainCondition);

//     document.body.className = bgClass;
//   }
// }, [weather]);


//   return (
//     <div className="container">
//       <h1>🌤 Weather Dashboard</h1>

//       <div className="unit-switch">
//         <button className={units === "metric" ? "active" : ""}onClick={() => setUnits("metric")}>°C</button>
//         <button className={units === "imperial" ? "active" : ""}onClick={() => setUnits("imperial")}>°F</button>
//         <button className={units === "standard" ? "active" : ""}onClick={() => setUnits("standard")}>K</button>
//       </div>

//       {loading && <p>Loading weather data...</p>}
//       {error && <p className="error">{error}</p>}

//       <div className="grid">
//         {weather.map(city => (
//           <WeatherCard key={city.id} city={city} units={units} />
//         ))}
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { getWeather } from "../services/weatherApi";
import WeatherCard from "../components/WeatherCard";
import { getBackground } from "../utils/getBackground";


const cities = [
  "Riga", "London", "Chicago", "Barcelona", "Paris",
  "Berlin", "Singapore", "Seoul", "Sydney", "Dubai"
];

export default function Dashboard({ units, setUnits }) {
  const [weather, setWeather] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
  if (weather.length > 0) {
    const mainCondition = weather[0]?.weather?.[0]?.main;
    const bgClass = getBackground(mainCondition);

    document.body.className = bgClass;
  }
}, [weather]);


  useEffect(() => {
    async function loadWeather() {
      try {
        setLoading(true);
        setError(null);

        const data = await Promise.all(
          cities.map(city => getWeather(city, units))
        );

        setWeather(data);
      } catch (err) {
        setError("Failed to load weather data.");
      } finally {
        setLoading(false);
      }
    }

    loadWeather();
  }, [units]);

  return (
    <div className="container">
      <h1>🌤 Weather Dashboard</h1>

      <div className="unit-switch">
        <button onClick={() => setUnits("metric")}>°C</button>
        <button onClick={() => setUnits("imperial")}>°F</button>
        <button onClick={() => setUnits("standard")}>K</button>
      </div>

      {loading && <p>Loading weather data...</p>}
      {error && <p className="error">{error}</p>}

      <div className="grid">
        {weather.map(city => (
          <WeatherCard key={city.id} city={city} units={units} />
        ))}
      </div>
    </div>
  );
}

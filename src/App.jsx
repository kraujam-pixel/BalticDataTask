
// import { useEffect, useState } from "react";
// import { getWeather } from "./services/weatherApi";
// import WeatherCard from "./components/WeatherCard";

// const cities = [
//   "Riga", "London", "Chicago", "Barcelona", "Paris",
//   "Berlin", "Singapore", "Seoul", "Sydney", "Dubai"
// ];

// function App() {
//   const [weather, setWeather] = useState([]);
//   const [units, setUnits] = useState("metric");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     async function loadWeather() {
//       setLoading(true);
//       const data = await Promise.all(
//         cities.map(city => getWeather(city, units))
//       );
//       setWeather(data);
//       setLoading(false);
//     }
//     loadWeather();
//   }, [units]);

//   return (
//     <div className="container">
//       <h1>🌤 Weather Dashboard</h1>

//       <div className="unit-switch">
//         <button onClick={() => setUnits("metric")}>°C</button>
//         <button onClick={() => setUnits("imperial")}>°F</button>
//         <button onClick={() => setUnits("standard")}>K</button>
//       </div>

//       {loading && <p>Loading...</p>}

//       <div className="grid">
//         {weather.map(city => (
//           <WeatherCard key={city.id} city={city} />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default App;
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import CityDetails from "./pages/details";

function App() {
  const [units, setUnits] = useState("metric");

  return (
    <Routes>
      <Route
        path="/"
        element={<Dashboard units={units} setUnits={setUnits} />}
      />
      <Route
        path="/city/:name"
        element={<CityDetails units={units} />}
      />
    </Routes>
  );
}

export default App;

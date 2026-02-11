
// import { useEffect, useState } from "react";
// import { getWeather } from "../services/weatherApi";
// import WeatherCard from "../components/WeatherCard";
// import { getBackground } from "../utils/getBackground";


// const cities = [
//   "Riga", "London", "Chicago", "Barcelona", "Paris",
//   "Berlin", "Singapore", "Seoul", "Sydney", "Dubai"
// ];

// export default function Dashboard({ units, setUnits }) {
//   const [weather, setWeather] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//   if (weather.length > 0) {
//     const mainCondition = weather[0]?.weather?.[0]?.main;
//     const bgClass = getBackground(mainCondition);

//     document.body.className = bgClass;
//   }
// }, [weather]);


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

//   return (
//     <div className="container">
//       <h1>🌤 Weather Dashboard</h1>

//       <div className="unit-switch">
//         <button onClick={() => setUnits("metric")}>°C</button>
//         <button onClick={() => setUnits("imperial")}>°F</button>
//         <button onClick={() => setUnits("standard")}>K</button>
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
import { Link } from "react-router-dom";
import { getWeather } from "../services/weatherApi";
import { getBackground } from "../utils/getBackground";
import WeatherCard from "../components/WeatherCard";

export default function Dashboard({ units, setUnits }) {
  const [cities, setCities] = useState([]);
  const [weather, setWeather] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newCity, setNewCity] = useState('');
  const [error, setError] = useState(null);

  // FETCH CITIES NO DB
  useEffect(() => {
    fetchCities();
  }, []);

  async function fetchCities() {
    try {
      const response = await fetch('http://localhost:5000/cities');
      const data = await response.json();
      setCities(data);
    } catch (err) {
      setError("DB connection failed - using demo cities");
      // Fallback demo cities
      setCities([
        {id:1, name:"Riga"}, {id:2, name:"London"}, {id:3, name:"Paris"},
        {id:4, name:"Berlin"}, {id:5, name:"Barcelona"}, {id:6, name:"Chicago"},
        {id:7, name:"Singapore"}, {id:8, name:"Seoul"}, {id:9, name:"Sydney"}, 
        {id:10, name:"Dubai"}
      ]);
    }
  }

  // LOAD WEATHER
  useEffect(() => {
    if (cities.length > 0) loadWeather();
  }, [cities, units]);

  async function loadWeather() {
    try {
      setLoading(true);
      setError(null);
      const data = await Promise.all(
        cities.map(city => getWeather(city.name, units))
      );
      setWeather(data);
      
      // Background change
      const mainCondition = data[0]?.weather?.[0]?.main;
      document.body.className = getBackground(mainCondition);
    } catch (err) {
      setError("Weather API error");
    } finally {
      setLoading(false);
    }
  }

  // ADD CITY
  async function addCity(e) {
    e.preventDefault();
    if (!newCity.trim()) return;
    
    try {
      const response = await fetch('http://localhost:5000/cities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCity.trim() })
      });
      if (response.ok) {
        setNewCity('');
        fetchCities(); // Refresh
      }
    } catch (err) {
      setError("Failed to add city");
    }
  }

  // DELETE CITY
  async function deleteCity(id) {
    try {
      await fetch(`http://localhost:5000/cities/${id}`, { method: 'DELETE' });
      fetchCities(); // Refresh
    } catch (err) {
      setError("Failed to delete city");
    }
  }

  return (
    <div className="container">
      <h1>🌤 Weather Dashboard</h1>
      
      <div className="unit-switch">
        <button className={units === "metric" ? "active" : ""} 
                onClick={() => setUnits("metric")}>°C</button>
        <button className={units === "imperial" ? "active" : ""} 
                onClick={() => setUnits("imperial")}>°F</button>
        <button className={units === "standard" ? "active" : ""} 
                onClick={() => setUnits("standard")}>K</button>
      </div>

      {/* CRUD FORM */}
      <form onSubmit={addCity} style={{marginBottom: '30px', display: 'flex', gap: '10px'}}>
        <input 
          value={newCity} 
          onChange={(e) => setNewCity(e.target.value)}
          placeholder="Pievienot pilsētu (piem. Tokyo)..."
          style={{padding: '12px 16px', borderRadius: '20px', border: 'none', flex: 1}}
        />
        <button type="submit" 
                style={{padding: '12px 24px', borderRadius: '20px', background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white'}}>
          ➕ Pievienot
        </button>
      </form>

      {error && <p className="error">{error}</p>}
      {loading && <p>Loading weather...</p>}

      <div className="grid">
        {weather.map((cityData, index) => (
          <div key={cities[index]?.id || index}>
            <WeatherCard city={cityData} units={units} />
            {cities[index]?.id && (
              <button onClick={() => deleteCity(cities[index].id)}
                      style={{marginTop: '10px', width: '100%', padding: '8px', background: '#ff4444', border: 'none', borderRadius: '10px', color: 'white'}}>
                🗑 Dzēst
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

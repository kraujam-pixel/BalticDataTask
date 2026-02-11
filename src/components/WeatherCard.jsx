
// import { Link } from "react-router-dom";

// export default function WeatherCard({ city, units }) {
//   const unitSymbol =
//     units === "metric" ? "°C" :
//     units === "imperial" ? "°F" : "K";

//   return (
//     <Link to={`/city/${city.name}`} className="card-link">
//       <div className="card">
//         <h2>{city.name}</h2>

//         <div className="temp">
//           {Math.round(city.main?.temp)}{unitSymbol}
//         </div>

//         <div className="details">
//           <span>💨 {city.wind?.speed}</span>
//           <span>☁️ {city.clouds?.all}%</span>
//           <span>💧 {city.main?.humidity}%</span>
//         </div>
//       </div>
//     </Link>
//   );
// }
import { Link } from "react-router-dom";

export default function WeatherCard({ city, units }) {
  const unitSymbol =
    units === "metric" ? "°C" :
    units === "imperial" ? "°F" : "K";

  return (
    <Link to={`/city/${city.name}`} className="card-link">
      <div className="card">
        <h2>{city.name}</h2>
        <img
          src={`https://openweathermap.org/img/wn/${city.weather?.[0]?.icon}@2x.png`}
          alt="weather icon"
          className="weather-icon"
        />
 

        <div className="temp">
          {Math.round(city.main?.temp)}{unitSymbol}
        </div>

        <div className="details">
          <span>💨 {city.wind?.speed}</span>
          <span>☁️ {city.clouds?.all}%</span>
          <span>💧 {city.main?.humidity}%</span>
        </div>
      </div>
    </Link>
  );
}

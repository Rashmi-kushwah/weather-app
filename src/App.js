import React, { useState } from "react";
import { motion } from "framer-motion"; // Animation ke liye
import "./App.css"; // External CSS import

const API_KEY = "f20f574cbd31290a9885522ca8f32bd1";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const getWeather = async () => {
    if (!city) return;
    try {
      setError(null);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error("City not found. Please try again.");
      }
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  return (
    <div className="container">
      <motion.div 
        className="card"
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="title">🌤 Weather App</h1>

        <input
          type="text"
          placeholder="Enter city name..."
          className="input-box"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <motion.button
          className="btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={getWeather}
        >
          Get Weather
        </motion.button>

        {error && <p className="error">{error}</p>}

        {weather && (
          <motion.div 
            className="weather-info"
            initial={{ scale: 0.8, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="city">{weather.name}, {weather.sys.country}</h2>
            <p className="temp">{Math.round(weather.main.temp)}°C</p>
            <p className="desc">{weather.weather[0].description.toUpperCase()}</p>
            <p className="details">Humidity: {weather.main.humidity}% | Wind: {weather.wind.speed} m/s</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

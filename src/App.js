import { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import Loader from "./components/Loader";
import "./App.css";

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [unit, setUnit] = useState("metric");
  const [darkMode, setDarkMode] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "bbb0b3a43e4117ec5cdafb8874ce6baf";

  const fetchWeather = async (city) => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${unit}`
      );

      const data = await res.json();

      if (data.cod !== 200) {
        setWeather(null);
        setError("City not found!");
        return;
      }

      setWeather(data);
    } catch (err) {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const getWeatherClass = () => {
    const condition = weather?.weather?.[0]?.main?.toLowerCase();

    if (!condition) return "default-bg";
    if (condition.includes("clear")) return "clear-bg";
    if (condition.includes("rain")) return "rain-bg";
    if (condition.includes("drizzle")) return "rain-bg";
    if (condition.includes("cloud")) return "cloud-bg";
    if (condition.includes("thunder")) return "storm-bg";
    if (condition.includes("snow")) return "snow-bg";
    if (condition.includes("mist")) return "mist-bg";
    if (condition.includes("fog")) return "mist-bg";
    if (condition.includes("haze")) return "mist-bg";

    return "default-bg";
  };

  return (
    <div
      className={`app ${getWeatherClass()} ${
        darkMode ? "dark-theme" : "light-theme"
      }`}
    >
      <div className="top-controls">
        <button
          className="toggle-btn"
          onClick={() =>
            setUnit((prev) => (prev === "metric" ? "imperial" : "metric"))
          }
        >
          {unit === "metric" ? "°C" : "°F"}
        </button>

        <button
          className="toggle-btn"
          onClick={() => setDarkMode((prev) => !prev)}
        >
          {darkMode ? "☀ Light" : "🌙 Dark"}
        </button>
      </div>

      <h1>Weather Dashboard</h1>

      <SearchBar onSearch={fetchWeather} />

      {loading && <Loader />}

      {error && <p className="error">{error}</p>}

      {weather && <WeatherCard weather={weather} unit={unit} />}
    </div>
  );
}

export default App;
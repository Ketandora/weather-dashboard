function WeatherCard({ weather, unit }) {
  return (
    <div className="weather-card">
      <h2>{weather.name}</h2>

      <h3>
        {Math.round(weather.main.temp)}°
        {unit === "metric" ? "C" : "F"}
      </h3>

      <p>{weather.weather[0].description}</p>

      <div className="details">
        <span>Humidity: {weather.main.humidity}%</span>
        <span>Wind: {weather.wind.speed}</span>
      </div>
    </div>
  );
}

export default WeatherCard;
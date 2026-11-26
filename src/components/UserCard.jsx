
import React from "react";
// UserCard component to display weather information for a specific city
const UserCard = ({ forecast }) => {
    return (
        <div className="user-card">
            <h3>{forecast.name}, {forecast.sys.country}</h3>

            <h2>{Math.round(forecast.main.temp)}°F</h2>

            <p>{forecast.weather[0].description}</p>

            <p>Feels like: {Math.round(forecast.main.feels_like)}°F</p>

            <p>Humidity: {forecast.main.humidity}%</p>

            <p>Wind speed: {forecast.wind.speed} mph</p>
        </div>
    );
};

export default UserCard;


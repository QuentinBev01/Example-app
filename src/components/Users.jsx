
import React, { useState } from "react";
import "./Users.css";
import UserCard from "./UserCard";

const API_KEY = "f7fd52b44e0181ceb3f77751c9b2577d";
// list of 20 cities for weather 
const cities = [
    "Indianapolis", "New York", "Los Angeles", "Chicago",
    "Houston", "Phoenix", "Philadelphia", "San Antonio",
    "San Diego", "Dallas", "Austin", "Jacksonville",
    "San Jose", "Fort Worth", "Columbus", "Charlotte",
    "Seattle", "Denver", "Boston", "Nashville"
];
// State variables to store weather data, search input, messages, and loading status
const Users = () => {
    const [weather, setWeather] = useState([]);
    const [city, setCity] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    // Gets weather information for the cities
    const getCityWeather = async (cityName) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=imperial`;

        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Unable to get weather.");
        }

        return data;
    };
      // Fetches weather data for the list of cities and updates the state
    const getWeather = async () => {
        try {
            setLoading(true);
            setMessage("Loading weather for 20 cities...");
            setWeather([]);

            const results = await Promise.all(
                cities.map((cityName) => getCityWeather(cityName))
            );

            setWeather(results);
            setMessage("Weather for 20 cities");
        } catch (error) {
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    };
    // Searches for weather data based on user input and updates the state
    const searchCity = async () => {
        if (!city.trim()) {
            setMessage("Please enter a city name.");
            setWeather([]);
            return;
        }

        try {
            setLoading(true);
            setMessage("");

            const result = await getCityWeather(city);

            setWeather([result]);
            setMessage(`Weather for ${result.name}`);
        } catch (error) {
            setWeather([]);
            setMessage(
                error.message === "city not found"
                    ? "City not found."
                    : error.message
            );
        } finally {
            setLoading(false);
        }
    };
    // Renders the component UI, including buttons for fetching weather data and searching for a city, as well as displaying weather information using UserCard components
    return (
        <div className="users">
            <h1>Weather App</h1>

            <button onClick={getWeather} disabled={loading}>
                {loading ? "Loading..." : "Get Weather"}
            </button>
            
            <div className="search">
                <input
                    type="text"
                    placeholder="Enter city name"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />

                <button onClick={searchCity} disabled={loading}>
                    Search
                </button>
            </div>

            {message && <p className="message">{message}</p>}
            
            <div className="user-list">
                {weather.map((item) => (
                    <UserCard key={item.id} forecast={item} />
                ))}
            </div>
        </div>
    );
};

export default Users;



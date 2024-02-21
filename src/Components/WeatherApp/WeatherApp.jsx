import React, { useState } from 'react';
import './WeatherApp.css';

// Importing weather icons
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import humidity_icon from '../Assets/humidity.png';
import rain_icon from '../Assets/rain.png';
import search_icon from '../Assets/search.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';
import clear_icon from '../Assets/clear.png';
import thunderstorm_icon from '../Assets/thunderstorm.png';
import cloud_night from '../Assets/cloud_night.png';
import clearSky_night from '../Assets/clearSky_night.png';
import drizzle_night from '../Assets/drizzle_night.png';
import rainy_night from '../Assets/rainy_night.png';
import night_snow from '../Assets/night_snow.png';
import thunderstorm_night from '../Assets/thunderstorm_night.png';
import mist_day from '../Assets/mist.png';
import mist_night from '../Assets/mist_night.png';

const WeatherApp = () => {
    // API key for OpenWeatherMap API
    let api_key = "3901ab1b02df489d348ae8ffb632d219";

    // State variables
    const [wicon, setWicon] = useState(cloud_icon); // Weather icon
    const [weatherData, setWeatherData] = useState({ // Weather data
        temperature: '24°C',
        location: 'Kolkata',
        humidity: '64%',
        windSpeed: '18 km/h'
    });
    const [errorMessage, setErrorMessage] = useState(''); // Error message

    // Function to search for weather data
    const search = async () => {
        try {
            const element = document.getElementsByClassName("cityInput");
            if (element[0].value === "") {
                return;
            }
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&appid=${api_key}&units=metric`;
            let response = await fetch(url);
            if (!response.ok) {
                // If no results found, set error message
                setErrorMessage('No results found for the provided location.');
                return;
            }
            let data = await response.json();
            // Update weather data
            setWeatherData({
                temperature: `${data.main.temp}°C`,
                location: data.name,
                humidity: `${data.main.humidity}%`,
                windSpeed: `${data.wind.speed} km/h`
            });
            // Update weather icon
            setWicon(getWeatherIcon(data.weather[0].icon));
            // Clear error message
            setErrorMessage('');
        } catch (error) {
            console.error("Error fetching weather data:", error.message);
            // Set error message for general error
            setErrorMessage('Failed to fetch weather data. Please try again later.');
        }
    };

    // Function to get appropriate weather icon based on icon code
    const getWeatherIcon = (iconCode) => {
        switch (iconCode) {
            case "01n":
                return clearSky_night;
            case "02d":
                return cloud_icon;
            case "02n":
                return cloud_night;
            case "03d":
            case "03n":
            case "04d":
            case "04n":
                return drizzle_icon;
            case "09d":
            case "09n":
            case "10d":
            case "10n":
                return rain_icon;
            case "13d":
            case "13n":
                return snow_icon;
            case "11d":
            case "11n":
                return thunderstorm_icon;
            case "50d":
                return mist_day;
            case "50n":
                return mist_night;
            default:
                return clear_icon;
        }
    };

    // JSX for rendering
    return (
        <div className='container'>
            {/* Search bar */}
            <div className='top-bar'>
                <input type="text" className='cityInput' placeholder='search'/>
                <div className='search-icon' onClick={search}>
                    <img src={search_icon} alt="" />
                </div>
            </div>
            {/* Display error message if any */}
            {errorMessage && <div className='error-message'>{errorMessage}</div>}
            {/* Display weather data */}
            {!errorMessage && (
                <>
                    <div className='weather_image'>
                        <img src={wicon} alt="" />
                    </div>
                    <div className='weather_temp'>{weatherData.temperature}</div>
                    <div className='location'>{weatherData.location}</div>
                    <div className='data_container'>
                        <div className='element'>
                            <img src={humidity_icon} alt="" className="icon" />
                            <div className='data'>
                                <div className='humidity-percent'>{weatherData.humidity}</div>
                                <div className='text'>Humidity</div>
                            </div>
                        </div>
                        <div className='element'>
                            <img src={wind_icon} alt="" className="icon" />
                            <div className='data'>
                                <div className='wind-rate'>{weatherData.windSpeed}</div>
                                <div className='text'>Wind Speed</div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default WeatherApp;

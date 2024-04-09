import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import "./SearchBox.css";
import { useState } from 'react';

export default function SearchBox({ updateInfo }) {
    const [city, setCity] = useState("");
    const [error, setError] = useState(false);

    const API_URL = "https://api.openweathermap.org/data/2.5/weather";


    const getWeatherInfo = async () => {
        try {
            let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
            let jsonResponse = await response.json();

            if (response.ok) {
                const result = {
                    temp: jsonResponse.main.temp,
                    city: city,
                    tempMin: jsonResponse.main.temp_min,
                    tempMax: jsonResponse.main.temp_max,
                    humidity: jsonResponse.main.humidity,
                    feelsLike: jsonResponse.main.feels_like,
                    weather: jsonResponse.weather[0].description,
                };
                return result;
            } else {
                throw new Error(jsonResponse.message || "City not found");
            }
        } catch (err) {
            throw err;
        }
    };

    const handleChange = (event) => {
        setCity(event.target.value);
    };

    const handleSubmit = async (evt) => {
        try {
            evt.preventDefault();
            setCity("");
            setError(false); // Reset error state before making a new request
            const newInfo = await getWeatherInfo();
            updateInfo(newInfo);
        } catch (err) {
            console.error("Error fetching weather information:", err.message);
            setError(true);
        }
    };

    return (
        <div className='SearchBox'>
            <form action="" className='SearchBox' onSubmit={handleSubmit}>
                <TextField id="city" label="City Name" variant="outlined" required value={city} onChange={handleChange} />
                <Button type='submit' variant="contained">Search</Button>
            </form>
            {error && <Alert severity="error">Place does not exist in API</Alert>}
        </div>
    );
}

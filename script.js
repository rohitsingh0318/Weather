document.addEventListener('DOMContentLoaded', () => {
    const locationInput = document.getElementById('locationInput');
    const getWeatherBtn = document.getElementById('getWeatherBtn');
    const weatherDisplay = document.getElementById('weatherDisplay');
    const cityNameElement = document.getElementById('cityName');
    const temperatureElement = document.getElementById('temperature');
    const conditionElement = document.getElementById('condition');
    const conditionIconElement = document.getElementById('conditionIcon');
    const errorMessageElement = document.getElementById('errorMessage');

    // Your API key provided in the prompt
    const API_KEY = '99a56503d78f4866a5070928250108'; 

    getWeatherBtn.addEventListener('click', () => {
        const location = locationInput.value.trim();
        if (location) {
            fetchWeatherData(location);
        } else {
            displayError('Please enter a city name.');
            clearWeatherData();
        }
    });

    locationInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            getWeatherBtn.click();
        }
    });

    async function fetchWeatherData(location) {
        // Clear previous error and data
        displayError('');
        clearWeatherData();

        const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}&aqi=no`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (response.ok) {
                displayWeatherData(data);
            } else {
                // Handle API errors (e.g., city not found)
                displayError(data.error ? data.error.message : 'Something went wrong.');
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
            displayError('Could not connect to the weather service. Please try again later.');
        }
    }

    function displayWeatherData(data) {
        cityNameElement.textContent = data.location.name + ', ' + data.location.country;
        temperatureElement.textContent = `${data.current.temp_c}°C / ${data.current.temp_f}°F`;
        conditionElement.textContent = data.current.condition.text;
        conditionIconElement.src = data.current.condition.icon;
        conditionIconElement.alt = data.current.condition.text;
    }

    function clearWeatherData() {
        cityNameElement.textContent = '';
        temperatureElement.textContent = '';
        conditionElement.textContent = '';
        conditionIconElement.src = '';
        conditionIconElement.alt = '';
    }

    function displayError(message) {
        errorMessageElement.textContent = message;
    }
});
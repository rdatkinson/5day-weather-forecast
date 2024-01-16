const apiKey = '19489d2909dbb2f5c069fecee4cbb60c';

// Add event listener to the search button
document.getElementById('search-button').addEventListener('click', function() {
    const city = document.getElementById('city-input').value;
    if (city) {
        getCoordinates(city);
    }
});

// Function to get coordinates of the city
function getCoordinates(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    // Fetch request to OpenWeatherMap to get coordinates
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`City not found: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Once coordinates are received, fetch weather data
            getWeather(data.coord.lat, data.coord.lon, city);
        })
        .catch(error => {
            // Handle any errors in fetching coordinates
            console.error('Error:', error);
            alert(error.message);
        });
};

// Function to get weather data using coordinates
function getWeather(lat, lon, city) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    // Fetch request for 5-day weather forecast
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Update the UI with fetched weather data
            updateUI(data, city);
            // Update the search history
            updateHistory(city);
        })
        .catch(error => {
            // Handle errors in fetching weather data
            console.error('Error:', error);
            alert('Error fetching weather data.');
        });
};

// Function to update the UI with weather data
function updateUI(weatherData, city) {
    // Set current weather information
    document.getElementById('city-name').textContent = city;
    document.getElementById('current-date').textContent = new Date().toLocaleDateString();
    document.getElementById('temperature').textContent = `${weatherData.list[0].main.temp} °C`;
    document.getElementById('humidity').textContent = `${weatherData.list[0].main.humidity}%`;
    document.getElementById('wind').textContent = `${weatherData.list[0].wind.speed} KPH`;

     // Clear and update forecast weather
     const forecastContainer = document.getElementById('forecast-weather');
     forecastContainer.innerHTML = ''; // Clear previous forecasts
     
     // Loop through the forecast data and create elements for each day
    for (let i = 0; i < weatherData.list.length; i += 8) {
        const dayData = weatherData.list[i];
        const date = new Date(dayData.dt_txt).toLocaleDateString();
        const temp = dayData.main.temp;
        const humidity = dayData.main.humidity;
        const wind = dayData.wind.speed;
        const iconUrl = `http://openweathermap.org/img/w/${dayData.weather[0].icon}.png`;

        // Create a div for each forecast day and append to the container
        const forecastDiv = document.createElement('div');
        forecastDiv.classList.add('forecast-day');
        forecastDiv.innerHTML = `
            <p><strong>${date}</strong></p>
            <img src="${iconUrl}" alt="${dayData.weather[0].description}" class="weather-icon">
            <p>Temp: <span class="forecast-temp">${temp} °C</span></p>
            <p>Wind: <span class="forecast-wind">${wind} KPH</span></p>
            <p>Humidity: <span class="forecast-humidity">${humidity} %</span></p>`;
        forecastContainer.appendChild(forecastDiv);
    }
}

// Function to update search history
function updateHistory(city) {
    // Retrieve existing history from localStorage or initialize an empty array
    let history = JSON.parse(localStorage.getItem('weatherSearchHistory')) || [];
    
}
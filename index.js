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
}

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
}
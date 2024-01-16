const apiKey = '19489d2909dbb2f5c069fecee4cbb60c';

// Add event listener to the search button
document.getElementById('search-button').addEventListener('click', function() {
    const city = document.getElementById('city-input').value;
    if (city) {
        getCoordinates(city);
    }
});
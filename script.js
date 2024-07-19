document.addEventListener('DOMContentLoaded', function() {
    const countriesContainer = document.getElementById('countries-container');

    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(countries => {
            countries.forEach(country => {
                const countryCard = document.createElement('div');
                countryCard.className = 'col-lg-4 col-md-6 col-sm-12 mb-4';
                countryCard.innerHTML = `
                    <div class="card">
                        <div class="card-header">
                            <h5 class="card-title">${country.name.common}</h5>
                        </div>
                        <div class="card-body">
                            <img src="${country.flags.svg}" class="card-img-top mb-3" alt="Flag of ${country.name.common}">
                            <p class="card-text"><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
                            <p class="card-text"><strong>Region:</strong> ${country.region}</p>
                            <p class="card-text"><strong>Country Code:</strong> ${country.cca3}</p>
                            <p class="card-text"><strong>Latlng:</strong> ${country.latlng.join(', ')}</p>
                            <button class="btn btn-primary" data-capital="${country.capital ? country.capital[0] : ''}" data-lat="${country.latlng[0]}" data-lon="${country.latlng[1]}">Click for Weather</button>
                            <div class="weather mt-3"></div>
                        </div>
                    </div>
                `;
                countriesContainer.appendChild(countryCard);
            });

            // Add event listeners to buttons after cards are created
            document.querySelectorAll('.btn-primary').forEach(button => {
                button.addEventListener('click', function() {
                    const lat = this.getAttribute('data-lat');
                    const lon = this.getAttribute('data-lon');
                    const capital = this.getAttribute('data-capital');
                    fetchWeather(capital, lat, lon, this);
                });
            });
        });

    function fetchWeather(city, lat, lon, button) {
        const apiKey = '5af7c88841cf5352d4da5b65bc77cef8';
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(weather => {
                const weatherDiv = button.nextElementSibling;
                weatherDiv.innerHTML = `
                    <p><strong>Temperature:</strong> ${weather.main.temp} °C</p>
                    <p><strong>Weather:</strong> ${weather.weather[0].description}</p>
                `;
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
    }
});

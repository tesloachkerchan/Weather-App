const searchButton = document.getElementById('searchButton');
const cityInput = document.getElementById('cityInput');
const weatherInfo = document.getElementById('weatherInfo');
const celsiusTemperature = document.getElementById('celsiusTemperature');
const fahrenheitTemperature = document.getElementById('fahrenheitTemperature');
const kelvinTemperature = document.getElementById('kelvinTemperature');

let selectedUnit = 'celsius'; // Default temperature unit

searchButton.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city !== '') {
    getWeather(city);
    cityInput.value = '';
  }
});

async function getWeather(city) {
  try {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=936fdf7c099c4522aee184058230511&q=${city}`);
    const data = await response.json();

    if (response.ok) {
      const { temp_c, temp_f, temp_k, condition } = data.current;

      weatherInfo.innerHTML = `
        <h2>${city}</h2>
        <h3>${temp_c}°C</h3>
        <p>Condition: ${condition.text}</p>
      `;
      fahrenheitTemperature.innerText = `${convertCelsiusToFahrenheit(temp_c).toFixed(2)}°F`;
      kelvinTemperature.innerText = `${convertCelsiusToKelvin(temp_c).toFixed(2)}K`;

      updateTemperatureDisplay();
    } else {
      weatherInfo.innerHTML = `<p>Error retrieving weather information. Please try again.</p>`;
    }
  } catch (error) {
    console.error('An error occurred:', error);
    weatherInfo.innerHTML = `<p>An error occurred. Please try again later.</p>`;
  }
}

function convertCelsiusToFahrenheit(celsius) {
  return (celsius * 9/5) + 32;
}

function convertCelsiusToKelvin(celsius) {
  return celsius + 273.15;
}

function updateTemperatureDisplay() {
  if (selectedUnit === 'celsius') {
    celsiusTemperature.style.fontWeight = 'bold';
    fahrenheitTemperature.style.fontWeight = 'normal';
    kelvinTemperature.style.fontWeight = 'normal';
  } else if (selectedUnit === 'fahrenheit') {
    celsiusTemperature.style.fontWeight = 'normal';
    fahrenheitTemperature.style.fontWeight = 'bold';
    kelvinTemperature.style.fontWeight = 'normal';
  } else if (selectedUnit === 'kelvin') {
    celsiusTemperature.style.fontWeight = 'normal';
    fahrenheitTemperature.style.fontWeight = 'normal';
    kelvinTemperature.style.fontWeight = 'bold';
  }
}

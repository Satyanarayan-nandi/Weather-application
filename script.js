document.getElementById('location-form').addEventListener('submit', getWeather);
let weatherDetails = document.getElementById('weather-data');

function getWeather(e) {
  e.preventDefault();
  let userInput = document.getElementById('location-input').value;
  if (userInput) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=366700daae9a8a20d72109f71a9e007f`;
    
    fetchDetails(url).then((data) => {
      if (data.error) {
        handelFetchError();
      }
      else {
        cleanDisplay();
        printDetails(data);
      }
    })
      .catch(() => {
        handelFetchError();
      })
  }
}

const fetchDetails = async (url) => {
  try {
    let res = await fetch(url);
    if (!res.ok) {
      throw new Error('Failed to fetch details');
    }
    let data = await res.json();
    return data;
  } catch (error) {
    return { error: true };
  }
}

const cleanDisplay = () => {
  document.getElementById('location-input').value = '';
  weatherDetails.innerHTML = '';
}

const printDetails = (data) => {
  weatherDetails.innerHTML = `
        <p id="city-name">${data.name}</p>
        <p id="weather-status">${data.weather[0].description}</p>
        <p id="temp">${Math.round((data.main.temp) - 271)} °C</p>`
}

const handelFetchError = () => {
  weatherDetails.innerHTML = `
    <p id=error>Error : City not found</p>`
}
const currentTemperature = document.getElementById("current-temperature")
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

// API Key: f5b917e2e73f63970c3b4fe848471f0d
// -45.8714180210415, -67.47105453394504

const url = "https://api.openweathermap.org/data/2.5/weather?lat=-45.87&lon=-67.47&units=metric&appid=f5b917e2e73f63970c3b4fe848471f0d"


async function apiFetch() {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        console.log(data); // testing only
        displayResults(data); // uncomment when ready
      } else {
          throw Error(await response.text());
      }
    } catch (error) {
        console.log(error);
    }
  }
  
apiFetch();

function displayResults(data) {
  currentTemperature.innerHTML = `${data.main.temp}&deg;C`;
  const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  let desc = data.weather[0].description;
  weatherIcon.setAttribute('SRC', iconsrc);
  weatherIcon.setAttribute('alt', "Weather Icon");
  captionDesc.textContent = `${desc}`;
}
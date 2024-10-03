const currentTemperature = document.getElementById("current-temperature")

// API Key: f5b917e2e73f63970c3b4fe848471f0d
// -45.8714180210415, -67.47105453394504

const url = "https://api.openweathermap.org/data/2.5/weather?lat=-45.87&lon=-67.47&appid=f5b917e2e73f63970c3b4fe848471f0d"


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
  currentTemperature.innerHTML = `${data._____}&deg;F`;
  const iconsrc = `https://openweathermap.org/img/w/${______}.___`;
  let desc = data.weather[0].______;
  //weatherIcon.setAttribute('___', _____);
  //weatherIcon.setAttribute('___', _____);
  captionDesc.textContent = `${desc}`;
}
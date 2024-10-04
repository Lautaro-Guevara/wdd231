const temperatureForecast1 = document.getElementById("forecast-1")
const temperatureForecast2 = document.getElementById("forecast-2")
const temperatureForecast3 = document.getElementById("forecast-3")

// API Key: f5b917e2e73f63970c3b4fe848471f0d
// -45.8714180210415, -67.47105453394504

const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=-45.87&lon=-67.47&units=metric&cnt=24&appid=f5b917e2e73f63970c3b4fe848471f0d"


async function apiFetch() {
    try {
    const response = await fetch(forecastUrl);
    if (response.ok) {
        const data = await response.json();
        console.log(data); // testing only
        forecast(data); // uncomment when ready
    } else {
        throw Error(await response.text());
    }
    } catch (error) {
        console.log(error);
    }
}

apiFetch()

function getDayName(day) {
    switch (day) {
        case 0: return 'Sunday';
        case 1: return 'Monday';
        case 2: return 'Tuesday';
        case 3: return 'Wednesday';
        case 4: return 'Wednesday';
        case 5: return 'Friday';
        case 6: return 'Saturday';
        default: return 'Unknown';
    }
}

function forecast(data){
    
    const tomorrow = new Date(data.list[0].dt_txt)
    const tomorrow2 = new Date(data.list[8].dt_txt)
    const tomorrow3 = new Date(data.list[16].dt_txt)

    temperatureForecast1.innerHTML= `${getDayName(tomorrow.getDay())}: ${data.list[4].main.temp}&deg;C`;
    temperatureForecast2.innerHTML= `${getDayName(tomorrow2.getDay())}: ${data.list[12].main.temp}&deg;C`;
    temperatureForecast3.innerHTML= `${getDayName(tomorrow3.getDay())}: ${data.list[20].main.temp}&deg;C`;
}
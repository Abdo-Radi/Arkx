const fs = require('fs');

// Define the list of cities
const cities = [
    { name: 'New York', lat: 40.7128, lng: -74.0060 },
    { name: 'London', lat: 51.5074, lng: -0.1278 },
    { name: 'Paris', lat: 48.8566, lng: 2.3522 },
    { name: 'Tokyo', lat: 35.6895, lng: 139.6917 },
    { name: 'Sydney', lat: -33.8651, lng: 151.2099 },
    { name: 'Rome', lat: 41.9028, lng: 12.4964 },
    { name: 'Cairo', lat: 30.0444, lng: 31.2357 },
    { name: 'Rio de Janeiro', lat: -22.9068, lng: -43.1729 },
    { name: 'Dubai', lat: 25.2048, lng: 55.2708 },
    { name: 'Rabat', lat: 34.0209, lng: -6.8416 }
];

// Function to fetch temperature for a given city
function fetchTemperature(city) {
    return new Promise((resolve, reject) => {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lng}&current_weather=true`;
        require('https').get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                try {
                    const weatherData = JSON.parse(data);
                    const temperature = weatherData.current_weather.temperature;
                    resolve(temperature);
                } catch (error) {
                    reject(error);
                }
            });
        }).on('error', (error) => {
            reject(error);
        });
    });
}

// Function to write temperature data to a file
function writeTemperatureToFile(cityName, temperature) {
    const filename = `${cityName}.txt`;
    fs.writeFile(filename, `The weather in ${cityName} is ${temperature}°C`, (err) => {
        if (err) {
            console.error(`Error writing temperature for ${cityName} to file:`, err);
        } else {
            console.log(`Temperature for ${cityName} has been written to ${filename}`);
        }
    });
}

// Read the city name from the input file
fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading input file:', err);
        return;
    }

    // Remove leading/trailing whitespace and convert to lowercase for case-insensitive comparison
    const cityName = data.trim().toLowerCase();

    // Find the city object corresponding to the city name
    const city = cities.find(city => city.name.toLowerCase() === cityName);
    if (!city) {
        console.error('City not found:', cityName);
        return;
    }

    // Fetch temperature for the city and write it to a file
    fetchTemperature(city)
        .then(temperature => {
            writeTemperatureToFile(city.name, temperature);
        })
        .catch(error => {
            console.error('Error fetching temperature:', error);
        });
});

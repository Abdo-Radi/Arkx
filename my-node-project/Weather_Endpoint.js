const http = require('http');
const url = require('url');
const https = require('https');

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
        https.get(url, (res) => {
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

// Create HTTP server
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;

    if (path === '/weather' && req.method === 'GET') {
        const cityName = parsedUrl.query.city;
        if (!cityName) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('City parameter is required');
            return;
        }

        // Find the city object corresponding to the city name
        const city = cities.find(city => city.name.trim().toLowerCase() === cityName.trim().toLowerCase());
        if (!city) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('City not found');
            return;
        }

        // Fetch temperature for the city and send it in response
        fetchTemperature(city)
            .then(temperature => {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(`The weather in ${cityName} is ${temperature}°C`);
            })
            .catch(error => {
                console.error('Error fetching temperature:', error);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

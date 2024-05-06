import axios from 'axios'; // Import Axios for making HTTP requests

// Assuming you have an API endpoint in your backend to check if a username exists
const API_URL = 'http://localhost:3000/users/login';

export default async function isUsernameExists(username) {
    try {
        const response = await axios.post(API_URL, { username });
        return response.data.exists;
    } catch (error) {
        console.error('Error checking username existence:', error);
        return false; // Return false if there's an error
    }
}

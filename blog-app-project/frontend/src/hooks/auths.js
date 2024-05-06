import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
export function useLogin() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate()
    async function login({ email, password, redirectTo }) {
        setIsLoading(true);
        
        try {
            const response = await axios.post('http://localhost:3000/users/login', { email, password });
            console.log(response.data); 
            
            // Assuming your backend sends back a success message
            if(response.status == 200){
               localStorage.setItem('isAuth',true) 
              
                navigate('/') 
               
            }
            else{
                window.location.reload
            }
            // Redirect or handle successful login as needed
        } catch (error) {
            console.error(error)
            setError(error.response.data.message); // Assuming your backend sends back an error message
        } finally {
            setIsLoading(false);
        }
    }

    return { login, isLoading, error };
}
export function useRegister() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    async function register({ username, email, password, redirectTo }) {
        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:3000/users/register', { username, email, password });
            console.log(response.data); // Assuming your backend sends back a success message
            // Redirect or handle successful registration as needed
        } catch (error) {
            setError(error.response.data.message); // Assuming your backend sends back an error message
        } finally {
            setIsLoading(false);
        }
    }

    return { register, isLoading, error };
}

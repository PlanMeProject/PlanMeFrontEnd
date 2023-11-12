// GoogleAuthRedirect.jsx
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';  // You might use axios or another HTTP client

function GoogleAuthRedirect() {
    const history = useHistory();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (code) {
            // Send the code to your backend
            axios.post('http://localhost:8000/api/google-auth/', { code })
                .then(response => {
                    // Handle response, e.g., save user data in local storage
                    // Redirect user to another page in your app
                    history.push('/dashboard');
                })
                .catch(error => {
                    // Handle error
                    console.error('Error during auth redirect:', error);
                });
        }
    }, [history]);

    return <div>Loading...</div>;
}

export default GoogleAuthRedirect;

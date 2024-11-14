import React, { useState } from 'react';
import axios from 'axios';
import './login.css'; // Import the external CSS file

function Login({ onAuthSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8000/login', {
                email,
                password
            });
            const { token } = response.data;
            localStorage.setItem('token', token); // Store token locally
            onAuthSuccess(); // Redirect to the Products page
        } catch (error) {
            console.error('Error during login:', error.response.data.message);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">Login</h2>
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="login-input"
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    className="login-input"
                />
                <button onClick={handleLogin} className="login-button">Log In</button>
            </div>
        </div>
    );
}

export default Login;

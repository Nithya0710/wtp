// src/Signup.js
import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';
import axios from 'axios';

function Signup({ onAuthSuccess }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSignup = async () => {
        try {
            await axios.post('http://localhost:8000/signup', {
                username,
                email,
                password
            });
            onAuthSuccess(); // Redirect to the Products page
        } catch (error) {
            setError(error.response?.data?.message || 'An error occurred during signup');
            console.error('Error during signup:', error);
        }
    };

    return (
        <Container maxWidth="xs" sx={{
            bgcolor: '#f9f9f9', // Light background
            boxShadow: 3,       // Subtle shadow
            borderRadius: 2,
            padding: 4,
            mt: 8,
        }}>
            <Typography variant="h4" component="h1" align="center" gutterBottom sx={{ color: '#333' }}>
                Sign Up
            </Typography>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <Box component="form" mt={2}>
                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    InputProps={{
                        style: {
                            backgroundColor: 'white',
                        }
                    }}
                />
                <TextField
                    label="Email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    InputProps={{
                        style: {
                            backgroundColor: 'white',
                        }
                    }}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                        style: {
                            backgroundColor: 'white',
                        }
                    }}
                />
                <Button variant="contained" color="primary" fullWidth sx={{ mt: 2, py: 1.5 }} onClick={handleSignup}>
                    Sign Up
                </Button>
            </Box>
        </Container>
    );
}

export default Signup;

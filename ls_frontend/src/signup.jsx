// src/Signup.js
import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Alert, Link } from '@mui/material';
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
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                bgcolor: '#F2F9FF', // Matches the light blue background in the image
            }}
        >
            <Container
                maxWidth="xs"
                className="curved-box"
                sx={{
                    bgcolor: 'rgba(234, 244, 255, 0.9 )', // White box background
                    border: '2px solid #4A90E2',
                    borderRadius: 2,
                    boxShadow: 3,
                    p: 4,
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
                    },
                }}
            >
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

                    {/* Login prompt above the button */}
                    <Typography
                        variant="body2"
                        align="center"
                        sx={{ mt: 2 }}
                    >
                        Already have an account?{' '}
                        <Link href="/login" underline="hover" color="primary">
                            Login
                        </Link>
                    </Typography>

                    {/* Sign Up button */}
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2, py: 1.5 }}
                        onClick={handleSignup}
                    >
                        Sign Up
                    </Button>
                </Box>
            </Container>
        </Box>
    );
}

export default Signup;

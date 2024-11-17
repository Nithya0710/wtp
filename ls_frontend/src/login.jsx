import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Alert, Link } from '@mui/material';
import axios from 'axios';

function Login({ onAuthSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

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
            setError(error.response?.data?.message || 'An error occurred during login');
            console.error('Error during login:', error.response.data.message);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                bgcolor: '#F2F9FF', 
            }}
        >
            <Container
                maxWidth="xs"
                className="curved-box"
                sx={{
                    bgcolor: 'rgba(234, 244, 255, 0.9 )',
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
                    Login
                </Typography>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                <Box component="form" mt={2}>
                    <TextField
                        label="Email"
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

                    {/* Sign Up prompt above the button */}
                    <Typography
                        variant="body2"
                        align="center"
                        sx={{ mt: 2 }}
                    >
                        Don't have an account?{' '}
                        <Link href="/signup" underline="hover" color="primary">
                            Sign Up
                        </Link>
                    </Typography>

                    {/* Login button */}
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2, py: 1.5 }}
                        onClick={handleLogin}
                    >
                        Login
                    </Button>
                </Box>
            </Container>
        </Box>
    );
}

export default Login;

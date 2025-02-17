import { useState } from "react";
import { Container, Paper, Typography, TextField, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // to navigate programmatically

    async function register(ev) {
        ev.preventDefault();

        const response = await fetch('http://localhost:4000/register', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.status === 200) {
            alert('Registration successful.');
            navigate("/login"); // Redirect to login page after successful registration
        } else {
            alert('Registration failed.');
        }
    }

    return (
        <Container maxWidth="xs">
            <Paper
                elevation={6}
                sx={{
                    padding: 6,
                    marginTop: 10,
                    borderRadius: 4,
                    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
                    backgroundColor: '#f4f4f9', // Light background color
                    textAlign: 'center',
                }}
            >
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
                    Register
                </Typography>
                <Box component="form" onSubmit={register} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        value={username}
                        onChange={ev => setUsername(ev.target.value)}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '8px',
                            },
                            '& .MuiInputLabel-root': {
                                color: '#3f51b5',
                            },
                        }}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        value={password}
                        onChange={ev => setPassword(ev.target.value)}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '8px',
                            },
                            '& .MuiInputLabel-root': {
                                color: '#3f51b5',
                            },
                        }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        sx={{
                            marginTop: 2,
                            padding: '12px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            borderRadius: '8px',
                            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
                            '&:hover': {
                                backgroundColor: '#3f51b5',
                                boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.3)',
                            },
                        }}
                    >
                        Register
                    </Button>
                </Box>

                {/* Login link */}
                <Box sx={{ marginTop: 2 }}>
                    <Typography variant="body2">
                        Already have an account?{' '}
                        <Button component={Link} to="/login" color="primary" sx={{ paddingLeft: 1 }}>
                            Login
                        </Button>
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
}
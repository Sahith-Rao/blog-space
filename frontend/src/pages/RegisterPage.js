import { useState } from "react";
import { Container, Paper, Typography, TextField, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

const StyledPaper = styled(Paper)`
    padding: 48px;
    margin-top: 50px; /* Adjusted margin to move the box up */
    border-radius: 12px; /* Increased border-radius */
    box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.15); /* Increased box-shadow */
    background: linear-gradient(135deg, #ffffff, #f4f4f9);
    text-align: center;
    width: 500px; /* Increased the width */
    margin: auto;
`;

const StyledTextField = styled(TextField)`
    & .MuiOutlinedInput-root {
        border-radius: 12px; /* Increased border-radius */
        background-color: #ffffff;
    }
    & .MuiInputLabel-root {
        color: #3f51b5;
    }
`;

const StyledButton = styled(Button)`
    margin-top: 16px;
    padding: 14px;
    font-size: 17px;
    font-weight: bold;
    border-radius: 12px; /* Increased border-radius */
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
    background: linear-gradient(135deg, #3f51b5, #303f9f); /* Gradient background */
    color: white;
    &:hover {
        background: linear-gradient(135deg, #303f9f, #1a237e);
        box-shadow: 0px 7px 20px rgba(0, 0, 0, 0.3);
    }
`;

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function register(ev) {
        ev.preventDefault();

        const response = await fetch('http://localhost:4000/register', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.status === 200) {
            alert('Registration successful.');
            navigate("/login");
        } else {
            alert('Registration failed.');
        }
    }

    return (
        <Container maxWidth="xs" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <StyledPaper elevation={6}>
                <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#3f51b5', marginBottom: 1 }}>
                    Register
                </Typography>
                <Typography variant="h6" sx={{ color: '#3f51b5', marginBottom: 2 }}>
                    Create your account
                </Typography>
                <Box component="form" onSubmit={register} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <StyledTextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        value={username}
                        onChange={ev => setUsername(ev.target.value)}
                    />
                    <StyledTextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        value={password}
                        onChange={ev => setPassword(ev.target.value)}
                    />
                    <StyledButton variant="contained" color="primary" type="submit">
                        Register
                    </StyledButton>
                </Box>

                <Box sx={{ marginTop: 2 }}>
                    <Typography variant="body2" sx={{ fontSize: '14px', color: '#3f51b5' }}>
                        Already have an account?{' '}
                        <Button component={Link} to="/login" color="primary" sx={{ paddingLeft: 1, fontSize: '14px', textTransform: 'none' }}>
                            Login
                        </Button>
                    </Typography>
                </Box>
            </StyledPaper>
        </Container>
    );
}
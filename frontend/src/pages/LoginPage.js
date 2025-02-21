import { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { Container, Paper, Typography, TextField, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import styled from "@emotion/styled";

const StyledPaper = styled(Paper)`
    padding: 48px;
    margin-top: 40px;
    border-radius: 12px;
    box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.15);
    background: linear-gradient(135deg, #ffffff, #f4f4f9);
    text-align: center;
    width: 500px;
    margin: 0 auto;
`;

const StyledTextField = styled(TextField)`
    & .MuiOutlinedInput-root {
        border-radius: 12px;
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
    border-radius: 12px;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
    background: linear-gradient(135deg, #3f51b5, #303f9f);
    color: white;
    &:hover {
        background: linear-gradient(135deg, #303f9f, #1a237e);
        box-shadow: 0px 7px 20px rgba(0, 0, 0, 0.3);
    }
`;

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const { setUserInfo } = useContext(UserContext);

    async function login(ev) {
        ev.preventDefault();
        const response = await fetch('http://localhost:4000/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });

        if (response.ok) {
            response.json().then(userInfo => {
                setUserInfo(userInfo);
                setRedirect(true);
            });
        } else {
            alert('Wrong credentials');
        }
    }

    if (redirect) {
        return <Navigate to="/index" />;
    }

    return (
        <Container maxWidth="xs" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <StyledPaper elevation={6}>
                <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#3f51b5', marginBottom: 1 }}>
                    Welcome Back!
                </Typography>
                <Typography variant="h6" sx={{ color: '#3f51b5', marginBottom: 2 }}>
                    Log into your account
                </Typography>
                <Box component="form" onSubmit={login} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
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
                        Login
                    </StyledButton>
                </Box>

                <Box sx={{ marginTop: 2 }}>
                    <Typography variant="body2" sx={{ fontSize: '14px', color: '#3f51b5' }}>
                        Don't have an account?{' '}
                        <Button component={Link} to="/register" color="primary" sx={{ paddingLeft: 1, fontSize: '14px', textTransform: 'none' }}>
                            Sign Up
                        </Button>
                    </Typography>
                </Box>
            </StyledPaper>
        </Container>
    );
}
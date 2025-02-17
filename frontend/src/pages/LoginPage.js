import { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { Container, Paper, Typography, TextField, Button, Box } from '@mui/material';

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
        return <Navigate to="/" />;
    }

    return (
        <Container maxWidth="xs">
            <Paper elevation={3} sx={{ padding: 4, marginTop: 8, textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>Login</Typography>
                <Box component="form" onSubmit={login} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField 
                        label="Username" 
                        variant="outlined" 
                        fullWidth 
                        value={username} 
                        onChange={ev => setUsername(ev.target.value)} 
                    />
                    <TextField 
                        label="Password" 
                        type="password" 
                        variant="outlined" 
                        fullWidth 
                        value={password} 
                        onChange={ev => setPassword(ev.target.value)} 
                    />
                    <Button variant="contained" color="primary" type="submit">Login</Button>
                </Box>
            </Paper>
        </Container>
    );
}
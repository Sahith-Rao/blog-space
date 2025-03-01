import { useState, useContext } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { TextField } from '@mui/material'; 
import ImportContactsOutlinedIcon from '@mui/icons-material/ImportContactsOutlined';
import '../styles/login.css';

export default function LoginPage() {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [error, setError] = useState('');
    const { setUserInfo } = useContext(UserContext);

    async function login(ev) {
        ev.preventDefault();
        setError('');

        const response = await fetch(`${backendUrl}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
            credentials: 'include',
        });

        const data = await response.json();

        if (response.ok) {
            setUserInfo(data);
            setRedirect(true);
        } else {
            setError(data.error || 'Invalid username or password');
        }
    }

    if (redirect) {
        return <Navigate to="/index" />;
    }

    return (
        <div className="login-container">
            <header className="nav-header">
                <div className="logo">
                    <ImportContactsOutlinedIcon />
                    BlogSpace
                </div>
            </header>
            <div className="login-box">
                <h2 className="login-title">Welcome Back!</h2>
                <p className="login-subtitle">Log into your account</p>

                {error && <p className="error-message">{error}</p>}

                <form className="login-form" onSubmit={login}>
                    <div className="input-wrapper">
                        <TextField
                            type="text"
                            label="Username"
                            variant="outlined"
                            fullWidth
                            value={username}
                            onChange={(ev) => setUsername(ev.target.value)}
                            required
                        />
                    </div>
                    <div className="input-wrapper">
                        <TextField
                            type="password"
                            label="Password"
                            variant="outlined"
                            fullWidth
                            value={password}
                            onChange={(ev) => setPassword(ev.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">Login</button>
                </form>

                <p className="signup-link">
                    Don't have an account? <Link to="/register">Sign Up</Link>
                </p>
            </div>
        </div>
    );
}
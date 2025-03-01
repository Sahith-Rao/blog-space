import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField } from '@mui/material';
import ImportContactsOutlinedIcon from '@mui/icons-material/ImportContactsOutlined';
import "../styles/register.css";

export default function RegisterPage() {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    async function register(ev) {
        ev.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }
        if (!/[A-Z]/.test(password) && !/\d/.test(password)) {
            setError('Password must contain at least one uppercase letter or number.');
            return;
        }
        const response = await fetch(`${backendUrl}/register`, {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();
        if (response.status === 200) {
            alert('Registration successful.');
            navigate("/login");
        } else {
            setError(data.error || 'Registration failed.');
        }
    }

    return (
        <div className="register-container">
            <header className="nav-header">
                <div className="logo">
                    <ImportContactsOutlinedIcon />
                    BlogSpace
                </div>
            </header>

            <div className="register-box">
                <h2 className="register-title">Join Us!</h2>
                <p className="register-subtitle">Create your account</p>
                {error && <p className="error-message">{error}</p>}
                <form className="register-form" onSubmit={register}>
                    <div className="input-container">
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
                    <div className="input-container">
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
                    <div className="input-container">
                        <TextField
                            type="password"
                            label="Confirm Password"
                            variant="outlined"
                            fullWidth
                            value={confirmPassword}
                            onChange={(ev) => setConfirmPassword(ev.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="register-button">Register</button>
                </form>
                <p className="login-link">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
}
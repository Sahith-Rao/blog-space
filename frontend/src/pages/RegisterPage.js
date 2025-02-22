import { useState } from "react";
import { Container } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { TextField } from '@mui/material';
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import "../styles/register.css";

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
        <div className="register-container">
            <div className="register-box">
                <h2 className="register-title">Join Us!</h2>
                <p className="register-subtitle">Create your account</p>
                <form className="register-form" onSubmit={register}>
                    <div className="input-container">
                        <PersonIcon className="input-icon" />
                        <TextField
                            type="text"
                            className="input-field"
                            placeholder="Username"
                            value={username}
                            onChange={ev => setUsername(ev.target.value)}
                            required
                        />
                    </div>
                    <div className="input-container">
                        <LockIcon className="input-icon" />
                        <TextField
                            type="password"
                            className="input-field"
                            placeholder="Password"
                            value={password}
                            onChange={ev => setPassword(ev.target.value)}
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
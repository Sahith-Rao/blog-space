import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useContext } from "react";
import { UserContext } from "./UserContext";
import ImportContactsOutlinedIcon from '@mui/icons-material/ImportContactsOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import PersonSharpIcon from '@mui/icons-material/PersonSharp';
import './styles/header.css';

export default function Header() {
    const { setUserInfo, userInfo } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();

    const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

    useEffect(() => {
        fetch("http://localhost:4000/profile", {
            credentials: "include",
        }).then(response => {
            response.json().then(userInfo => {
                setUserInfo(userInfo);
            });
        });
    }, []);

    function logout() {
        fetch("http://localhost:4000/logout", {
            credentials: "include",
            method: "POST",
        });
        setUserInfo(null);
        navigate("/login");
    }

    const username = userInfo?.username;

    if (isAuthPage) return null;

    return (
        <header className="header">
            <div className="logo-container">
                <ImportContactsOutlinedIcon className="logo-icon" />
                <Link to="/index" className="logo-text">BlogSpace</Link>
            </div>
            <nav className="nav-links">
                {username ? (
                    <div className="user-actions">
                        
                        <Link to="/create" className="nav-button create-post">
                            <AddIcon /> Create Post
                        </Link>
                        <button className="nav-button user-info">
                            <PersonSharpIcon />
                            <span className="username"> {username}</span>
                        </button>
                        <button onClick={logout} className="nav-button logout-button">
                            <LogoutIcon /> Logout
                        </button>
                    </div>
                ) : (
                    <div className="auth-buttons">
                        <Link to="/login" className="nav-button login-button">
                            <PersonSharpIcon /> Login
                        </Link>
                        <Link to="/register" className="nav-button register-button">
                            <PersonSharpIcon /> Register
                        </Link>
                    </div>
                )}
            </nav>
        </header>
    );
}

import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useContext } from "react";
import { UserContext } from "./UserContext";
import ImportContactsOutlinedIcon from "@mui/icons-material/ImportContactsOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import SearchIcon from '@mui/icons-material/Search';
import ArticleIcon from '@mui/icons-material/Article'; 
import "./styles/header.css";

export default function Header({ onSearch = () => {} }) {
    const backendUrl = "http://localhost:4000";
    const { setUserInfo, userInfo } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();
    const isIndexPage = location.pathname === "/index";

    useEffect(() => {
        fetch(`${backendUrl}/profile`, {
            credentials: "include",
        }).then(response => {
            response.json().then(userInfo => {
                setUserInfo(userInfo);
            });
        });
    }, [setUserInfo]);

    function logout() {
        fetch(`${backendUrl}/logout`, {
            credentials: "include",
            method: "POST",
        });
        setUserInfo(null);
        navigate("/login");
    }

    const username = userInfo?.username;

    return (
        <header className="header">
            <div className="logo-container">
                <ImportContactsOutlinedIcon className="logo-icon" />
                <Link to="/index" className="logo-text">BlogSpace</Link>
            </div>

            {isIndexPage && (
                <div className="search-container">
                    <div className="search-input-wrapper">
                        <SearchIcon className="search-icon" /> 
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search posts..."
                            onChange={(e) => onSearch(e.target.value)}
                        />
                    </div>
                </div>
            )}

            <nav className="user-actions">
                {username ? (
                    <>
                        <Link to="/create" className="nav-button create-post">
                            <AddIcon /> Create Post
                        </Link>
                        <Link to="/myposts" className="nav-button my-posts">
                            <ArticleIcon /> My Posts
                        </Link>
                        <button className="nav-button user-info">
                            <PersonSharpIcon />
                            <span className="username">{username}</span>
                        </button>
                        <button onClick={logout} className="nav-button logout-button">
                            <LogoutIcon />
                        </button>
                    </>
                ) : (
                    <Link to="/login" className="nav-button create-post">
                        <PersonSharpIcon /> Login
                    </Link>
                )}
            </nav>
        </header>
    );
}
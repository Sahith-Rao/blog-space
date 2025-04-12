import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { UserContext } from "./UserContext";
import ImportContactsOutlinedIcon from "@mui/icons-material/ImportContactsOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import SearchIcon from '@mui/icons-material/Search';
import ArticleIcon from '@mui/icons-material/Article';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import "./styles/header.css";

export default function Header({ onSearch = () => {} }) {
    const backendUrl = "http://localhost:4000";
    const { setUserInfo, userInfo } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();
    const isIndexPage = location.pathname === "/index";
    const [searchQuery, setSearchQuery] = useState("");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        onSearch(e.target.value);
    };

    const username = userInfo?.username;

    return (
        <>
            <header className="header">
                <div className="logo-container">
                    <button className="mobile-menu-button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                    </button>
                    <ImportContactsOutlinedIcon className="logo-icon" />
                    <Link to="/index" className="logo-text">BlogSpace</Link>
                </div>

                {isIndexPage && (
                    <div className="search-container">
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search posts..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <button className="search-icon-button">
                            <SearchIcon />
                        </button>
                    </div>
                )}

                <nav className={`user-actions ${mobileMenuOpen ? 'mobile-open' : ''}`}>
                    {username ? (
                        <>
                            <Link to="/create" className="nav-button" onClick={() => setMobileMenuOpen(false)}>
                                <AddIcon /> Create Post
                            </Link>
                            <Link to="/myposts" className="nav-button" onClick={() => setMobileMenuOpen(false)}>
                                <ArticleIcon /> My Posts
                            </Link>
                            <div className="nav-button user-info">
                                <PersonSharpIcon />
                                <span className="username">{username}</span>
                            </div>
                            <button onClick={logout} className="nav-button logout-button">
                                <LogoutIcon /> Logout
                            </button>
                        </>
                    ) : (
                        <Link to="/login" className="nav-button" onClick={() => setMobileMenuOpen(false)}>
                            <PersonSharpIcon /> Login
                        </Link>
                    )}
                </nav>
            </header>
            {mobileMenuOpen && <div className="mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)} />}
        </>
    );
}
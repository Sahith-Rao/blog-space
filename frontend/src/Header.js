import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useContext } from "react";
import { UserContext } from "./UserContext";
import { AppBar, Toolbar, Typography, Button, Avatar, Box, Stack } from "@mui/material";

export default function Header() {
    const { setUserInfo, userInfo } = useContext(UserContext);
    const navigate = useNavigate(); // useNavigate hook for navigation
    const location = useLocation(); // useLocation hook to get the current path

    // Check if the current page is login or register
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
        navigate("/login"); // Redirect to login page after logout
    }

    const username = userInfo?.username;

    // If the current page is login or register, don't render the header
    if (isAuthPage) return null;

    return (
        <AppBar position="static" color="primary">
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                {/* Company Logo */}
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Avatar src="/logo.png" alt="Company Logo" />
                    <Typography variant="h6" component={Link} to="/" color="inherit" sx={{ textDecoration: "none" }}>
                        My Blog
                    </Typography>
                </Stack>

                {/* Navigation Links */}
                <Box>
                    {username ? (
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Typography variant="body1">Hello, {username}</Typography>
                            <Button component={Link} to="/create" variant="contained" color="secondary">
                                Create Post
                            </Button>
                            <Button variant="outlined" color="inherit" onClick={logout}>
                                Logout
                            </Button>
                        </Stack>
                    ) : (
                        <Stack direction="row" spacing={2}>
                            <Button component={Link} to="/login" color="inherit">
                                Login
                            </Button>
                            <Button component={Link} to="/register" variant="contained" color="secondary">
                                Register
                            </Button>
                        </Stack>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}
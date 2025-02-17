import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useContext } from "react";
import { UserContext } from "./UserContext";
import { AppBar, Toolbar, Typography, Button, Avatar, Box, Stack } from "@mui/material";
import styled from "@emotion/styled";

const StyledAppBar = styled(AppBar)`
    position: static;
    background: linear-gradient(135deg, #3f51b5, #303f9f);
    box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.15);
`;

const StyledToolbar = styled(Toolbar)`
    display: flex;
    justify-content: space-between;
`;

const LogoContainer = styled(Stack)`
    flex-direction: row;
    align-items: center;
    gap: 8px;
`;

const StyledTypography = styled(Typography)`
    text-decoration: none;
    color: white;
    font-weight: bold;
`;

const StyledButton = styled(Button)`
    text-transform: none;
    border-radius: 12px;
    font-weight: bold;
    padding: 10px 20px;
    font-size: 14px;
    &:hover {
        background-color: #303f9f;
    }
`;

const UsernameText = styled(Typography)`
    font-size: 16px;
    font-weight: 600;
    color: white;
`;

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
        <StyledAppBar>
            <StyledToolbar>
                <LogoContainer>
                    <Avatar src="https://t4.ftcdn.net/jpg/03/49/37/73/360_F_349377375_ffnj0RHK52KsooH7IBdtpjNtdEP7bKM7.jpg" alt="Company Logo" />
                    <StyledTypography variant="h6" component={Link} to="/">
                        My Blog
                    </StyledTypography>
                </LogoContainer>
                <Box>
                    {username ? (
                        <Stack direction="row" spacing={2} alignItems="center">
                            <UsernameText variant="body1">
                                Hello, {username}
                            </UsernameText>
                            <StyledButton component={Link} to="/create" variant="contained" color="secondary">
                                Create Post
                            </StyledButton>
                            <StyledButton variant="outlined" color="inherit" onClick={logout}>
                                Logout
                            </StyledButton>
                        </Stack>
                    ) : (
                        <Stack direction="row" spacing={2}>
                            <StyledButton component={Link} to="/login" color="inherit">
                                Login
                            </StyledButton>
                            <StyledButton component={Link} to="/register" variant="contained" color="secondary">
                                Register
                            </StyledButton>
                        </Stack>
                    )}
                </Box>
            </StyledToolbar>
        </StyledAppBar>
    );
}
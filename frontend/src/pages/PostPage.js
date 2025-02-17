import { useParams, Link } from "react-router-dom";
import { useContext, useEffect, useState } from 'react';
import { formatISO9075 } from "date-fns";
import { UserContext } from '../UserContext';
import { Container, Paper, Typography, Box, Button, CardMedia } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import styled from "@emotion/styled";

const StyledPaper = styled(Paper)`
    padding: 32px;
    border-radius: 12px; /* Increased border-radius for smoother look */
    box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.15); /* Added a more prominent shadow */
    text-align: center;
    background-color: #fff; /* Added white background for better contrast */
`;

const StyledTitle = styled(Typography)`
    font-weight: bold;
    color: black;
    margin-bottom: 8px;
    &:hover {
        color: #333; /* Smooth transition for hover effect */
    }
`;

const StyledDate = styled(Typography)`
    color: text.secondary;
    margin-bottom: 16px;
`;

const StyledButton = styled(Button)`
    text-transform: none;
    border-radius: 12px; /* Increased border-radius */
    padding: 10px 20px;
    font-size: 14px;
    &:hover {
        background-color: #e0e0e0;
        box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.1); /* Added subtle hover shadow */
    }
`;

const StyledCardMedia = styled(CardMedia)`
    width: 100%;
    max-height: 400px;
    object-fit: cover;
    border-radius: 12px; /* Increased border-radius for image */
    margin-bottom: 24px;
`;

export default function PostPage() {
    const [postInfo, setPostInfo] = useState(null);
    const { userInfo } = useContext(UserContext);
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:4000/post/${id}`)
            .then(response => response.json())
            .then(postInfo => setPostInfo(postInfo));
    }, [id]);

    if (!postInfo) return '';

    return (
        <Container maxWidth="md" sx={{ marginTop: 4 }}>
            <StyledPaper elevation={6}>
                <StyledTitle variant="h4">
                    {postInfo.title}
                </StyledTitle>

                <StyledDate variant="body2">
                    {formatISO9075(new Date(postInfo.createdAt))} | by {postInfo.author.username}
                </StyledDate>

                {userInfo.id === postInfo.author._id && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
                        <StyledButton
                            variant="outlined"
                            component={Link}
                            to={`/edit/${postInfo._id}`}
                            startIcon={<EditIcon />}
                        >
                            Edit this post
                        </StyledButton>
                    </Box>
                )}

                <StyledCardMedia
                    component="img"
                    image={`http://localhost:4000/${postInfo.cover}`}
                    alt={postInfo.title}
                />

                <Typography variant="body1" sx={{ textAlign: 'left', lineHeight: 1.6 }}>
                    {postInfo.content}
                </Typography>
            </StyledPaper>
        </Container>
    );
}
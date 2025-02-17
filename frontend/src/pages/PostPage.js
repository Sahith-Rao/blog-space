import { useParams, Link } from "react-router-dom";
import { useContext, useEffect, useState } from 'react';
import { formatISO9075 } from "date-fns";
import { UserContext } from '../UserContext';
import { Container, Paper, Typography, Box, Button, CardMedia } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

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
            <Paper
                elevation={6}
                sx={{
                    padding: 4,
                    borderRadius: 4,
                    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
                    textAlign: 'center',
                }}
            >
                {/* Title */}
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'black', marginBottom: 1 }}>
                    {postInfo.title}
                </Typography>

                {/* Date and Author */}
                <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 2 }}>
                    {formatISO9075(new Date(postInfo.createdAt))} | by {postInfo.author.username}
                </Typography>

                {/* Edit Button (Visible only to the post owner) */}
                {userInfo.id === postInfo.author._id && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
                        <Button
                            variant="outlined"
                            component={Link}
                            to={`/edit/${postInfo._id}`}
                            startIcon={<EditIcon />}
                            sx={{
                                textTransform: 'none',
                                borderRadius: '8px',
                                '&:hover': { backgroundColor: '#f4f4f9' },
                            }}
                        >
                            Edit this post
                        </Button>
                    </Box>
                )}

                {/* Post Image */}
                <CardMedia
                    component="img"
                    image={`http://localhost:4000/${postInfo.cover}`}
                    alt={postInfo.title}
                    sx={{
                        width: '100%',
                        maxHeight: '400px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        marginBottom: 3,
                    }}
                />

                {/* Post Content */}
                <Typography variant="body1" sx={{ textAlign: 'left', lineHeight: 1.6 }}>
                    {postInfo.content}
                </Typography>
            </Paper>
        </Container>
    );
}
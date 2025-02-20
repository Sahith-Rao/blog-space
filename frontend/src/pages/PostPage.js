import { useParams, Link } from "react-router-dom";
import { useContext, useEffect, useState } from 'react';
import { formatISO9075 } from "date-fns";
import { UserContext } from '../UserContext';
import { Container, Paper, Typography, Box, Button, TextField, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

export default function PostPage() {
    const [postInfo, setPostInfo] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [likes, setLikes] = useState(0);
    const { userInfo } = useContext(UserContext);
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:4000/post/${id}`)
            .then(response => response.json())
            .then(data => {
                setPostInfo(data);
                setLikes(data.likes || 0);
            });
        fetch(`http://localhost:4000/comments/${id}`)
            .then(response => response.json())
            .then(setComments);
    }, [id]);

    const addComment = async () => {
        if (!newComment.trim()) return;
        const response = await fetch(`http://localhost:4000/comments/${id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ content: newComment })
        });
        if (response.ok) {
            const comment = await response.json();
            setComments([...comments, comment]);
            setNewComment("");
        }
    };

    const likePost = async () => {
        await fetch(`http://localhost:4000/post/${id}/like`, { method: 'POST' });
        setLikes(likes + 1);
    };

    if (!postInfo) return '';

    return (
        <Container maxWidth="md">
            <Paper elevation={6} style={{ padding: 20 }}>
                <Typography variant="h4">{postInfo.title}</Typography>
                <Typography variant="body2">{formatISO9075(new Date(postInfo.createdAt))} | by {postInfo.author.username}</Typography>
                {userInfo.id === postInfo.author._id && (
                    <Button variant="outlined" component={Link} to={`/edit/${postInfo._id}`} startIcon={<EditIcon />}>Edit</Button>
                )}
                <img src={`http://localhost:4000/${postInfo.cover}`} alt={postInfo.title} style={{ width: '100%' }} />
                <Typography>{postInfo.content}</Typography>
                <Box>
                    <IconButton onClick={likePost}><ThumbUpIcon /> {likes}</IconButton>
                </Box>
                <Box>
                    <TextField fullWidth value={newComment} onChange={(e) => setNewComment(e.target.value)} label="Add a comment" variant="outlined" />
                    <Button onClick={addComment}>Comment</Button>
                </Box>
                {comments.map(comment => (
                    <Box key={comment._id}>
                        <Typography><strong>{comment.author.username}</strong>: {comment.content}</Typography>
                    </Box>
                ))}
            </Paper>
        </Container>
    );
}
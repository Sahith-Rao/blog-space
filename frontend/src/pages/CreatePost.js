import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Container, Paper, TextField, Button, Box, Typography } from '@mui/material';
import styled from "@emotion/styled";

const StyledPaper = styled(Paper)`
    padding: 32px;
    margin-top: 48px;
    border-radius: 12px; /* Increased border-radius for a smoother look */
    box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.15); /* Enhanced shadow */
    text-align: center;
    background-color: #fff;
`;

const StyledButton = styled(Button)`
    padding: 12px;
    font-size: 16px;
    font-weight: bold;
    border-radius: 8px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
    &:hover {
        background-color: #303f9f;
        box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.3);
    }
`;

export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);

    async function createNewPost(ev) {
        ev.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files[0]);

        const response = await fetch('http://localhost:4000/post', {
            method: 'POST',
            body: data,
            credentials: 'include',
        });

        if (response.ok) {
            setRedirect(true);
        }
    }

    if (redirect) {
        return <Navigate to="/" />;
    }

    return (
        <Container maxWidth="sm">
            <StyledPaper elevation={6}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
                    Create a New Post
                </Typography>
                <Box component="form" onSubmit={createNewPost} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        label="Title"
                        variant="outlined"
                        fullWidth
                        value={title}
                        onChange={ev => setTitle(ev.target.value)}
                    />
                    <TextField
                        label="Summary"
                        variant="outlined"
                        fullWidth
                        value={summary}
                        onChange={ev => setSummary(ev.target.value)}
                    />
                    <Button
                        variant="contained"
                        component="label"
                        sx={{
                            backgroundColor: '#3f51b5',
                            color: 'white',
                            textTransform: 'none',
                            '&:hover': { backgroundColor: '#303f9f' },
                            marginTop: 1,
                        }}
                    >
                        Upload Cover Image
                        <input type="file" hidden onChange={ev => setFiles(ev.target.files)} />
                    </Button>
                    <TextField
                        label="Content"
                        multiline
                        rows={6}
                        variant="outlined"
                        fullWidth
                        value={content}
                        onChange={ev => setContent(ev.target.value)}
                    />
                    <StyledButton type="submit" variant="contained" color="primary">
                        Create Post
                    </StyledButton>
                </Box>
            </StyledPaper>
        </Container>
    );
}
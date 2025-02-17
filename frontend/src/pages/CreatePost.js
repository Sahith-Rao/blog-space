import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Container, Paper, TextField, Button, Box, Typography } from '@mui/material';

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
            <Paper
                elevation={6}
                sx={{
                    padding: 4,
                    marginTop: 6,
                    borderRadius: 4,
                    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
                    textAlign: 'center',
                }}
            >
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
                        sx={{ borderRadius: '8px' }}
                    />
                    <TextField
                        label="Summary"
                        variant="outlined"
                        fullWidth
                        value={summary}
                        onChange={ev => setSummary(ev.target.value)}
                        sx={{ borderRadius: '8px' }}
                    />

                    {/* File Upload */}
                    <Button
                        variant="contained"
                        component="label"
                        sx={{
                            backgroundColor: '#3f51b5',
                            color: 'white',
                            textTransform: 'none',
                            '&:hover': { backgroundColor: '#303f9f' },
                        }}
                    >
                        Upload Cover Image
                        <input type="file" hidden onChange={ev => setFiles(ev.target.files)} />
                    </Button>

                    {/* Text Area for Content */}
                    <TextField
                        label="Content"
                        multiline
                        rows={6}
                        variant="outlined"
                        fullWidth
                        value={content}
                        onChange={ev => setContent(ev.target.value)}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{
                            padding: '12px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            borderRadius: '8px',
                            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
                            '&:hover': {
                                backgroundColor: '#303f9f',
                                boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.3)',
                            },
                        }}
                    >
                        Create Post
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}
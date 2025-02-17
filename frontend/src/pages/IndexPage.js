import { useEffect, useState } from "react";
import { Grid, Container } from "@mui/material";
import Post from "../Post";

export default function IndexPage() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:4000/post")
            .then(response => response.json())
            .then(posts => setPosts(posts));
    }, []);

    return (
        <Container sx={{ marginTop: 4 }}>
            <Grid container spacing={4} justifyContent="center">
                {posts.length > 0 && posts.map(post => (
                    <Grid item xs={12} sm={6} key={post._id}>
                        <Post {...post} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
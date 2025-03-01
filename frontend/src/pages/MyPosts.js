import { useEffect, useState } from "react";

import Post from "../Post"; 
import Header from "../Header"; 
import "../styles/index.css"; 

export default function MyPosts() {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch(`${backendUrl}/myposts`, {
            credentials: 'include',
        })
            .then(response => response.json())
            .then(posts => {
                setPosts(posts);
            });
    }, [backendUrl]);

    return (
        <>
            <Header /> 
            <div className="index-page">
                <div className="heading">
                    <h1>My Blog Posts</h1>
                    <p>Discover all the posts you've created</p>
                </div>
                <div className="posts-container">
                    {posts.length > 0 ? (
                        posts.map(post => (
                            <div className="post-wrapper" key={post._id}>
                                <Post {...post} /> 
                            </div>
                        ))
                    ) : (
                        <p className="no-posts">No posts found</p>
                    )}
                </div>
            </div>
        </>
    );
}
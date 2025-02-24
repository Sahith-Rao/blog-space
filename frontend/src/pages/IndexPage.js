
import { useEffect, useState } from "react";
import Post from "../Post";
import '../styles/index.css';

export default function IndexPage() {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch(`${backendUrl}/post`)
            .then(response => response.json())
            .then(posts => setPosts(posts));
    }, []);

    return (
        
        <div className="index-page" >      
            <div className = "heading">
                <h1>Our Latest Blog Posts</h1>
                <p>Discover insights, tutorials, and thoughts on technology, development, and design</p>
            </div>
            <div className="posts-container">
                {posts.length > 0 && posts.map(post => (
                    <div className="post-wrapper" key={post._id}>
                        <Post {...post} />
                    </div>
                ))}
            </div>
        </div>
    );
}
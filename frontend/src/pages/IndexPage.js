import { useEffect, useState } from "react";
import Post from "../Post";
import Header from "../Header"; 
import '../styles/index.css';

export default function IndexPage() {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);

    useEffect(() => {
        fetch(`${backendUrl}/post`)
            .then(response => response.json())
            .then(posts => {
                setPosts(posts);
                setFilteredPosts(posts);
            });
    }, [backendUrl]);

    const handleSearch = (query) => {
        const filtered = posts.filter(post =>
            post.title.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredPosts(filtered);
    };

    return (
        <>
            
            <Header onSearch={handleSearch} />
            <div className="index-page">
                <div className="posts-container">
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map(post => (
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
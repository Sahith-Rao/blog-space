import { useParams, Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from 'react';
import { format } from "date-fns";
import { UserContext } from '../UserContext';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import '../styles/postpage.css';

export default function PostPage() {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const [postInfo, setPostInfo] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const { userInfo } = useContext(UserContext);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${backendUrl}/post/${id}`)
            .then(response => response.json())
            .then(data => {
                setPostInfo(data);
            });
        fetch(`${backendUrl}/comments/${id}`)
            .then(response => response.json())
            .then(setComments);
    }, [id, backendUrl]);

    const addComment = async () => {
        if (!newComment.trim()) return;
        const response = await fetch(`${backendUrl}/comments/${id}`, {
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

    const deletePost = async () => {
        if (window.confirm('Click Ok to delete this post')) {
            const response = await fetch(`${backendUrl}/post/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            if (response.ok) {
                navigate('/index');
            }
        }
    };

    if (!postInfo) return '';

    return (
        <div className="post-container">
            <div className="post-content">
                <h1 className="post-title">{postInfo.title}</h1>
                <div className="post-meta-edit">
                    <p className="post-meta">
                        {format(new Date(postInfo.createdAt), 'MMMM d, yyyy')} |  
                        <PersonIcon className="icon" /> {postInfo.author.username}
                    </p>
                    {userInfo?.id === postInfo.author._id && (
                        <div className="post-actions">
                            <Link to={`/edit/${postInfo._id}`} className="edit-button">
                                <EditIcon className="icon" /> Edit Post
                            </Link>
                            <button onClick={deletePost} className="delete-button">
                                <DeleteIcon className="icon" /> Delete Post
                            </button>
                        </div>
                    )}
                </div>
                
                <img src={postInfo.cover} alt={postInfo.title} className="post-image" />
                <div className="post-body" dangerouslySetInnerHTML={{ __html: postInfo.content }}></div>
                
                <div className="comments-section">
                    <h2 className="comments-title">Comments</h2>
                    <div className="comment-input">
                        <input
                            type="text"
                            className="comment-field"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Add a comment..."
                            onKeyPress={(e) => e.key === 'Enter' && addComment()}
                        />
                        <button className="comment-button" onClick={addComment}>
                            <SendRoundedIcon className="icon" /> 
                        </button>
                    </div>
                    <div className="comment-list">
                        {comments.map(comment => (
                            <div className="comment-item" key={comment._id}>
                                <strong><PersonIcon className="icon" /> {comment.author.username}</strong> {comment.content}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
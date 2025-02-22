import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import '../styles/create.css';

export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState(null);
    const [preview, setPreview] = useState('');
    const [redirect, setRedirect] = useState(false);

    function handleFileChange(ev) {
        const file = ev.target.files[0];
        setFiles(ev.target.files);
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    }

    async function createNewPost(ev) {
        ev.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        if (files) {
            data.set('file', files[0]);
        }

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
        return <Navigate to="/index" />;
    }

    return (
        <div className="create-post-container">
            <h2 className="create-post-title">Create New Post</h2>
            <form onSubmit={createNewPost} className="create-post-form">
                <input
                    type="text"
                    placeholder="Enter post title"
                    className="input-field"
                    value={title}
                    onChange={ev => setTitle(ev.target.value)}
                />
                <input
                    type="text"
                    placeholder="Enter post summary"
                    className="input-field"
                    value={summary}
                    onChange={ev => setSummary(ev.target.value)}
                />
                
                <textarea
                    placeholder="Enter post content"
                    className="input-field"
                    rows="6"
                    value={content}
                    onChange={ev => setContent(ev.target.value)}
                ></textarea>
                <label className="upload-button">
                    Upload Cover Image
                    <input type="file" hidden onChange={handleFileChange} />
                </label>
                {preview && <img src={preview} alt="Preview" className="preview-image" />}
                <button type="submit" className="submit-button">Create Post</button>
            </form>
        </div>
    );
}

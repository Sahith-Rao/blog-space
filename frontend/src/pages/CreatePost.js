import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import ImageIcon from '@mui/icons-material/Image';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../styles/create.css';

export default function CreatePost() {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [files, setFiles] = useState(null);
    const [preview, setPreview] = useState('');
    const [redirect, setRedirect] = useState(false);

    function handleFileChange(ev) {
        const file = ev.target.files[0];
        setFiles(ev.target.files); //
        if (file) {
            setPreview(URL.createObjectURL(file)); //
        }
    }

    async function createNewPost(ev) {
        ev.preventDefault();
        if (!title || !summary || editorState.getCurrentContent().hasText() === false) {
            alert("Title, summary, and content cannot be empty.");
            return;
        }
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        const content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        data.set('content', content);
        if (files) {
            data.set('file', files[0]);
        }

        const response = await fetch(`${backendUrl}/post`, {
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
                <div className="input-group">
                    <label className="input-label">Title</label>
                    <input
                        type="text"
                        placeholder="Enter post title"
                        className="input-field"
                        value={title}
                        onChange={ev => setTitle(ev.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label className="input-label">Summary</label>
                    <input
                        type="text"
                        placeholder="Enter post summary"
                        className="input-field"
                        value={summary}
                        onChange={ev => setSummary(ev.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label className="input-label">Content</label>
                    <Editor
                        editorState={editorState}
                        wrapperClassName="editor-wrapper"
                        editorClassName="editor"
                        toolbarClassName="toolbar"
                        onEditorStateChange={setEditorState}
                        placeholder="Write your content here..."
                    />
                </div>
                <div className="input-group">
                    <label className="input-label upload-label">
                        <ImageIcon className="image-upload-icon" />
                        Upload Cover Image
                        <input type="file" hidden onChange={handleFileChange} />
                    </label>
                </div>
                {preview && <img src={preview} alt="Preview" className="preview-image" />}
                <button type="submit" className="submit-button">Create Post</button>
            </form>
        </div>
    );
}
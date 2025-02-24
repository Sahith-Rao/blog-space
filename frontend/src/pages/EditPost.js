import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import ImageIcon from '@mui/icons-material/Image';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../styles/create.css';

export default function EditPost() {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [files, setFiles] = useState(null);
    const [preview, setPreview] = useState('');
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        fetch(`${backendUrl}/post/${id}`)
            .then(res => res.json())
            .then(post => {
                setTitle(post.title);
                setSummary(post.summary);
                const contentBlock = htmlToDraft(post.content);
                if (contentBlock) {
                    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                    setEditorState(EditorState.createWithContent(contentState));
                }
                // Set direct Cloudinary URL for preview
                setPreview(post.cover);
            });
    }, [id]);

    function handleFileChange(ev) {
        const file = ev.target.files[0];
        setFiles(ev.target.files);
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    }

    async function updatePost(ev) {
        ev.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        const content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        data.set('content', content);
        if (files) {
            data.set('file', files[0]);
        }

        const response = await fetch(`${backendUrl}/post/${id}`, {
            method: 'PUT',
            body: data,
            credentials: 'include',
        });

        if (response.ok) {
            setRedirect(true);
        }
    }

    if (redirect) {
        return <Navigate to={`/post/${id}`} />;
    }

    return (
        <div className="create-post-container">
            <h2 className="create-post-title">Edit Post</h2>
            <form onSubmit={updatePost} className="create-post-form">
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
                        placeholder="Update your content here..."
                    />
                </div>
                <div className="input-group">
                    <label className="input-label upload-label">
                        <ImageIcon className="image-upload-icon" />
                        Upload New Cover Image
                        <input type="file" hidden onChange={handleFileChange} />
                    </label>
                </div>
                {/* Display existing cover image or new preview */}
                {preview && <img src={preview} alt="Preview" className="preview-image" />}
                <button type="submit" className="submit-button">Update Post</button>
            </form>
        </div>
    );
}
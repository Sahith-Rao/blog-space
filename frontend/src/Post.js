import { Link } from 'react-router-dom';
import './styles/post.css';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';

export default function Post({ _id, title, summary, cover, createdAt, author }) {
    
    const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
    });

    return (
        <div className="post-card">
            <img
                className="post-image"
                src={cover} 
                alt={title}
            />
            <div className="post-content">
                <h2 className="post-title">{title}</h2>
                <div className="post-info">
                    <span className="info-item">
                        <PersonOutlineOutlinedIcon fontSize="small" /> {author.username}
                    </span>
                    <span className="info-separator">|</span>
                    <span className="info-item">
                        <CalendarTodayOutlinedIcon fontSize="small" /> {formattedDate}
                    </span>
                </div>
                <p className="post-summary">{summary}</p>
                <Link to={`/post/${_id}`} className="read-more-button">Read More</Link>
            </div>
        </div>
    );
}
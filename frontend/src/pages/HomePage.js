import React from 'react';
import { Link } from 'react-router-dom';
import ImportContactsOutlinedIcon from '@mui/icons-material/ImportContactsOutlined';
import '../styles/home.css';

export default function HomePage() {
  return (
    <div className="landing-container">
      <div className="decorative-circle circle-1"></div>
      <div className="decorative-circle circle-2"></div>
      
      <header className="nav-header">
        <div className="logo">
          <ImportContactsOutlinedIcon></ImportContactsOutlinedIcon>
          BlogSpace
        </div>
      </header>                  
      <main className="hero-section">
        <h1 className="hero-title">Share Your Story With The World</h1>
        <p className="hero-subtitle">
          Join our community of writers and readers. Create, share, and discover
          amazing stories that matter. Start your journey today by creating an account
          or logging in to your existing one.
        </p>
        <div className="cta-buttons">
          <Link to="/login" className="btn btn-login">Login</Link>
          <Link to="/register" className="btn btn-register">Register</Link>
        </div>
      </main>
    </div>
  );
}




import { Link } from "react-router-dom";
import {useEffect} from 'react';

export default function Header() {
  
    return(
        <header>
                <Link to="/" className="logo">My Blog</Link>
                <nav>
                  <Link to ="/login">Login</Link>
                  <Link to ="/register">Register</Link>
                </nav>
              </header>
    );
}
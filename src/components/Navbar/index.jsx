import React from 'react';
import { Link } from "react-router-dom";

import './style.css';

export function Navbar({ }) {
    /**home, profile, sign out/sign in */
    return (
        <header className='sidenav'>
            <h1>Picar</h1>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/profile">Profile</Link>
                </li>
                <li>
                    Sign out
                </li>
            </ul >
        </header >
    )
}
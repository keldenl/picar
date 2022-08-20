import React from 'react';
import { Link } from "react-router-dom";

import './style.css';

export function Navbar({ }) {
    return (
        <header>
            <h1>Picar</h1>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
            </ul >
        </header >
    )
}
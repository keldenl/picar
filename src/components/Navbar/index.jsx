import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import './style.css';

export function Navbar({ }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState({});

    useEffect(() => {
        fetch('http://localhost:9000/profile', {
            method: 'GET',
            credentials: 'include'
        })
            .then((res) => {
                if (res.status >= 400) {
                    throw new Error(`${res.status} - ${res.statusText}`)
                }
                return res.json()
            })
            .then((json) => {
                setIsAuthenticated(true);
                setUser(json.user)
                console.log(json);
            }).catch((err) => {
                console.log(err);
            });
    }, []);
    /**home, profile, sign out/sign in */
    return (
        <header className='sidenav'>
            <h1>Picar</h1>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                {isAuthenticated ?
                    <>
                        <li>
                            <Link to={`/profile/${user.username}`}>{user.username}</Link>
                        </li>
                        <li>
                            <Link to="/settings">Settings</Link>
                        </li>
                    </>
                    :
                    <li>
                        <a href="http://localhost:9000/google">Sign In</a>
                    </li>
                }
            </ul >
        </header >
    )
}
import React, { useEffect, useState } from 'react';
import { BiGroup, BiHome, BiLogIn, BiUserCircle, BiWrench } from 'react-icons/bi';
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
                    <Link to="/"><BiHome /> Home</Link>
                </li>
                {isAuthenticated ?
                    <>
                        <li>
                            <Link to="/requests"><BiGroup /> Friend Requests</Link>
                        </li>
                        <li>
                            <Link to={`/profile/${user.username}`}><BiUserCircle /> {user.username}</Link>
                        </li>
                        <li>
                            <Link to="/settings"><BiWrench /> Settings</Link>
                        </li>
                    </>
                    :
                    <li>
                        <a href="http://localhost:9000/google"><BiLogIn /> Sign In</a>
                    </li>
                }
            </ul >
        </header >
    )
}
import React, { useEffect, useState } from 'react';
import { BiGroup, BiHome, BiLogIn, BiUserCircle, BiWrench } from 'react-icons/bi';
import { Link } from "react-router-dom";
import { API_URL } from '../../utils';
import { Uploader } from '../Uploader';

import './style.css';

export function Navbar({ }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState({});

    useEffect(() => {
        fetch(`${API_URL}/profile`, {
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
            <ul>
                <li>
                    <h1>Picar</h1>
                </li>
                <li>
                    <Link to="/"><BiHome /> Home</Link>
                </li>
                {isAuthenticated ?
                    <>
                        <li>
                            <Link to={`/profile/${user.username}`}><BiUserCircle /> {user.username}</Link>
                        </li>
                        <li>
                            <Uploader />
                        </li>

                        <li style={{ marginTop: 'auto' }}>
                            <Link to="/requests"><BiGroup /> Friend Requests</Link>
                        </li>
                        <li>
                            <Link to="/settings"><BiWrench /> Settings</Link>
                        </li>
                    </>
                    :
                    <li>
                        <a href={`${API_URL}/google`}><BiLogIn /> Sign In</a>
                    </li>
                }
            </ul >
        </header >
    )
}
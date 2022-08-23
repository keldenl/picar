import React, { useState } from 'react';
import { DEFAULT_POST_CONFIG, DEFAULT_FETCH_CONFIG } from '../../api/middlewareConfig';
import { Navbar } from '../../components/Navbar';
import './style.css';

export function Settings({ }) {
    const [username, setUsername] = useState('');

    const onUpdateUser = () => {
        fetch('http://localhost:9000/updateUsername', {
            ...DEFAULT_POST_CONFIG,
            ...DEFAULT_FETCH_CONFIG,
            body: JSON.stringify({ username })
        })
            .then((res) => {
                if (res.status >= 400) {
                    throw new Error(`${res.status} - ${res.statusText}`)
                }
                return res.json()
            })
            .then((json) => {
                console.log(json);
                window.alert(`Username updated to ${json.username}`)
            }).catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className="page">
            <Navbar />
            <ul>
                <li>
                    <input type='text' value={username} onChange={e => setUsername(e.target.value)} />
                    <button onClick={onUpdateUser}>Update Username</button>
                </li>
                <li>
                    <a href="http://localhost:9000/logout">Sign out</a>
                </li>
            </ul>
        </div>
    )
}
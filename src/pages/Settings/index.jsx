import React, { useState } from 'react';
import { API_URL } from '../../utils';
import { DEFAULT_POST_CONFIG, DEFAULT_FETCH_CONFIG } from '../../api/middlewareConfig';
import './style.css';

export function Settings({ }) {
    const [username, setUsername] = useState('');

    const onUpdateUser = () => {
        fetch(`${API_URL}/updateUsername`, {
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
            <ul>
                <li>
                    <input type='text' value={username} onChange={e => setUsername(e.target.value)} />
                    <button onClick={onUpdateUser}>Update Username</button>
                </li>
                <li>
                    <a href={`${API_URL}/logout`}>Sign out</a>
                </li>
            </ul>
        </div>
    )
}
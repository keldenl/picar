import React from 'react';
import { BiCheck, BiTrash } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { DEFAULT_FETCH_CONFIG, DEFAULT_POST_CONFIG } from '../../api/middlewareConfig';

import './style.css';

export function Request({ requestData, isSent }) {
    const { dateRequested, entityId, userProfile } = requestData;
    const { username, displayPicture } = userProfile;

    const handleAcceptRequest = (requestId) => {
        fetch('http://localhost:9000/requests/accept', {
            ...DEFAULT_POST_CONFIG,
            ...DEFAULT_FETCH_CONFIG,
            body: JSON.stringify({ requestId })
        })
            .then((res) => {
                if (res.status >= 400) {
                    throw new Error(`${res.status} - ${res.statusText}`)
                }
                return res.json()
            })
            .then((json) => {
                console.log(json);
                window.alert(`You are now friends with ${json.userId}`)
            }).catch((err) => {
                console.log(err);
            });
    }

    const handleDeleteRequest = (requestId) => {
        fetch('http://localhost:9000/requests/delete', {
            ...DEFAULT_POST_CONFIG,
            ...DEFAULT_FETCH_CONFIG,
            body: JSON.stringify({ requestId })
        })
            .then((res) => {
                if (res.status >= 400) {
                    throw new Error(`${res.status} - ${res.statusText}`)
                }
                return res.json()
            })
            .then((json) => {
                console.log(json);
                window.alert(`Deleted request`)
            }).catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className='request'>
            <Link to={`/profile/${username}`}>
                <div className='request-info'>
                    <img src={displayPicture} />
                    <div>
                        <p className='request-title'>{isSent ? `Pending request to ${username}` : `New request from ${username}`}</p>
                        <p className='request-date'>{new Date(dateRequested).toLocaleTimeString()}</p>
                    </div>
                </div>
            </Link>
            <div className='request-actions'>
                {!isSent ?
                    <button className='request-accept' onClick={() => handleAcceptRequest(entityId)}>
                        <BiCheck size="1.5em" />
                    </button>
                    : undefined
                }
                <button className='request-delete' onClick={() => handleDeleteRequest(entityId)}>
                    <BiTrash size="1.25em" />
                </button>
            </div>
        </div>

    )
}
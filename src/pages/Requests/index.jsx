import React, { useEffect, useState } from 'react';
import { DEFAULT_FETCH_CONFIG, DEFAULT_POST_CONFIG } from '../../api/middlewareConfig';
import './style.css';

export function Requests({ }) {
    const [sentRequests, setSentRequests] = useState()
    const [receivedRequests, setReceivedRequests] = useState()

    const [isSentLoading, setSentIsLoading] = useState(true);
    const [isReceivedLoading, setReceivedIsLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:9000/requests/sent`, {
            method: 'GET',
            ...DEFAULT_FETCH_CONFIG
        })
            .then((res) => {
                if (res.status >= 400) {
                    throw new Error(`${res.status} - ${res.statusText}`)
                }
                return res.json()
            })
            .then((json) => {
                console.log(json);
                setSentRequests(json);
                setSentIsLoading(false);
            }).catch((err) => {
                console.error(err);
            });


        fetch(`http://localhost:9000/requests/received`, {
            method: 'GET',
            ...DEFAULT_FETCH_CONFIG
        })
            .then((res) => {
                if (res.status >= 400) {
                    throw new Error(`${res.status} - ${res.statusText}`)
                }
                return res.json()
            })
            .then((json) => {
                console.log(json);
                setReceivedRequests(json);
                setReceivedIsLoading(false);
            }).catch((err) => {
                console.error(err);
            });
    }, []);

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
        <div className="page">
            <h1>Friend Requests</h1>
            <h3>Received</h3>
            {!isReceivedLoading ?
                receivedRequests.map(request => {
                    const { dateRequested, userFromId, entityId } = request;
                    return (
                        <div key={entityId}>
                            <p>New request from {userFromId}</p>
                            <p>{new Date(dateRequested).toLocaleTimeString()}</p>
                            <button onClick={() => handleAcceptRequest(entityId)}>Accept</button>
                            <button onClick={() => handleDeleteRequest(entityId)}>Delete</button>
                        </div>
                    )
                })
                :
                <p>Loading send requests...</p>
            }
            <h3>Sent</h3>
            {!isSentLoading ?
                sentRequests.map(request => {
                    const { dateRequested, userToId, entityId } = request;
                    return (
                        <div key={entityId}>
                            <p>Pending {userToId}'s response</p>
                            <p>{new Date(dateRequested).toLocaleTimeString()}</p>
                            <button onClick={() => handleDeleteRequest(entityId)}>Cancel</button>
                        </div>
                    )
                })
                :
                <p>Loading send requests...</p>
            }
        </div >
    )
}
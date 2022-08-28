import React, { useEffect, useState } from 'react';
import { BiCheck, BiTrash } from 'react-icons/bi';
import { DEFAULT_FETCH_CONFIG, DEFAULT_POST_CONFIG } from '../../api/middlewareConfig';
import { Request } from '../../components/Request';
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
            <div className="page-container">
                <h1>Friend Requests</h1>
                <h3>Received</h3>
                <div className='requests-container'>
                    {!isReceivedLoading ?
                        receivedRequests.length > 0 ?
                            receivedRequests.map(requestData => <Request key={requestData.entityId} requestData={requestData} />)
                            : 'No received requests'

                        :
                        <p>Loading received requests...</p>
                    }
                </div>
                <h3>Sent</h3>
                <div className='requests-container'>
                    {!isSentLoading ?
                        sentRequests.length > 0 ?
                            sentRequests.map(requestData => <Request key={requestData.entityId} requestData={requestData} isSent />)
                            : 'No sent requests'
                        :
                        <p>Loading sent requests...</p>
                    }
                </div>
            </div>
        </div>
    )
}
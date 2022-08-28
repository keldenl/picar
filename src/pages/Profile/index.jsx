import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DEFAULT_FETCH_CONFIG, DEFAULT_POST_CONFIG } from '../../api/middlewareConfig';
import './style.css';

export function Profile({ }) {
    const { username } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [isSendingRequest, setIsSendingRequest] = useState(false);
    const [posts, setPosts] = useState()

    useEffect(() => {
        fetch(`http://localhost:9000/posts/${username}`, {
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
                // console.log(json);
                setIsLoading(false);
                setPosts(json);
            }).catch((err) => {
                console.error(err);
            });
    }, []);

    const handleFriendRequest = () => {
        setIsSendingRequest(true);
        fetch('http://localhost:9000/sendRequest', {
            ...DEFAULT_POST_CONFIG,
            ...DEFAULT_FETCH_CONFIG,
            body: JSON.stringify({ reqUsername: username })
        })
            .then((res) => {
                if (res.status >= 400) {
                    throw new Error(`${res.status} - ${res.statusText}`)
                }
                return res.json()
            })
            .then((json) => {
                console.log(json);
                setIsSendingRequest(false);
                window.alert(`Request is sent to ${json.username}`)
            }).catch((err) => {
                console.log(err);
            });
    }


    return (
        <div className="page">
            <h1>{username}</h1>
            <button onClick={handleFriendRequest} disabled={isSendingRequest}>Add friend</button>
            <p>
                Bio for {username}
            </p>
            {!isLoading ?
                posts.map(post => {
                    const { data, datePosted, description, entityId, likers, userId } = post;
                    return (
                        <div key={entityId}>
                            <img style={{ maxWidth: 300 }} src={data} />
                            <p>{new Date(datePosted).toLocaleTimeString()}</p>
                            <p>{description}</p>
                        </div>
                    )
                })
                :
                <p>Loading...</p>
            }
        </div >
    )
}
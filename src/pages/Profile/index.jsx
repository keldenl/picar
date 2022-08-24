import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DEFAULT_FETCH_CONFIG } from '../../api/middlewareConfig';
import { Navbar } from '../../components/Navbar';
import './style.css';

export function Profile({ }) {
    const { username } = useParams();
    const [isLoading, setIsLoading] = useState(true);
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
                console.log(json);
                setIsLoading(false);
                setPosts(json);
            }).catch((err) => {
                console.error(err);
            });
    }, []);

    return (
        <div className="page">
            <Navbar />
            <h1>{username}</h1>
            <p>
                Bio for {username}
            </p>
            {!isLoading ?
                posts.map(post => {
                    const { data, datePosted, description, entityId, likers, userId } = post;
                    console.log({ data, datePosted, description, entityId, likers, userId })
                    return (
                        <div>
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
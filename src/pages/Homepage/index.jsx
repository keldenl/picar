import React, { useEffect, useState } from 'react';

import { DEFAULT_FETCH_CONFIG } from '../../api/middlewareConfig';
import { Post } from '../../components/Post';
import { Uploader } from '../../components/Uploader';
import { API_URL } from '../../utils';

import './style.css';

export function Homepage({ }) {
    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        console.log('ENV: ', process.env);
        console.log('node env: ', process.env.NODE_ENV)
        console.log('url', API_URL)
        fetch(`${API_URL}/feed`, {
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
                setPosts(json);
                setIsLoading(false);
            }).catch((err) => {
                console.error(err);
            });
    }, []);

    return (
        <div className="page">
            <div className="page-container">
                <div className="posts-container">
                    {!isLoading ?
                        posts.map(postData => <Post key={postData.entityId} postData={postData} />)
                        :
                        <p>Loading...</p>
                    }
                </div>
            </div>
        </div>
    )
}
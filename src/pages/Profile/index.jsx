import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BiUserPlus } from "react-icons/bi";

import { DEFAULT_FETCH_CONFIG, DEFAULT_POST_CONFIG } from '../../api/middlewareConfig';
import { Uploader } from '../../components/Uploader';
import './style.css';

export function Profile({ }) {
    const { username } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [isSendingRequest, setIsSendingRequest] = useState(false);
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState()

    useEffect(() => {
        fetch(`http://localhost:9000/users/${username}`, {
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
                const { username, friendIds, userProfile } = json;
                const { displayPicture } = userProfile;
                setUser({ username, friendIds, displayPicture });
            }).catch((err) => {
                console.error(err);
            });
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
            <div className="profile-container">

                <div className='profile-banner'>
                    <div className="profile-banner-info">
                        <div>
                            <img className='main-profile-display-picture' src={user.displayPicture} />
                            <Uploader
                                title='Update Profile Picture'
                                actionTitle='Update'
                                apiPath='updateDisplayPicture'
                                className='display-picture-uploader'
                                hasDescription={false}
                                iconOnly
                            />
                        </div>
                        <div className='main-profile-name'>
                            <h1>{username}</h1>
                            <p>{user.friendIds != null ? user.friendIds.length : '-'} Friends</p>
                        </div>
                    </div>
                    <button className="add-friend-btn" onClick={handleFriendRequest} disabled={isSendingRequest}>
                        <BiUserPlus size="3em" />
                    </button>
                </div>
                {/* <p>
                Bio for {username}
            </p> */}
                <div className="posts-container">
                    {!isLoading ?
                        posts.map(post => {
                            const { data, datePosted, description, entityId, likers, userProfile } = post;
                            const { username, displayPicture } = userProfile;
                            return (
                                <div className='post' key={entityId}>
                                    <Link to={`/profile/${username}`}>
                                        <img className='image' src={data} alt={description} />
                                    </Link>
                                    <div className='post-info'>
                                        <Link to={`/profile/${username}`}>
                                            <div className='post-profile'>
                                                <img className='display-picture' src={displayPicture} alt={`${username}'s profile pic`} />
                                                <p className='username'>{username}</p>
                                            </div>
                                        </Link>
                                        <p className='date'>{new Date(datePosted).toLocaleTimeString()}</p>
                                    </div>
                                    {/* <p className='description'>{description}</p> */}
                                </div>
                            )
                        })
                        :
                        <p>Loading...</p>
                    }
                </div>
            </div>
        </div >
    )
}
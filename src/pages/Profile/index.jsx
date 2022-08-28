import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BiEdit, BiUserPlus } from "react-icons/bi";

import { DEFAULT_FETCH_CONFIG, DEFAULT_POST_CONFIG } from '../../api/middlewareConfig';
import { Uploader } from '../../components/Uploader';
import './style.css';
import { Post } from '../../components/Post';

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
            <div className="page-container">
                <div className='profile-banner'>
                    <div className="profile-banner-info">
                        <div>
                            <img className='main-profile-display-picture' src={user.displayPicture} />
                            <Uploader
                                title='Update Profile Picture'
                                actionTitle='Update'
                                apiPath='updateDisplayPicture'
                                className='display-picture-uploader'
                                icon={<BiEdit size="1.5em" />}
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
                        <BiUserPlus size="2.5em" />
                    </button>
                </div>
                {/* <p>
                Bio for {username}
            </p> */}
                <div className="posts-container">
                    {!isLoading ?
                        posts.map(postData => <Post key={postData.entityId} postData={postData} />)
                        :
                        <p>Loading...</p>
                    }
                </div>
            </div>
        </div >
    )
}
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BiEdit, BiUserPlus, BiX } from "react-icons/bi";

import { DEFAULT_FETCH_CONFIG, DEFAULT_POST_CONFIG } from '../../api/middlewareConfig';
import { Uploader } from '../../components/Uploader';
import './style.css';
import { Post } from '../../components/Post';

export function Profile({ }) {
    const { username } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [isSendingRequest, setIsSendingRequest] = useState(false);
    const [isFetchingFriends, setIsFetchingFriends] = useState(false);

    const [user, setUser] = useState({});

    const [showFriendList, setShowFriendList] = useState(false);
    const [friendList, setFriendList] = useState([]);

    const [posts, setPosts] = useState();

    useEffect(() => {
        setIsLoading(true);
        setUser({});
        setPosts([]);

        const fetchUserData = async () => {
            return await fetch(`http://localhost:9000/users/${username}`, {
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
                    const { entityId, username, friendIds, userProfile } = json;
                    const { displayPicture } = userProfile;
                    setUser({ entityId, username, friendIds, displayPicture });
                }).catch((err) => {
                    console.error(err);
                });
        }
        const fetchUserPosts = async () => {
            return await fetch(`http://localhost:9000/posts/${username}`, {
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
        }

        fetchUserData();
        fetchUserPosts();
    }, [username]);

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

    const handleShowFriendList = () => {
        setShowFriendList(true);
        setIsFetchingFriends(true);
        fetch(`http://localhost:9000/users/friends/${user.entityId}`, {
            ...DEFAULT_FETCH_CONFIG,
        })
            .then((res) => {
                if (res.status >= 400) {
                    throw new Error(`${res.status} - ${res.statusText}`)
                }
                return res.json()
            })
            .then((json) => {
                console.log(json);
                setFriendList(json);
                setIsFetchingFriends(false);
            }).catch((err) => {
                console.log(err);
            });
    }

    const handleFriendListBlur = () => setShowFriendList(false);


    return (
        <div className="page">
            <div className="page-container">
                {showFriendList ?
                    <div>
                        <div className="modal">
                            <h2 className="modal-title">{username}'s Friends</h2>
                            <BiX size="1.75em" className="cancel-button" onClick={handleFriendListBlur} />
                            <hr className="rainbow" />
                            {
                                !isFetchingFriends ?
                                    friendList.map(friend => {
                                        const { displayPicture, username, entityId } = friend.userProfile;
                                        return (
                                            <Link key={entityId} onClick={handleFriendListBlur} to={`/profile/${username}`} >
                                                <div className='post-profile'>
                                                    <img className='display-picture' src={displayPicture} />
                                                    <p className='username'>{username}</p>
                                                </div>
                                            </Link>
                                        )
                                    })
                                    : 'Loading friends...'
                            }
                        </div>
                        <div className='overlay' onClick={handleFriendListBlur}>
                        </div>
                    </div>
                    :
                    undefined
                }

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
                            <p onClick={handleShowFriendList}>{user.friendIds != null ? user.friendIds.length : '-'} Friends</p>
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
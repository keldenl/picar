import React from 'react';
import { Link } from 'react-router-dom';

import "./style.css";

export function Post({ postData }) {
    const { data, datePosted, description, entityId, likers, userProfile } = postData;
    const { username, displayPicture } = userProfile;
    return (
        <div className='post' key={entityId}>
            <Link to={`/profile/${username}`}>
                <img className='image' src={data} alt={description} />
            </Link>
            <div className='post-info'>
                <Link to={`/profile/${username}`}>
                    <div className='post-profile'>
                        <img className='display-picture' src={displayPicture} />
                        <p className='username'>{username}</p>
                    </div>
                </Link>
                <p className='date'>{new Date(datePosted).toLocaleTimeString()}</p>
            </div>
            {/* <p className='description'>{description}</p> */}
        </div>
    )
}
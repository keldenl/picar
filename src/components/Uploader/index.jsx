import React, { useEffect, useState } from 'react';
import { DEFAULT_POST_CONFIG, DEFAULT_FETCH_CONFIG } from '../../api/middlewareConfig';
import { toBase64 } from '../../utils';

import './style.css';


export function Uploader({ }) {
    const [showUploader, setShowUploader] = useState(false);
    const [uploadImg, setUploadImg] = useState([]);
    const [isUploading, setIsUploading] = useState(false);


    const handleUploadImage = async (e) => {
        if (e.target.files.length === 1) {
            const uploadImg = e.target.files[0];
            const base64Img = await toBase64(uploadImg);

            setUploadImg(base64Img)
        }
    }

    const handlePostImage = () => {
        setIsUploading(true);
        fetch('http://localhost:9000/upload', {
            ...DEFAULT_POST_CONFIG,
            ...DEFAULT_FETCH_CONFIG,
            body: JSON.stringify({ uploadImg })
        })
            .then((res) => {
                if (res.status >= 400) {
                    throw new Error(`${res.status} - ${res.statusText}`)
                }
                return res.json()
            })
            .then((json) => {
                console.log(json);
                setIsUploading(false);
                window.alert(`Image uploaded to ${json.username}`)
            }).catch((err) => {
                console.log(err);
            });
    }

    return (
        <div>
            <button onClick={() => setShowUploader(true)}>Add Post</button>
            {
                showUploader ?
                    <div className="modal">
                        <img alt='preview' style={{ maxWidth: 300 }} src={uploadImg} />
                        <input type='file' onChange={handleUploadImage} />
                        {uploadImg != null ? <button onClick={handlePostImage} disabled={isUploading}>{!isUploading ? 'Post' : 'Uploading'}</button> : undefined}
                        {/* <button>Upload your image here</button> */}
                        {/* <button onClick={() => setShowUploader(false)}>Cancel</button> */}
                    </div>
                    :
                    undefined
            }
        </div>
    )
}
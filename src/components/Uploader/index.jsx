import React, { useEffect, useState } from 'react';
import { DEFAULT_POST_CONFIG, DEFAULT_FETCH_CONFIG } from '../../api/middlewareConfig';
import { toBase64 } from '../../utils';
import { BiImage, BiX, BiImageAdd } from "react-icons/bi";

import './style.css';


export function Uploader({ }) {
    const [showUploader, setShowUploader] = useState(false);
    const [uploadImg, setUploadImg] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [postDescription, setPostDescription] = useState("");


    const handleUploadImage = async (e) => {
        if (e.target.files.length === 1) {
            const uploadImg = e.target.files[0];
            const base64Img = await toBase64(uploadImg);

            setUploadImg(base64Img)
        }
    }

    const handlePostImage = () => {
        console.log(postDescription);
        setIsUploading(true);
        fetch('http://localhost:9000/upload', {
            ...DEFAULT_POST_CONFIG,
            ...DEFAULT_FETCH_CONFIG,
            body: JSON.stringify({ uploadImg, description: postDescription })
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
        exitImageUpload();
    }

    const exitImageUpload = () => {
        setUploadImg([]);
        setShowUploader(false);
    }

    return (
        <div>
            <div className="add-button" onClick={() => setShowUploader(true)}>
                <BiImageAdd size="2em" />
                <span>Upload photo</span>
            </div>
            {
                showUploader ?
                    <div>
                        <div className="modal">
                            <h2 className="modal-title">Post new photo</h2>
                            <BiX size="1.75em" className="cancel-button" onClick={exitImageUpload}/>
                            <hr className="rainbow"></hr>
                            {
                                uploadImg === null || uploadImg.length === 0 ?
                                    <div className="image-selector">
                                        <BiImage size="3em" className="image-icon"/>
                                        <input className="file-input" type='file' onChange={handleUploadImage} />
                                    </div>
                                :
                                    <div className="image-uploader">
                                        <div className="image-info">
                                            <img alt='preview' style={{ maxWidth: 300 }} src={uploadImg} />
                                            <div>
                                                <p>Write a caption</p>
                                                <textarea value={postDescription} onChange={e => setPostDescription(e.target.value)} />
                                            </div>
                                        </div>
                                        <button onClick={handlePostImage} disabled={isUploading}>{!isUploading ? 'Post' : 'Uploading'}</button>
                                    </div>
                            }
                        </div>
                        <div className='overlay' onClick={exitImageUpload}>
                        </div>
                    </div>
                    :
                    undefined
            }
        </div>
    );
}
import React, { useEffect, useState } from 'react';
import { DEFAULT_POST_CONFIG, DEFAULT_FETCH_CONFIG } from '../../api/middlewareConfig';
import { compressImage, toBase64 } from '../../utils';
import { BiImage, BiX, BiImageAdd } from "react-icons/bi";

import './style.css';


export function Uploader({
    title = "Post New Photo",
    actionTitle = "Post",
    apiPath = "upload",
    hasDescription = true,
    iconOnly = false,
    className,
}) {
    const [showUploader, setShowUploader] = useState(false);
    const [uploadImg, setUploadImg] = useState();
    const [isUploading, setIsUploading] = useState(false);
    const [postDescription, setPostDescription] = useState("");


    const handleUploadImage = async (e) => {
        if (e.target.files.length === 1) {
            const uploadImg = e.target.files[0];
            const img = await compressImage(uploadImg);


            // img.onerror = function () {
            //   URL.revokeObjectURL(this.src);
            //   // Handle the failure properly
            //   console.log("Cannot load image");
            // };
            // const reader = new FileReader();
            // reader.readAsDataURL(uploadImg);
            // reader.onload = () => console.log(compressImage(reader.result, 150));


            const base64Img = await toBase64(img);

            setUploadImg(base64Img)
        }
    }

    const handlePostImage = () => {
        setIsUploading(true);
        fetch(`http://localhost:9000/${apiPath}`, {
            ...DEFAULT_POST_CONFIG,
            ...DEFAULT_FETCH_CONFIG,
            body: JSON.stringify({ uploadImg, ...(hasDescription ? { description: postDescription } : {}) })
        })
            .then((res) => {
                if (res.status >= 400) {
                    throw new Error(`${res.status} ${res.statusText} - ${res.json().message}`)
                }
                return res.json()
            })
            .then((json) => {
                console.log(json);
                setIsUploading(false);
                window.alert(`Image uploaded to ${json.username}`)
                exitImageUpload();
            }).catch((err) => {
                console.log(err.message);
            });
    }

    const exitImageUpload = () => {
        setUploadImg();
        setShowUploader(false);
    }

    return (
        <div className={className}>
            <div className="add-button" onClick={() => setShowUploader(true)}>
                <BiImageAdd size="2em" />
                {!iconOnly ? <span>{title}</span> : undefined}
            </div>
            {
                showUploader ?
                    <div>
                        <div className="modal">
                            <h2 className="modal-title">{title}</h2>
                            <BiX size="1.75em" className="cancel-button" onClick={exitImageUpload} />
                            <hr className="rainbow" />
                            {
                                uploadImg == null || uploadImg.length === 0 ?
                                    <div className="image-selector">
                                        <BiImage size="3em" className="image-icon" />
                                        <input className="file-input" type='file' accept="image/*" onChange={handleUploadImage} />
                                    </div>
                                    :
                                    <div className="image-uploader">
                                        <div className="image-info">
                                            <img alt='preview' style={{ maxWidth: 300 }} src={uploadImg} />
                                            {hasDescription ?
                                                <div>
                                                    <p>Write a caption</p>
                                                    <textarea value={postDescription} onChange={e => setPostDescription(e.target.value)} />
                                                </div>
                                                : undefined
                                            }
                                        </div>
                                        <button onClick={handlePostImage} disabled={isUploading}>{!isUploading ? actionTitle : 'Uploading...'}</button>
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
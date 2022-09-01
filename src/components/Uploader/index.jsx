import React, { useState } from 'react';
import { BiImage, BiX, BiCloudUpload, BiEdit } from "react-icons/bi";
import Resizer from "react-image-file-resizer";

import { DEFAULT_POST_CONFIG, DEFAULT_FETCH_CONFIG } from '../../api/middlewareConfig';
import { API_URL } from '../../utils';
import './style.css';

const UploadPictureUploader = {
    title: "Post New Photo",
    actionTitle: "Post",
    apiPath: "upload",
    icon: <BiCloudUpload size="2em" />,
    hasDescription: true,
    iconOnly: false,
    maxLength: 1000,
    quality: 85,

}

const DisplayPictureUploader = {
    title: 'Update Profile Picture',
    actionTitle: 'Update',
    apiPath: 'updateDisplayPicture',
    icon: <BiEdit size="1.5em" />,
    hasDescription: false,
    iconOnly: true,
    maxLength: 150,
    quality: 100,
}

const uploaderTypes = {
    defaultUploadPicture: UploadPictureUploader,
    displayPicture: DisplayPictureUploader,
}

export function Uploader({
    type = 'defaultUploadPicture',
    className,
}) {
    const { title, actionTitle, apiPath, icon, hasDescription, iconOnly, maxLength, quality } = uploaderTypes[type];
    const [showUploader, setShowUploader] = useState(false);
    const [uploadImg, setUploadImg] = useState();
    const [isUploading, setIsUploading] = useState(false);
    const [postDescription, setPostDescription] = useState("");

    const resizeFile = (file) =>
        new Promise((resolve) => {
            Resizer.imageFileResizer(
                file,
                maxLength,
                maxLength,
                "JPEG",
                quality,
                0,
                (uri) => {
                    resolve(uri);
                },
                "base64"
            );
        });


    const handleUploadImage = async (e) => {
        if (e.target.files.length === 1) {
            const uploadImg = e.target.files[0];
            // const img = await compressImage(uploadImg);


            // img.onerror = function () {
            //   URL.revokeObjectURL(this.src);
            //   // Handle the failure properly
            //   console.log("Cannot load image");
            // };
            // const reader = new FileReader();
            // reader.readAsDataURL(uploadImg);
            // reader.onload = () => console.log(compressImage(reader.result, 150));


            const base64Img = await resizeFile(uploadImg);

            setUploadImg(base64Img)
        }
    }

    const handlePostImage = () => {
        setIsUploading(true);
        fetch(`${API_URL}/${apiPath}`, {
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
        setPostDescription('');
        setShowUploader(false);
    }

    return (
        <div className={className}>
            <div className="add-button" onClick={() => setShowUploader(true)}>
                {icon != null ? icon : <BiCloudUpload />}
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
                                        <div className={`image-info ${type === 'displayPicture' ? 'display-picture-preview' : ''}`}>
                                            <img alt='preview' src={uploadImg} />
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
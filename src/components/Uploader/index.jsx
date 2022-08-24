import React, { useEffect, useState } from 'react';
import { toBase64 } from '../../utils';

import './style.css';


export function Uploader({ }) {
    const [showUploader, setShowUploader] = useState(false);
    const [uploadImg, setUploadImg] = useState([])


    const uploadImage = async (e) => {
        if (e.target.files.length === 1) {
            const uploadImg = e.target.files[0];
            const base64Img = await toBase64(uploadImg);

            setUploadImg(base64Img)
        }
    }

    return (
        <div>
            <button onClick={() => setShowUploader(true)}>Add Post</button>
            {
                showUploader ?
                    <div className="modal">
                        <img alt='preview' src={uploadImg} />
                        <input type='file' onChange={uploadImage} />

                        {/* <button>Upload your image here</button> */}
                        {/* <button onClick={() => setShowUploader(false)}>Cancel</button> */}
                    </div>
                    :
                    undefined
            }
        </div>
    )
}
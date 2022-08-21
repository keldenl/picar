import React, {useState} from 'react';
import './style.css';

export function Uploader({ }) {
    const [showUploader, setShowUploader] = useState(false);

    return (
        <div>
            <button onClick={() => setShowUploader(true)}>Add Post</button>
            {
                showUploader ?
                    <div className="modal">
                        <button>Upload your image here</button>
                        <button onClick={() => setShowUploader(false)}>Cancel</button>
                    </div>
                :
                    <></>
            }
        </div>
    )
}
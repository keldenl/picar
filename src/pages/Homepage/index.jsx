import React, { useState } from 'react';
import { Navbar } from '../../components/Navbar';
import { Uploader } from '../../components/Uploader';
import './style.css';

export function Homepage({ }) {
    const [showUploader, setShowUploader] = useState(false);

    return (
        <div>
            <Navbar />
            <p>Homepage</p>
            <button onClick={() => setShowUploader(true)}>Add Post</button>
            {
                showUploader ?
                    <div>
                        <Uploader/>
                        <button onClick={() => setShowUploader(false)}>Cancel</button>
                    </div>
                :
                    <></>
            }
        </div>
    )
}
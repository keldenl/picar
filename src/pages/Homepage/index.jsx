import React from 'react';
import { Navbar } from '../../components/Navbar';
import { Uploader } from '../../components/Uploader';
import { ImageContainer } from '../../components/ImageContainer';
import './style.css';

export function Homepage({ }) {

    return (
        <div className="page">
            <Navbar />
            <Uploader />
            <ImageContainer />
        </div>
    )
}
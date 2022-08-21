import React from 'react';
import './style.css';

export function ImageContainer({ }) {


    return (
        <div className="image-container">
            {
                Array.apply(null, Array(30)).map(function () {return <img src='https://source.unsplash.com/random/200x200?sig=1'></img>})
            }
        </div>
    )
}
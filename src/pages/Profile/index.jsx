import React, { useEffect } from 'react';
import { Navbar } from '../../components/Navbar';
import './style.css';

export function Profile({ }) {
    useEffect(() => {
        fetch('http://localhost:9000/profile', {
            method: 'GET',
            credentials: 'include'
        })
            .then((res) => {
                if (res.status >= 400) {
                    throw new Error(`${res.status} - ${res.statusText}`)
                }
                return res.json()
            })
            .then((json) => {
                console.log(json);
            }).catch((err) => {
                console.error(err);
            });
    }, []);

    return (
        <div className="page">
            <Navbar />
            This is your profile
        </div>
    )
}
import React from 'react'
import { useParams } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
    const params = useParams();
    return (
        <section className='content-container'>
            <div className='pnf-wrapper'>
                <p className='page-not-found'>404 - "{params.pageName}" page not found!</p>
            </div>
        </section>
    )
}
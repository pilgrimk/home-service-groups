import React from 'react'
import Logo from "../videos/home-services-video.mp4"
import './Home.css'

export default function Home() {
    const videoSrc = Logo;
    const poster = "/logo_1.png";

    return (
        <div className='video-container'>
            <video src={videoSrc} poster={poster} autoPlay loop muted />
        </div>
    );
}
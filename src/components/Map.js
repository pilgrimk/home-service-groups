import React, { useRef, useEffect, useState } from 'react'
import mapboxgl from '!mapbox-gl' // eslint-disable-line import/no-webpack-loader-syntax
import './Map.css'

export default function Map() {
    mapboxgl.accessToken = `${process.env.REACT_APP_MAPBOX_API}`;

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-112.07);
    const [lat, setLat] = useState(33.45);
    const [zoom, setZoom] = useState(10);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        //console.log("Maps 1st useEffect ran!");
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });
    }, [lng, lat, zoom]);

    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        //console.log("Maps 2nd useEffect ran!");
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
    }, [lng, lat, zoom]);

    return (
        <>
            <div className="sidebar">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <div ref={mapContainer} className="map-container" />
        </>
    );
}
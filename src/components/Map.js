import React, { useRef, useEffect, useState } from 'react'
import mapboxgl from '!mapbox-gl' // eslint-disable-line import/no-webpack-loader-syntax
import './Map.css'

export default function Map(props) {
    mapboxgl.accessToken = `${process.env.REACT_APP_MAPBOX_API}`;

    const default_lng = -112.07;
    const default_lat = 33.34;
    const default_zoom = 10;

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(default_lng);
    const [lat, setLat] = useState(default_lat);
    const [zoom, setZoom] = useState(default_zoom);

    function resetMap(coords, zoom) {
        if (map.current)  {
            map.current.setCenter(coords);
            map.current.setZoom(zoom);
        }
      };

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

    useEffect(() => {
        const calc_lng = props.currentProps.reduce((acc, data) => acc + Math.round(data.longitude), 0) / props.currentProps.length;
        const calc_lat = props.currentProps.reduce((acc, data) => acc + Math.round(data.latitude), 0) / props.currentProps.length;
        //console.log(`lng_total: ${calc_lng}, lat_total: ${calc_lat}`);

        setLng(calc_lng.toFixed(4));
        setLat(calc_lat.toFixed(4));
        setZoom(default_zoom);
        resetMap([calc_lng, calc_lat], default_zoom);
    }, [props.currentProps]);

    return (
        <>
            <div className="sidebar">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <div ref={mapContainer} className="map-container" />
        </>
    );
}

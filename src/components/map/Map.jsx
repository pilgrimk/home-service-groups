import React, { useRef, useEffect, useState } from 'react'
import mapboxgl from '!mapbox-gl' // eslint-disable-line import/no-webpack-loader-syntax
import './Map.css'

const Map = ({ currentProps }) => {
    mapboxgl.accessToken = `${process.env.REACT_APP_MAPBOX_API}`;

    const default_lng = -112.07;
    const default_lat = 33.34;
    const default_zoom = 10;

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(default_lng);
    const [lat, setLat] = useState(default_lat);
    const [zoom, setZoom] = useState(default_zoom);
    const [mapMarkers, setMapMarkers] = useState([]);

    const roundAccurately = (number, decimalPlaces) => {
        return Number(Math.round(number + "e" + decimalPlaces) + "e-" + decimalPlaces);
    }

    function resetMap(coords, zoom) {
        if (map.current) {
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
        let calc_lng = roundAccurately(
            currentProps.reduce((acc, data) => acc + roundAccurately(data.longitude, 4), 0) / currentProps.length, 4);
        let calc_lat = roundAccurately(
            currentProps.reduce((acc, data) => acc + roundAccurately(data.latitude, 4), 0) / currentProps.length, 4);
        //console.log(`calc_lng: ${calc_lng}, calc_lat: ${calc_lat}`);

        setLng(calc_lng.toFixed(4));
        setLat(calc_lat.toFixed(4));
        setZoom(default_zoom);
        resetMap([calc_lng, calc_lat], default_zoom);

        //clear all markers
        mapMarkers.forEach((marker) => marker.remove());
        while (mapMarkers.length > 0) {
            mapMarkers.pop();
        }
        setMapMarkers(mapMarkers);
        //console.log(`number of markers: ${mapMarkers.length}`);  

        //add markers to the map
        currentProps.forEach((data) => {
            var popupText = `${data.streetLine}, $${data.price} `
            var popup = new mapboxgl.Popup()
                .setText(popupText);

            //console.log(`mapped lng: ${data.longitude}, lat: ${data.latitude}`)
            const marker1 = new mapboxgl.Marker()
                .setLngLat([data.longitude, data.latitude])
                .setPopup(popup)
                .addTo(map.current);

            // add marker to array
            mapMarkers.push(marker1);
            setMapMarkers(mapMarkers);
        });
    }, [currentProps, mapMarkers]);

    return (
        <div className="mapbox-container">
            <div className="sidebar">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <div ref={mapContainer} className="map-container" />
        </div>
    );
}

export default Map

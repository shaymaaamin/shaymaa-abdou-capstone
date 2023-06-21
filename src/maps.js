import axios from "axios";

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';


const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const BASE_URL = 'https://maps.googleapis.com/maps/api';

const infoWindows = [];

export const initializeMap = () => {
    const map = new window.google.maps.Map(document.querySelector("#map"), {
        center: { lat: 43.6449339, lng: -79.3948048 },
        zoom: 12,
    });
    return map;
}

export const loadGoogleMapsAPI = () => {
    return new Promise((resolve, reject) => {
        const script = document.querySelector('#googleMapsScript');
        if (!script) {
            const script = document.createElement("script");
            script.id = 'googleMapsScript';
            script.src = `${BASE_URL}/js?key=${API_KEY}`;
            script.onload = () => resolve(initializeMap());
            document.body.appendChild(script);
        } else if (window.google) {
            resolve(initializeMap());
        }
    })
}

export const addMarker = (map, position, title, icon) => {
    const marker = new window.google.maps.Marker({ map, position, title, icon });
    const infoWindow = new window.google.maps.InfoWindow({ content: title });

    infoWindows.push(infoWindow);
    marker.addListener("click", () => {
        infoWindows.forEach((iw) => iw.close());
        infoWindow.open(map, marker);
    });
    return marker;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

export const getDistance = (position1, position2) => {
    const R = 6371;
    const lat1 = position1?.lat;
    const lon1 = position1?.lng;
    const lat2 = position2?.lat;
    const lon2 = position2?.lng;

    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return Math.round(distance * 100) / 100;
}

export const getDistanceAndDuration = (position1, position2) => {
    if (!position1 || !position2) return;

    const origin = `${position1.lat},${position1.lng}`;
    const destination = `${position2.lat},${position2.lng}`;

    const url = `${BASE_URL}/distancematrix/json?units=metric&origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${API_KEY}`;

    return axios.get(url).then(console.log);
}
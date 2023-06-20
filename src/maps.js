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
        const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
        const script = document.querySelector('#googleMapsScript');
        if (!script) {
            const script = document.createElement("script");
            script.id = 'googleMapsScript';
            script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
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
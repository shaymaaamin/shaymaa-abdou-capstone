import { useEffect } from "react";
import "./LiveMap.scss";
import { addMarker } from "../../maps";

export default function LiveMap({ map, assets }) {
  useEffect(() => {
    if (!window.google) return;
    assets.forEach((asset) => {
      addMarker(map, asset.location, asset.name, "assets/images/home_pin.png");
    });
  }, [assets, map]);

  return (
    <div id="map" className="live-map">
      <h2>Live Map</h2>
      <p>Real-time updates of location data</p>
    </div>
  );
};
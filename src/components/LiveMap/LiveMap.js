import { useEffect, useState } from "react";
import { addMarker } from "../../maps";
import { Card } from "semantic-ui-react";

export default function LiveMap({ map, assets, selectedAsset }) {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    if (!window.google) return;
    markers.forEach(marker => marker.setMap(null));

    const newMarkers = [];
    assets.forEach((asset) => {
      const icon = asset?.id === selectedAsset?.id ? "assets/images/home_pin_selected.png" : "assets/images/home_pin.png";
      const marker = addMarker(map, { lat: asset.lat, lng: asset.lng }, asset.name, icon);
      marker.asset = asset;
      newMarkers.push(marker);
    });
    setMarkers(newMarkers);
  }, [assets, map, selectedAsset]);

  return (
    <Card fluid={true} centered={true} raised={true}>
      <div id="map" className="live-map" style={{ height: '480px' }}>
        <h2>Live Map</h2>
        <p>Real-time updates of location data</p>
      </div>
    </Card>
  );
};
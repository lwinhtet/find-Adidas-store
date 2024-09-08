'use client';

import { GoogleMap, Marker } from '@react-google-maps/api';
import { memo, useEffect, useState } from 'react';

const containerStyle = {
  width: '100%',
  height: '300px',
};

const center = {
  lat: 0,
  lng: 0,
};

interface MapProps {
  latitude: number;
  longitude: number;
}

const MapComponent = ({ latitude, longitude }: MapProps) => {
  const [mapCenter, setMapCenter] = useState(center);

  useEffect(() => {
    if (latitude && longitude) {
      setMapCenter({ lat: latitude, lng: longitude });
    }
  }, [latitude, longitude]);
  return (
    <div className="w-full">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={15}
      >
        <Marker position={mapCenter} />
      </GoogleMap>
    </div>
  );
};

// Wrap MapComponent with React.memo
const MemoizedMapComponent = memo(
  MapComponent,
  (prevProps, nextProps) =>
    prevProps.latitude === nextProps.latitude &&
    prevProps.longitude === nextProps.longitude
);

export { MemoizedMapComponent as MapComponent };

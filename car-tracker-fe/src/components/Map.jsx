import React from 'react';
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import '../index.css';

// Fix for Leaflet's default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function Map() {
  const [carData, setCarData] = useState(null);

  useEffect(() => {
    fetch('/random_car_data.json')
      .then((response) => response.json())
      .then((json) => {
        console.log(json);

        setCarData(json);
      });
  }, []);
  console.log(carData);

  return (
    <div className="map-wrapper" style={{ height: '75vh', width: '100%' }}>
      <MapContainer
        center={[40.713, -74.006]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {carData &&
          carData.map((car, index) => (
            <Marker
              key={index}
              position={[car.location.latitude, car.location.longitude]}
            >
              <Popup>
                {car.year} {car.model} - Plate: {car.plate_number}
                <br />
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}

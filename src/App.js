import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './App.css';

function App() {
  const [solarData, setSolarData] = useState();
  const [userLocation, setUserLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  console.log(solarData);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position)
      setUserLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      const getData = async () => {
        const solarData = await fetch(`https://developer.nrel.gov/api/solar/solar_resource/v1.json?api_key=${process.env.REACT_APP_API_KEY}&lat=${position.coords.latitude}&lon=${position.coords.longitude}`)
        const parsedSolarData = await solarData.json()
        setSolarData(parsedSolarData)
      }
      getData()
    }, (error) => {
      console.log(error)
    });

  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <p>latitude:{userLocation ? userLocation.latitude : ""}</p>
        <TextField id="standard-basic" label="Avg. Cost/Panel" variant="standard" type="number" />
        <TextField id="standard-basic" label="Avg. Cost/KWH of electricity in your area" type="number" variant="standard" />
      </header>
      <div className="map-div" style={{width: '200px', height: '100px'}}>
        <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[51.505, -0.09]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}

export default App;
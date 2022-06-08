import { useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import getCenter from 'geolib/es/getCenter';
function MapBox({ searchResults }) {
  const [selectedLocation, setSelectedLocation] = useState({});
  const coordinates = searchResults?.map(({ lat, long }) => ({
    longitude: long,
    latitude: lat,
  }));
  const center = getCenter(coordinates);
  const [viewport, setViewport] = useState({
    latitude: center.latitude,
    longitude: center.longitude,
    width: '100%',
    height: '100%',
    zoom: 11,
  });
  return (
    <Map
      mapStyle='mapbox://styles/kazeemquadri01/cl457dgmm000516p0yaz6mv3t'
      mapboxAccessToken={process.env.mapbox_key}
      {...viewport}
      onMove={(evt) => setViewport(evt.viewState)}
    >
      {searchResults?.map((result) => (
        <div key={result.long}>
          <Marker
            longitude={result.long}
            latitude={result.lat}
            offset={[-20, -10]}
          >
            <p
              onClick={() => setSelectedLocation(result)}
              className='cursor-pointer text-2xl animate-bounce'
            >
              🏚️
            </p>
          </Marker>
          {selectedLocation.long === result.long && (
            <Popup
              onClose={() => setSelectedLocation({})}
              closeOnClick={true}
              longitude={selectedLocation.long}
              latitude={selectedLocation.lat}
            >
              {selectedLocation.title}
            </Popup>
          )}
        </div>
      ))}
    </Map>
  );
}

export default MapBox;

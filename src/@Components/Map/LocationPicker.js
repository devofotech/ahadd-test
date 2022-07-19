import React from 'react';
import GoogleMapReact from 'google-map-react';

// eslint-disable-next-line
const MarkerIcon = 'https://www.google.com.my/maps/vt/icon/name=assets/icons/spotlight/spotlight_pin_v4_outline-1-small.png,assets/icons/spotlight/spotlight_pin_v4-1-small.png,assets/icons/spotlight/spotlight_pin_v4_dot-1-small.png&highlight=c5221f,ea4335,b31412?scale=1';
const Marker = () => (
  <img
    src={MarkerIcon}
    style={{
      marginTop: -39,
      marginLeft: -14,
    }}
  />
);

export default ({
  center = { lat: 3.093783, lng: 101.655155 },
  setMarker = () => null,
  marker = {},
}) => {
  // https://github.com/google-map-react/google-map-react/issues/614
  // code below from above link

  const handleMapLoaded = ({ map }) => {
    map.addListener('click', event => {
      setMarker({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    });
  };

  return (
    <GoogleMapReact
      bootstrapURLKeys={{
        key: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
      }}
      defaultCenter={center}
      center={(marker.lat && marker.lng) && marker}
      defaultZoom={11}
      onGoogleApiLoaded={handleMapLoaded}
    >
      {Object.keys(marker).length > 0 && (
        <Marker {...marker} />
      )}
    </GoogleMapReact>
  );
};

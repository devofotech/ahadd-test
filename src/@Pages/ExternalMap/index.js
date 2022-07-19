import React from 'react';
import 'leaflet/dist/leaflet.css';
// import { HeaderOneView } from '@components/header/Header';
// import shp from 'shpjs';
import Map from './map';

export default () => {
  return (
    <>
      {/* <HeaderOneView
        title="2D Orthophoto"
      /> */}
      <Map />
    </>
  );
};

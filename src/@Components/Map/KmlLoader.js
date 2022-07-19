import React, { useState, useEffect } from 'react';
import ReactLeafletKml from 'react-leaflet-kml';

export default function KML(props) {
  const [kml, set_kml] = useState();
  const url = props.url.includes('.kml') ? props.url : `${props.url}/index.kml`;

  useEffect(() => {
    async function getKML() {
      try {
        const response = await fetch(url);
        const stringKML = await response.text();
        const parser = new DOMParser();
        set_kml(parser.parseFromString(stringKML, 'text/xml'));
      } catch (e) {
        console.log('error fetching kml', e);
      }
    }
    getKML();
  }, [url]);

  if (!kml) return null;

  return <ReactLeafletKml kml={kml} />;
}

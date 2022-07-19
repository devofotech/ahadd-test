/* eslint-disable max-len */
import * as L from 'leaflet';

const mapbox_style_id = 'ckty1pmkq0lbh18pd2e64iusf';
const mapbox_access_token = 'pk.eyJ1IjoiZGV2b2ZvdGVjaCIsImEiOiJja3R4emdxcXQyeXJlMnBvM3FhMjlrdG9vIn0.3V_xPbc72a4v92QNLxu3NA';

export default function Hook() {
  const basemaps = {
    Mapbox: L.tileLayer(
    `https://api.mapbox.com/styles/v1/devofotech/${mapbox_style_id}/tiles/256/{z}/{x}/{y}@2x?access_token=${mapbox_access_token}`,
    {
      maxZoom: 13,
      attribution: 'Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>',
      checked: true,
      isBaseLayer: true,
      name: 'Mapbox',
    },
    ),
    Bing: L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      isBaseLayer: true,
      name: 'Bing',
    }),

    Google: L.tileLayer('https://{s}.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}', {
      maxZoom: 23,
      subdomains: ['mt1', 'mt2', 'mt3'],
      isBaseLayer: true,
      name: 'Google',
    }),
    'Google Street': L.tileLayer('http://{s}.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}', {
      maxZoom: 23,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      isBaseLayer: true,
      name: 'Google Street',
    }),
    'Google Hybrid': L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&hl=en&x={x}&y={y}&z={z}', {
      maxZoom: 23,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      isBaseLayer: true,
      name: 'Google Hybrid',
    }),
    'Google Satellite': L.tileLayer('http://{s}.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}', {
      maxZoom: 23,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      isBaseLayer: true,
      name: 'Google Satellite',
    }),
    'Google Terrain': L.tileLayer('http://{s}.google.com/vt/lyrs=p&hl=en&x={x}&y={y}&z={z}', {
      maxZoom: 23,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      isBaseLayer: true,
      name: 'Google Terrain',
    }),
  };

  return basemaps;
}

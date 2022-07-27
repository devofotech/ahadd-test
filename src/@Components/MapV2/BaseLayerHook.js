/* eslint-disable max-len */
// reference: https://github.com/Azure-Samples/azure-maps-leaflet
import * as L from 'leaflet';

const mapbox_style_id = 'ckty1pmkq0lbh18pd2e64iusf';
const mapbox_access_token = 'pk.eyJ1IjoiZGV2b2ZvdGVjaCIsImEiOiJja3R4emdxcXQyeXJlMnBvM3FhMjlrdG9vIn0.3V_xPbc72a4v92QNLxu3NA';
const azure_url = 'https://atlas.microsoft.com/map/tile?subscription-key={subscriptionKey}&api-version=2.0&tilesetId={tilesetId}&zoom={z}&x={x}&y={y}&tileSize=256&language={language}&view={view}';
const azure_map_data = {
  attribution: `© ${new Date().getFullYear()} TomTom, Microsoft`,
  subscriptionKey: process.env.REACT_APP_AZURE_MAP_API_KEY, // Add your Azure Maps key to the map SDK. Get an Azure Maps key at https://azure.com/maps. NOTE: The primary key should be used as the key.
  language: 'en-US', // The language of labels. Supported languages: https://docs.microsoft.com/en-us/azure/azure-maps/supported-languages
  view: 'Auto', // The regional view of the map. Supported views: https://aka.ms/AzureMapsLocalizationViews
};

export default function Hook() {
  const basemaps = {
    // Mapbox: L.tileLayer(
    // `https://api.mapbox.com/styles/v1/devofotech/${mapbox_style_id}/tiles/256/{z}/{x}/{y}@2x?access_token=${mapbox_access_token}`,
    // {
    //   maxZoom: 13,
    //   attribution: 'Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>',
    //   checked: true,
    //   isBaseLayer: true,
    //   name: 'Mapbox',
    // },
    // ),
    // Bing: L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
    //   attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    //   isBaseLayer: true,
    //   name: 'Bing',
    // }),

    // Google: L.tileLayer('https://{s}.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}', {
    //   maxZoom: 23,
    //   subdomains: ['mt1', 'mt2', 'mt3'],
    //   isBaseLayer: true,
    //   name: 'Google',
    // }),
    // 'Google Street': L.tileLayer('http://{s}.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}', {
    //   maxZoom: 23,
    //   subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    //   isBaseLayer: true,
    //   name: 'Google Street',
    // }),
    // 'Google Hybrid': L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&hl=en&x={x}&y={y}&z={z}', {
    //   maxZoom: 23,
    //   subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    //   isBaseLayer: true,
    //   name: 'Google Hybrid',
    // }),
    // 'Google Satellite': L.tileLayer('http://{s}.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}', {
    //   maxZoom: 23,
    //   subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    //   isBaseLayer: true,
    //   name: 'Google Satellite',
    // }),
    // 'Google Terrain': L.tileLayer('http://{s}.google.com/vt/lyrs=p&hl=en&x={x}&y={y}&z={z}', {
    //   maxZoom: 23,
    //   subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    //   isBaseLayer: true,
    //   name: 'Google Terrain',
    // }),
    'Azure Base Road': L.tileLayer(azure_url, { ...azure_map_data, tilesetId: 'microsoft.base.road' }),
    'Azure Base Hybrid Road': L.tileLayer(azure_url, { ...azure_map_data, tilesetId: 'microsoft.base.hybrid.road' }),
    'Azure Base Darkgrey': L.tileLayer(azure_url, { ...azure_map_data, tilesetId: 'microsoft.base.darkgrey' }),
    'Azure Imagery': L.tileLayer(azure_url, { ...azure_map_data, tilesetId: 'microsoft.imagery' }),
    'Weather - Infrared': L.tileLayer(azure_url, { ...azure_map_data, tilesetId: 'microsoft.weather.infrared.main' }),
    'Weather - Radar': L.tileLayer(azure_url, { ...azure_map_data, tilesetId: 'microsoft.weather.radar.main' }),
  };

  return basemaps;
}

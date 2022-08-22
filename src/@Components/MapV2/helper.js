import * as L from 'leaflet';
import { shallowEqual } from '@Helpers/equality';

export const getKML = async (url) => {
  const response = await fetch(url);
  const stringKML = await response.text();
  const parser = new DOMParser();
  return parser.parseFromString(stringKML, 'text/xml');
};

export const getGEOJSON = async (url) => {
  const response = await fetch(url);
  const stringGEOJSON = await response.json();
  return stringGEOJSON;
};

export const dataToTile = (lyr) => L.tileLayer(`${lyr.path }/{z}/{x}/{y}.png`, {
  // styleId: 22677,
  idx: lyr.id,
  layer_type: 'layer',
  maxZoom: 23,
});

export const genLyr = async (lyr) => {
  switch (lyr.type) {
    case 'kml':
      return new L.KML(await getKML(lyr.path), 'text/xml');
    case 'geojson':
      return new L.GeoJSON(await getGEOJSON(lyr.path));
    default:
      return L.tileLayer(`${lyr.path }/{z}/{x}/{y}.png`, { idx: lyr.id, layer_type: 'layer', maxZoom: 23 });
  }
};

export const centeringMap = (map, targetCenter) => {
  const currentCenter = {
    ...map.getCenter(),
    zoom: map.getZoom(),
  };
  // console.log('vv postion before fly', currentCenter);
  // console.log('vv fly to', currentCenter);
  if (!shallowEqual(currentCenter, targetCenter)) {
    // Todo:
    // 1. if position from target not far reduce duration animation
    map.flyTo(
      [targetCenter.lat, targetCenter.lng],
      targetCenter.zoom,
      { animate: true, duration: 4 },
    );
  }
};

export const setBaseLayerActive = (lyr_active, map) => {
  if (!lyr_active) return;
  const all_base = Object.values(map?._layers).filter(alllyr => alllyr.options.isBaseLayer);
  if (all_base.length) all_base.forEach(lyr => { map.removeLayer(lyr); });
  map.addLayer(lyr_active);
};

export const setGroupLayerOverlayActive = (defaultActiveLyrGroup, map) => {
  if (defaultActiveLyrGroup.length) defaultActiveLyrGroup.forEach(activeLyrGrop => activeLyrGrop.addTo(map));
};

export const clearingMapLayers = async (map) => {
  await map.eachLayer(async (layer) => {
    const removeoptions = ['layer', 'polyline', 'Polyline', 'polygon', 'Polygon', 'LineString', 'rectangle'];
    
    if (layer.defaultOptions && removeoptions.includes(layer.defaultOptions.layer_type)) {
      // console.log('MAPDEBUG: existing layers removed', layer);
      await map.removeLayer(layer);
    }
    if (removeoptions.includes(layer.options.layer_type)) {
      // console.log('MAPDEBUG: existing layers ortho removed', layer);
      await map.removeLayer(layer);
    }
    if (layer._kml) {
      // console.log('MAPDEBUG: existing layers kml removed', layer);
      await map.removeLayer(layer);
    }
  });
};

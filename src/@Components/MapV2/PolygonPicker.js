/* eslint-disable max-len */
/* eslint-disable max-nested-callbacks */
/* eslint-disable no-nested-ternary */
/* eslint-disable max-lines */
/* eslint-disable no-await-in-loop */
/* eslint-disable max-depth */
/* eslint-disable complexity */
import React, {
  useEffect, useState, useRef,
} from 'react';
import { Map } from 'react-leaflet';
import LeafletMarker from '@Components/MapMarker/LeafletMarker';
import * as L from 'leaflet';
import './map_pickerversion.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet-groupedlayercontrol/dist/leaflet.groupedlayercontrol.min.js';
import 'leaflet-draw';
import './leaflet.draw.css';
import useBaseLayerHook from './BaseLayerHook';
import { setBaseLayerActive, clearingMapLayers } from './helper';
import { drawOptions, customColor } from './drawer';

export default ({
  setPicker = () => null,
  picker = null,
  pickerFor = 'marker',
  mapStyle = {
    height: '100%', widht: '100%',
  },
  isLeafletDraw = false,
}) => {
  const mapRef = useRef();
  const markerStyle = LeafletMarker();
  const basemapHook = useBaseLayerHook(); // load all base map
  const [activeBase, set_activeBase] = useState(null);
  const [center, set_center] = useState([1.496798, 103.704124]);
  const [zoom, set_zoom] = useState(10);
  const [activeControl, setActiveControl] = useState(null);
  const [polygonDeleted, setPolygonDeleted] = useState(false);
  const [activeEditControl, setActiveEditControl] = useState(null);
  //   const [zoomControl, setZoomControl] = useState(null);
  const [initialReady, set_initialReady] = useState(false);
  const createDragableMarker = async (latlng) => {
    await clearingMapLayers(mapRef.current.leafletElement, ['marker']);
    setPicker(latlng);
    set_center([latlng.lat, latlng.lng]);
    const marker = new L.marker(latlng, {
      draggable: 'true', icon: markerStyle.GreenIcon, layer_type: 'marker', riseOnHover: true,
    });
    marker.on('dragend', ({ target }) => {
      const { lat, lng } = target.getLatLng();
      const newLatLng = new L.LatLng(lat, lng);
      target.setLatLng(newLatLng, { draggable: 'true' });
      mapRef.current?.leafletElement.panTo(newLatLng);
      setPicker({ lat, lng });
    });
    mapRef.current?.leafletElement.addLayer(marker);
  };
  useEffect(() => {
    // console.log('MAPDEBUG: initial', activeControl);
    if (activeControl) mapRef.current.leafletElement.removeControl(activeControl);
    const zoomctrl = L.control.zoom({ position: 'topleft' });
    mapRef.current.leafletElement.addControl(zoomctrl);
    // setZoomControl(zoomctrl);
    const control = new L.Control.GroupedLayers(basemapHook);
    // mapRef.current.leafletElement.addControl(control);
    setBaseLayerActive(basemapHook['Google Street'], mapRef.current.leafletElement); // set active basemap , control will keep track and smart enough
    setActiveControl(control);
    set_initialReady(true);
  }, []);
  useEffect(async () => {
    if (!initialReady) return;
    if (isLeafletDraw) {
      if (polygonDeleted) {
        await clearingMapLayers(mapRef.current.leafletElement, ['polygon', 'Polygon']);
        setPolygonDeleted(false);
        return;
      }
      const editLayer = new L.FeatureGroup();
      mapRef.current?.leafletElement.addLayer(editLayer);
      const drawAtt = {};
      if (pickerFor === 'polygon') {
        if (picker) {
          const geojsonData = picker;
          // console.log('MAPDEBUG: geojsonData', geojsonData)
          const polyLyrStyle = {
            color: customColor.primary,
          };
          const polyLyr = new L.GeoJSON(geojsonData, { layer_type: geojsonData.geometry.type, style: polyLyrStyle });
          // polyLyr.options.color = customColor.primary;
          console.log('MAPDEBUG: Existing Drawing...', polyLyr._layers);
          polyLyr.getLayers()[0].addTo(editLayer); // sbb dlm satu poly tu not necessaryly single layer, in our case it should only be single
          const { lat, lng } = polyLyr.getLayers()[0].getBounds().getCenter()
          set_center({ lat, lng });
        } else {
          drawAtt.withPolygon = true;
        }
      }
      if (pickerFor === 'marker') drawAtt.withMarker = true;
      const drawControl = new L.Control.Draw(drawOptions({
        editLayer,
        ...drawAtt,
      }));
      if (activeEditControl) mapRef.current.leafletElement.removeControl(activeEditControl);
      mapRef.current?.leafletElement.addControl(drawControl);
      setActiveEditControl(drawControl);
      mapRef.current?.leafletElement.on('draw:edited', (e) => {
        if (pickerFor === 'polygon') {
          const modifiedIdx = [];
          e.layers.eachLayer((lyr) => {
            console.log('MAPDEBUG: Edit Drawing...', lyr, lyr.toGeoJSON());
            modifiedIdx.push(lyr.toGeoJSON());
          });
          setPicker(modifiedIdx[0]);
        }
      });
      mapRef.current?.leafletElement.on('draw:created', (e) => {
        if (pickerFor === 'polygon') {
          // console.log('MAPDEBUG: Create Drawing...', e.layers, e.layer);
          const polygondraw = e.layer.toGeoJSON();
          setPicker(polygondraw);
        }
        editLayer.addLayer(e.layer);
      });
      mapRef.current?.leafletElement.on('draw:deleted', (e) => {
        editLayer.removeLayer(e.target);
        setPolygonDeleted(true);
        setPicker(null);
      });
    }
  }, [initialReady, polygonDeleted]);
  useEffect(() => {
    if (!initialReady) return;
    if (!picker) return;
    if (isLeafletDraw) {
      console.log('latlng has existing draw, handle by leaflet draw', picker);
    } else {
      createDragableMarker(picker);
    }
  }, [initialReady, picker]);
  return (
    <Map
      ref={mapRef}
      center={center}
      zoomControl={false}
      zoom={zoom}
      maxZoom={23}
      scrollWheelZoom
      tap={false}
      //   bounds={bounds}
      style={{ ...mapStyle }}
      onbaselayerchange={(e) => { set_activeBase(e.layer.options.name); }}
      onclick={(e) => !isLeafletDraw && createDragableMarker(e.latlng)}
    />
  );
};

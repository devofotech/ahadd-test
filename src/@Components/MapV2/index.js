/* eslint-disable max-len */
/* eslint-disable max-nested-callbacks */
/* eslint-disable no-nested-ternary */
/* eslint-disable max-lines */
/* eslint-disable no-await-in-loop */
/* eslint-disable max-depth */
/* eslint-disable complexity */
import React, {
  useEffect, useState, useRef, useMemo,
} from 'react';
import { Map } from 'react-leaflet';
import * as L from 'leaflet';
import _ from 'lodash';
import LeafletMarker from '@Components/MapMarker/LeafletMarker';
import OrthophotoCard from '@Components/Map/Orthophoto';
import './map.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet-groupedlayercontrol/dist/leaflet.groupedlayercontrol.min.js';
import 'leaflet-draw';
import './leaflet.draw.css';
import uuid from 'react-uuid';
import moment from 'moment';
import useBaseLayerHook from './BaseLayerHook';
import {
  genLyr, centeringMap, setBaseLayerActive, setGroupLayerOverlayActive, clearingMapLayers,
} from './helper';
import { drawOptions, customColor } from './drawer';

export default function Maps({
  filtered_projects = [],
  selected_project = 0, set_selected_project = () => null,
  showSidebar, setShowSidebar = () => null,
  project,
  asset_files,
  mapStyle = {
    position: 'fixed', top: 0, bottom: 0, right: 0, left: 0,
  },
  iconType = 'GreenIcon',
  isDrawAnnotation = false,
  isInspection = false,
  annotationProps,
}) {
  const mapRef = useRef();
  const markerStyle = LeafletMarker();
  const basemapHook = useBaseLayerHook(); // load all base map
  const [activeBase, set_activeBase] = useState(null);
  const [center, set_center] = useState([1.496798, 103.704124]);
  const [zoom, set_zoom] = useState(10);
  const [activeControl, setActiveControl] = useState(null);
  const [activeEditControl, setActiveEditControl] = useState(null);
  const [zoomControl, setZoomControl] = useState(null);
  const [existingLayerIndex, set_existingLayerIndex] = useState([]);
  const [timeSeriesIndex, set_timeSeriesIndex] = useState(null);
  const [dialogTimeSeries, set_dialogTimeSeries] = useState(false);
  const [timeSeriesLength, set_timeSeriesLength] = useState({});
  const [dateTimeline, set_dateTimeline] = useState({});
  const [activeTileSeries, set_activeTileSeries] = useState(null);
  const [initialReady, set_initialReady] = useState(false);
  const [selectedMarker, set_selectedMarker] = useState(null);
  useEffect(() => {
    // console.log('MAPDEBUG: initial', activeControl);
    if (activeControl) mapRef.current.leafletElement.removeControl(activeControl);
    const zoomctrl = L.control.zoom({ position: 'topright' });
    mapRef.current.leafletElement.addControl(zoomctrl);
    setZoomControl(zoomctrl);
    const control = new L.Control.GroupedLayers(basemapHook);
    mapRef.current.leafletElement.addControl(control);
    setBaseLayerActive(basemapHook['Azure Base Road'], mapRef.current.leafletElement); // set active basemap , control will keep track and smart enough
    setActiveControl(control);
    set_initialReady(true);
  }, []);

  // useEffect(() => {
  //   console.log('MAPDEBUG: activeControl change', activeControl);
  // }, [activeControl]);
  const bounds = useMemo(() => {
    // console.log('MAPDEBUG: Generate markers pass', !filtered_projects.length, !mapRef.current, !initialReady);
    if (!filtered_projects.length || !mapRef.current || !initialReady) return;
    const markers = filtered_projects.filter((d) => d.lat).map((m, i) => ([m.lat, m.lng]));
    const markersBounds = L.latLngBounds();
    markers.forEach((marker) => markersBounds.extend(marker));
    if (!isDrawAnnotation) {
      // console.log('MAPDEBUG: Not In Drawing Mode');
      filtered_projects.filter((d) => d.lat).forEach((m, idx) => {
        if (m.id === project?.id) return;
        // console.log('MAPDEBUG: marker ',m.lat, m.lng, m)
        L.marker([m.lat, m.lng], {
          icon: iconType === 'WithImage' ? markerStyle.ImageIcon({
            url: `${process.env.REACT_APP_S3}/${m.thumbnail}`,
          }) : markerStyle.GreenIcon,
          layer_type: 'marker',
          riseOnHover: true,
        }).addTo(mapRef.current.leafletElement)
          .on('click', (e) => {
            // console.log('MAPDEBUG: latlng clicked marker', e.latlng);
            set_selected_project(idx);
            setShowSidebar(!(showSidebar && selected_project === idx));
            //   mapRef.current.leafletElement.setView(e.latlng, 18); // without animation
            mapRef.current.leafletElement.flyTo(e.latlng, 18, { animate: true, duration: 2.5 }); // with animation
          }).bindTooltip(m.name);
      });
    }
    return markersBounds;
  }, [initialReady, filtered_projects]);
  useEffect(async () => {
    const defaultActiveLyrGroup = [];
    set_dialogTimeSeries(false);
    console.log('MAPDEBUG: selected project before pass', project, _.isEmpty(project), !project?.lng, !initialReady);
    // console.log('MAPDEBUG: isDrawAnnotation', isDrawAnnotation);
    if (_.isEmpty(project) || !project?.lng || !initialReady) return;
    console.log('MAPDEBUG: selected project after pass', initialReady, project, timeSeriesIndex);
    // INIT:
    // clearing map
    await clearingMapLayers(mapRef.current.leafletElement);
    // console.log('MAPDEBUG: celaring map mapRef.current.leafletElement', vv2)
    // centering map // item moved to another use effect
    // const targetCenter = { lat: project.lat, lng: project.lng, zoom: 18 };
    // centeringMap(mapRef.current.leafletElement, targetCenter);
    // end INIT
    console.log('MAPDEBUG: Checking Has Ortho & KML... ', project.asset_files);
    let control = new L.Control.GroupedLayers(basemapHook, {}, {});
    if (project.asset_files || asset_files) {
      // LAYER CONSTRUCTION:
      // 1. initialize empty overlays
      const groupedOverlays = {
        NormalLayer: {
          //   Type1Layer: new L.LayerGroup(), // sample
        },
        TimeSeriesLayer: {},
      };
      const all_asset_files = project.asset_files || asset_files;
      const alllayers = all_asset_files.filter(x => x.media_type === 'orthophotos');
      const non_group_layers = alllayers.filter(x => [null, ''].includes(x.name));
      let group_layers = alllayers.filter(x => !!x.name);
      group_layers = _.groupBy(group_layers, x => x.name);

      // 2.1 building layer group into empty overlays - non time series
      for (let idx = 0; idx < non_group_layers.length; idx++) {
        const lyr = non_group_layers[idx];
        const layer_name = lyr.label ?? `${lyr.id}-${lyr.AssetId}-layer`;
        const lyr_grp = new L.LayerGroup(null, { layer_name, idx: lyr.id });
        lyr_grp.addLayer(await genLyr(lyr));
        groupedOverlays.NormalLayer[layer_name] = lyr_grp;
        // defaultActiveLyrGroup.push(lyr_grp); // to set default for any
        if (existingLayerIndex.includes(lyr.id)) defaultActiveLyrGroup.push(lyr_grp); // for when time series change, retain changes on normal layer
        if (isDrawAnnotation) {
          const thisLyrIsActiveBefore = project.activeLayers && project.activeLayers.split(',').map(actvLyrId => Number(actvLyrId)).includes(lyr.id)
          // console.log('MAPDEBUG: Checking Has Ortho & KML active ', project.activeLayers, lyr.id, thisLyrIsActiveBefore)
          if (thisLyrIsActiveBefore) defaultActiveLyrGroup.push(lyr_grp);
        }
      }
      // 2.2 building layer group into empty overlays - time series
      if (!!Object.keys(group_layers)?.length) {
        const tileserieslength = [];
        const tileSeriesDates = [];
        const resortGroupOrthos = Object.keys(group_layers).map((x_group_name) => {
          const sortedLyr = _.orderBy(group_layers[x_group_name], ['createdAt']);
          const countLyr = sortedLyr.length;
          const latestLyr = countLyr - 1;
          tileserieslength[x_group_name] = countLyr;
          tileSeriesDates[x_group_name] = {
            start: moment(sortedLyr[0].createdAt).format('DD MMM YYYY'),
            selected: moment(sortedLyr[timeSeriesIndex ?? latestLyr].createdAt).format('DD MMM YYYY'),
            end: moment(sortedLyr[latestLyr].createdAt).format('DD MMM YYYY'),
          };
          let lyrTimeSeries = sortedLyr[timeSeriesIndex ?? latestLyr];
          if (activeTileSeries === x_group_name) lyrTimeSeries = sortedLyr[timeSeriesIndex];
          return ({
            ...lyrTimeSeries,
            label: x_group_name,
            isGroup: true,
          });
        });
        set_timeSeriesLength(tileserieslength);
        set_dateTimeline(tileSeriesDates);
        // console.log('MAPDEBUG: resortGroupOrthos', resortGroupOrthos, tileserieslength);
        for (let idx = 0; idx < resortGroupOrthos.length; idx++) {
          const lyr_selected = resortGroupOrthos[idx];
          console.log('MAPDEBUG: lyr_selected', lyr_selected);
          const lyr_grp_2 = new L.LayerGroup(null, { layer_name: lyr_selected.name, isTimeSeries: true, idx: lyr_selected.id });
          lyr_grp_2.addLayer(await genLyr(lyr_selected));
          if (activeTileSeries === lyr_selected.name) defaultActiveLyrGroup.push(lyr_grp_2); // to set default for any
          // To Do: activeLayersTimeSeries save
          // if (isDrawAnnotation) {
          //   const thisLyrIsActiveBefore = project.activeLayers && project.activeLayers.split(',').map(actvLyrId => Number(actvLyrId)).includes(lyr_selected.id)
          //   // console.log('MAPDEBUG: Checking Has Ortho & KML active ', project.activeLayers, lyr.id, thisLyrIsActiveBefore)
          //   if (thisLyrIsActiveBefore) defaultActiveLyrGroup.push(lyr_grp_2);
          // }
          groupedOverlays.TimeSeriesLayer[lyr_selected.name] = lyr_grp_2;
        }
      }
      // 3. settings options on control
      // Make the "Landmarks" group exclusive (use radio inputs)
      // Show a checkbox next to non-exclusive group labels for toggling all
      const options = { exclusiveGroups: ['TimeSeriesLayer'], groupCheckboxes: false };
      control = new L.Control.GroupedLayers(basemapHook, groupedOverlays, options);
    }
    // if draw
    // console.log('MAPDEBUG: mainImageAnnotations', annotationProps.mainImageAnnotations)
    // console.log('MAPDEBUG: Checking Can Draw... ', isDrawAnnotation, annotationProps.mainImageAnnotations.length);

    if (isDrawAnnotation) {
      const editLayer = new L.FeatureGroup();
      mapRef.current?.leafletElement.addLayer(editLayer);
      const drawControl = new L.Control.Draw(drawOptions({ editLayer }));
      // set_geojsonCount(annotationProps.mainImageAnnotations.length);
      // console.log('MAPDEBUG: Before Drawing... Set existing layers', annotationProps.mainImageAnnotations.length)
      // if has previos geojson
      for (let annIdx = 0; annIdx < annotationProps.mainImageAnnotations.length; annIdx++) {
        const { id, points, is_close } = annotationProps.mainImageAnnotations[annIdx];
        const geojsonData = JSON.parse(points);
        // console.log('MAPDEBUG: geojsonData', geojsonData)
        const polyLyrStyle = {
          color: customColor.primary,
        };
        const polyLyr = new L.GeoJSON(geojsonData, {
          idx: id, is_close, layer_type: geojsonData.geometry.type, style: polyLyrStyle,
        });
        // polyLyr.options.color = customColor.primary;
        console.log('MAPDEBUG: Existing Drawing...', polyLyr._layers);
        polyLyr.getLayers()[0].addTo(editLayer); // sbb dlm satu poly tu not necessaryly single layer, in our case it should only be single
        polyLyr.on('click', (e) => {
          console.log('MAPDEBUG: Existing Layer Click', e.layer);
          annotationProps.setMainAnnotationId(e.layer.options.idx);
        });
      }
      // end if has previos geojson
      console.log('MAPDEBUG: activeEditControl', activeEditControl, drawControl, mapRef.current.leafletElement);
      // if (activeEditControl) drawControl.removeFrom(mapRef.current.leafletElement);
      if (activeEditControl) mapRef.current.leafletElement.removeControl(activeEditControl);
      mapRef.current?.leafletElement.addControl(drawControl);
      setActiveEditControl(drawControl);
      console.log('MAPDEBUG: severity...', annotationProps.severity);
      mapRef.current?.leafletElement.on('draw:created', (e) => {
        console.log('MAPDEBUG: Created Drawing...', e.layer.toGeoJSON(), e.layer);
        console.log('MAPDEBUG: Created Drawing with severity...', annotationProps.severity);
        const newId = uuid();
        const newObj = {
          id: newId, is_close: 0, isNew: true, SeverityId: annotationProps.severity.length ? annotationProps.severity[0].id : 1,
        };
        annotationProps.setMainAnnotationId(newId);
        const newMainAnnotationList = [...annotationProps.mainImageAnnotations];
        newMainAnnotationList.push({ ...newObj, points: JSON.stringify(e.layer.toGeoJSON()) });
        annotationProps.setMainImageAnnotations(newMainAnnotationList);
        e.layer.options.color = customColor.primary;
        editLayer.addLayer(e.layer);
      });
      mapRef.current?.leafletElement.on('draw:edited', (e) => {
        console.log('MAPDEBUG: Edit Drawing each layers', e.layers.getLayers().map);
        const modifiedIdx = [];
        // e.layers.getLayers()
        e.layers.eachLayer((lyr) => {
          console.log('MAPDEBUG: Edit Drawing...', lyr, lyr.toGeoJSON());
          // To do: no need to loop all
          modifiedIdx.push({ idx: lyr.options.idx, lyr: lyr.toGeoJSON() });
        });

        annotationProps.setMainImageAnnotations(prevVal => prevVal.map(ann => (
          modifiedIdx.map(midx => midx.idx).includes(ann.id)
            ? ({ ...ann, points: JSON.stringify(modifiedIdx.find(midx => midx.idx === ann.id).lyr) })
            : ann
        )));
      });
      mapRef.current?.leafletElement.on('draw:deleted', (e) => {
        e.layers.eachLayer((lyr) => {
          console.log('MAPDEBUG: DELETE Drawing...', lyr.options.idx, lyr);
          // To Do: if needed
          // if (lyr.options.is_close) {
          //   setOpenDialog(true);
          //   setDeleteActiveId(lyr.options.idx);
          //   return;
          // }
          annotationProps.setMainAnnotationId();
          annotationProps.setMainImageAnnotations(prevVal => prevVal.filter(ann => ann.id !== lyr.options.idx));
        });
      });
    }
    // 4. clear map from existing control
    if (zoomControl) mapRef.current?.leafletElement.removeControl(zoomControl);
    mapRef.current?.leafletElement.addControl(zoomControl);
    if (activeControl) mapRef.current?.leafletElement.removeControl(activeControl);
    mapRef.current?.leafletElement.addControl(control);

    // 5. set default base layer & overlay to on
    setBaseLayerActive(basemapHook[activeBase ?? 'Google Satellite'], mapRef.current?.leafletElement);
    setGroupLayerOverlayActive(defaultActiveLyrGroup, mapRef.current?.leafletElement);

    // 6. add the new control to map
    setActiveControl(control);
  }, [initialReady, project, timeSeriesIndex]);

  useEffect(async () => {
    if (_.isEmpty(project) || !project?.lng || !initialReady) return;
    const targetCenter = { lat: project.lat, lng: project.lng, zoom: 18 };
    centeringMap(mapRef.current.leafletElement, targetCenter);
    let markerIcon = [];
    if (!isDrawAnnotation) {
      if (!!selectedMarker) mapRef.current.leafletElement.removeLayer(selectedMarker);
      mapRef.current.leafletElement.createPane('locationMarker');
      mapRef.current.leafletElement.getPane('locationMarker').style.zIndex = 999;
      markerIcon = L.marker([targetCenter.lat, targetCenter.lng], {
        icon: iconType === 'WithImage'
          ? markerStyle.SelectedImageIcon({ url: `${process.env.REACT_APP_S3}/${project.thumbnail}` }) : markerStyle.GreenIcon,
        layer_type: 'marker',
        pane: 'locationMarker',
      }).addTo(mapRef.current.leafletElement);
      set_selectedMarker(markerIcon);
    }
  }, [initialReady, project]);
  return (
    <Map
      ref={mapRef}
      center={center}
      zoomControl={false}
      zoom={zoom}
      maxZoom={23}
      scrollWheelZoom
      tap={false}
      bounds={bounds}
      style={{ ...mapStyle }}
      onbaselayerchange={(e) => { set_activeBase(e.layer.options.name); }}
      onoverlayadd={(e) => {
        set_existingLayerIndex(prev => [...prev, e.layer.options.idx]);
        const addedlayers = e.layer._layers;
        console.log('MAPDEBUG: Overlay add', e.layer);
        // const ops = Object.values(addedlayers)[0].options;
        if (!!e.layer.options.isTimeSeries) {
          // console.log('MAPDEBUG: adding time series', assetFiles_timeSeries, ops.idx);
          set_activeTileSeries(e.layer.options.layer_name);
          set_dialogTimeSeries(true);
        }
        if (isDrawAnnotation) {
          if (!!e.layer.options.isTimeSeries) return;
          const prevActiveIdx = [...annotationProps.mainImageActiveLayers];
          prevActiveIdx.push(e.layer.options.idx);
          annotationProps.setMainImageActiveLayers(_.uniq(prevActiveIdx));
        }
      }}
      onoverlayremove={(e) => {
        set_existingLayerIndex(prev => prev.filter(p => p != e.layer.options.idx));
        if (isDrawAnnotation) {
          let prevActiveIdx = [...annotationProps.mainImageActiveLayers];
          prevActiveIdx = prevActiveIdx.filter((val) => val !== e.layer.options.idx);
          annotationProps.setMainImageActiveLayers(_.uniq(prevActiveIdx));
        }
      }}
    >
      {!!activeTileSeries && (
        <div className="w-100" style={{ position: 'absolute', bottom: '0%', zIndex: 999 }}>
          <OrthophotoCard
            open={dialogTimeSeries}
            set_value={set_timeSeriesIndex}
            value={timeSeriesIndex}
            max={activeTileSeries ? timeSeriesLength[activeTileSeries] : 100}
            dateRange={dateTimeline[activeTileSeries]}
            isDrawAnnotation={!!isDrawAnnotation}
            isInspection={!!isInspection}
          />
        </div>
      )}
    </Map>
  );
}

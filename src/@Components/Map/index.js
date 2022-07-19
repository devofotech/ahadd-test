/* eslint-disable max-len */
import React, { useEffect, useState, useRef, useMemo } from 'react';
import {
  Map, TileLayer, Marker, Tooltip, LayersControl,
} from 'react-leaflet';
import { GoogleLayer } from 'react-leaflet-google-v2';
import * as L from 'leaflet';
import { TrendingUp } from '@material-ui/icons';
import _ from 'lodash';
import Marker2 from '@Assets/Icons/Marker2.png';
import KmlLoader from './KmlLoader';
import OrthophotoCard from './Orthophoto';
import './map.css';

const { BaseLayer, Overlay } = LayersControl;
// const google_map_key = 'AIzaSyAbPx_nphakqjTpgdPX_e_yN4Hdfdss2-w';
// const mapbox_style_id = 'ckty0a3040k2b18s2djzhc9rs';
const mapbox_style_id = 'ckty1pmkq0lbh18pd2e64iusf';
const mapbox_access_token = 'pk.eyJ1IjoiZGV2b2ZvdGVjaCIsImEiOiJja3R4emdxcXQyeXJlMnBvM3FhMjlrdG9vIn0.3V_xPbc72a4v92QNLxu3NA';

const LeafIcon = L.Icon.extend({ options: {} });
const greenIcon = new LeafIcon({
  iconUrl: `${Marker2}`,
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [27, 38],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function Maps({
  filtered_projects = [],
  set_selected_project = () => null,
  setShowSidebar = () => null,
  selected_project = 0,
  showSidebar,
  project,
  mapType = 'ROADMAP',
  layers = [],
}) {
  const [center, set_center] = useState([1.496798, 103.704124]);
  const [zoom, set_zoom] = useState(10);
  const [asset_files, set_asset_files] = useState([]);
  const [allOrthos, set_allOrthos] = useState([]);
  const [orthophotos, set_orthophotos] = useState([]);
  const [ortho_index, set_ortho_index] = useState(0);
  const [timeSeriesIndex, set_timeSeriesIndex] = useState(1);
  const [checkBoxStatus, set_checkBoxStatus] = useState([]);
  const [dialogTimeSeries, set_dialogTimeSeries] = useState(false);
  const [timeSeriesLength, set_timeSeriesLength] = useState(100);
  const mapRef = useRef();

  const bounds = useMemo(() => {
    if (!filtered_projects.length) return;
    const markers = filtered_projects.filter((d) => d.lat).map((m, i) => ([m.lat, m.lng]));
    const markersBounds = L.latLngBounds();
    markers.forEach((marker) => markersBounds.extend(marker));
    return markersBounds;
  }, [filtered_projects]);
  useEffect(() => {
    if (!showSidebar) set_zoom(10);
    if (!filtered_projects.length || !filtered_projects[selected_project]?.lng || _.isEmpty(project)) return;
    set_center([filtered_projects[selected_project].lat, filtered_projects[selected_project].lng]);
    set_zoom(18);
    set_asset_files(filtered_projects[selected_project].asset_files);
    const allorthophotos = filtered_projects[selected_project].asset_files.filter(x => x.media_type === 'orthophotos');
    set_allOrthos(allorthophotos);
    const non_group_orthos = allorthophotos.filter(x => [null, ''].includes(x.name));
    let group_orthos = allorthophotos.filter(x => !!x.name);
    group_orthos = _.groupBy(group_orthos, x => x.name);
    let new_orthos = non_group_orthos;
    if (!!Object.keys(group_orthos)?.length) {
      set_dialogTimeSeries(true);
      const resortGroupOrthos = Object.keys(group_orthos).map((x_group_name, idx) => {
        // set intial group
        if (!idx) set_timeSeriesLength(group_orthos[x_group_name].length);
        return ({
          ...group_orthos[x_group_name][group_orthos[x_group_name].length - 1],
          label: x_group_name,
          isGroup: true,
        });
      });
      new_orthos = [...resortGroupOrthos, ...non_group_orthos];
    }
    set_checkBoxStatus(new_orthos.map((ortho, idx) => !!!idx));
    set_orthophotos(new_orthos);
  }, [filtered_projects, selected_project, showSidebar]);

  useEffect(() => {
    console.log('vvv', timeSeriesIndex, checkBoxStatus);
    if (!allOrthos.length) return;
    const non_group_orthos = allOrthos.filter(x => [null, ''].includes(x.name));
    let group_orthos = allOrthos.filter(x => !!x.name);
    group_orthos = _.groupBy(group_orthos, x => x.name);
    const resortGroupOrthos = Object.keys(group_orthos).map(x_group_name => {
      const last_index = group_orthos[x_group_name].length - 1;
      return ({
        ...group_orthos[x_group_name][timeSeriesIndex > last_index ? last_index : timeSeriesIndex],
        label: x_group_name,
      });
    });
    set_checkBoxStatus(prev => (prev.map((x, idx) => ((idx + 1 <= resortGroupOrthos.length) ? idx === ortho_index : x))));
    set_orthophotos([...resortGroupOrthos, ...non_group_orthos]);
  }, [timeSeriesIndex]);

  return (
    <Map
      ref={mapRef}
      center={center}
      zoom={zoom}
      maxZoom={23}
      scrollWheelZoom
      tap={false}
      bounds={bounds}
      style={{
        position: 'fixed', top: 0, bottom: 0, right: 0, left: 0,
      }}
      onoverlayadd={(e) => {
        console.log(`vvv Overlay added index: ${e.layer.options.idx}`, orthophotos);
        set_ortho_index(e.layer.options.idx);
        if (!!orthophotos[e.layer.options.idx]?.name) set_dialogTimeSeries(true);
      }}
      onoverlayremove={(e) => {
        console.log(`vvv Overlay removed index: ${e.layer.options.idx}`, orthophotos);
        if (!!orthophotos[e.layer.options.idx]?.name) set_dialogTimeSeries(false);
      }}

    >
      <div id="test-mm" style={{ position: 'absolute', top: '5rem', zIndex: 999 }}>
        <OrthophotoCard
          style={{ position: 'absolute' }}
          open={dialogTimeSeries}
          set_value={set_timeSeriesIndex}
          value={timeSeriesIndex}
          max={timeSeriesLength}
        />
      </div>
      <LayersControl position="topright">
        <BaseLayer name="OpenStreetMap.Mapnik osm" checked={mapType === 'OSMROADMAP'}>
          <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
        </BaseLayer>
        {/* <BaseLayer name="OpenStreetMap.Mapnik osmv2">
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </BaseLayer> */}
        <BaseLayer name="mapbox" checked={mapType === 'MBROADMAP'}>
          <TileLayer
            attribution='Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>'
            url={`https://api.mapbox.com/styles/v1/devofotech/${mapbox_style_id}/tiles/256/{z}/{x}/{y}@2x?access_token=${mapbox_access_token}`}
          />
        </BaseLayer>

        {/* temporary remove google maps as base since leaflet cannot load google map */}
        <BaseLayer name="Google Maps Roads" checked={mapType === 'ROADMAP'}>
          <GoogleLayer googlekey={process.env.REACT_APP_GOOGLE_MAP_API_KEY} maptype="ROADMAP" />
        </BaseLayer>
        <BaseLayer name="Google Maps Terrain" checked={mapType === 'TERRAIN'}>
          <GoogleLayer googlekey={process.env.REACT_APP_GOOGLE_MAP_API_KEY} maptype="TERRAIN" />
        </BaseLayer>
        <BaseLayer name="Google Maps Satellite" checked={mapType === 'SATELLITE'}>
          <GoogleLayer googlekey={process.env.REACT_APP_GOOGLE_MAP_API_KEY} maptype="SATELLITE" />
        </BaseLayer>
        {!!orthophotos.length && orthophotos.map((ortho, idx) => (
          <Overlay
            name={ortho.label || ortho.name}
            isGroup={ortho.isGroup}
            key={`${idx}-${ortho.label || ortho.name || 'label'}-${ortho.id}`}
            checked={checkBoxStatus.length ? checkBoxStatus[idx] : !!!idx}
          >
            {ortho.type === 'kml' ? <KmlLoader url={ortho.path} /> : (
              <TileLayer
                url={`${ortho.path}/{z}/{x}/{y}.png`}
                idx={idx}
              />
            )}
          </Overlay>
        ))}
      </LayersControl>

      {!!filtered_projects.length && filtered_projects.filter((d) => d.lat).map((m, i) => {
        const icon = { icon: greenIcon };
        return (
          <Marker
            position={[m.lat, m.lng]}
            zIndexOffset={i === selected_project ? 999 : 0}
            opacity={(i === selected_project || !showSidebar) ? 1 : 0.7}
            onclick={() => { set_selected_project(i); setShowSidebar(!(showSidebar && selected_project === i)); }}
            {...icon}
          >
            <Tooltip>{m.name}</Tooltip>
          </Marker>
        );
      })}
    </Map>
  );
}

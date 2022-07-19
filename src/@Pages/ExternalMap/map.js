/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import queryString from 'query-string';
import {
  Map, TileLayer, Marker, LayersControl,
} from 'react-leaflet';
import KmlLoader from '@Components/Map/KmlLoader';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Api, { endpoints } from '@Helpers/api';
import { GoogleLayer } from 'react-leaflet-google-v2';
import _ from 'lodash';

import Marker2 from '@Assets/Icons/Marker2.png';
import OrthophotoCard from './Orthophoto';

// Map Config
const { Overlay, BaseLayer } = LayersControl;
const google_map_key = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

const myIcon = L.icon({
  iconUrl: `${Marker2}`,
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [27, 38],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default (props) => {
  const { AssetId } = useParams();
  const { t: token } = queryString.parse(window.location.search);
  const [asset, set_asset] = useState();
  const [orthophotos, set_orthophotos] = useState([]);
  const [filtered_orthophotos, set_filtered_orthophotos] = useState([]);
  const [center, set_center] = useState([4.400021, 109.611338]);
  const [zoom, set_zoom] = useState(6);
  const [checkBoxStatus, set_checkBoxStatus] = useState([]);
  const [dialogTimeSeries, set_dialogTimeSeries] = useState(false);
  const [timeSeriesLength, set_timeSeriesLength] = useState(100);
  const [ortho_index, set_ortho_index] = useState(0);
  const [timeSeriesIndex, set_timeSeriesIndex] = useState(1);

  useEffect(() => {
    Api({
      endpoint: endpoints.showAssets(AssetId),
      onSuccess: r => {
        console.log('show asset', r);
        set_asset(r.data);
        set_orthophotos(r.data.asset_files.filter(x => x.media_type === 'orthophotos'));
      },
      token,
    });
  }, []);

  useEffect(() => {
    if (!orthophotos.length || !asset?.lng) return;
    const non_group_orthos = orthophotos.filter(x => [null, ''].includes(x.name));
    let group_orthos = orthophotos.filter(x => !!x.name);
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
    set_filtered_orthophotos(new_orthos);
  }, [orthophotos]);

  useEffect(() => {
    if (!orthophotos.length) return;
    const non_group_orthos = orthophotos.filter(x => [null, ''].includes(x.name));
    let group_orthos = orthophotos.filter(x => !!x.name);
    group_orthos = _.groupBy(group_orthos, x => x.name);
    const resortGroupOrthos = Object.keys(group_orthos).map(x_group_name => {
      const last_index = group_orthos[x_group_name].length - 1;
      return ({
        ...group_orthos[x_group_name][timeSeriesIndex > last_index ? last_index : timeSeriesIndex],
        label: x_group_name,
      });
    });
    set_checkBoxStatus(prev => (prev.map((x, idx) => ((idx + 1 <= resortGroupOrthos.length) ? idx === ortho_index : x))));
    set_filtered_orthophotos([...resortGroupOrthos, ...non_group_orthos]);
  }, [timeSeriesIndex]);

  useEffect(() => {
    if (asset) {
      set_center([asset.lat, asset.lng]);
      set_zoom(19);
    }
  }, [asset]);

  return (
    <Map
      center={center}
      zoom={zoom}
      maxZoom={23}
      dragging="true"
      touchZoom="center"
      className="w-100 h-100"
      style={{
        position: 'absolute', top: 0, bottom: 0, left: 0, right: 0,
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
        <BaseLayer name="Google Maps Roads" checked>
          <GoogleLayer googlekey={google_map_key} maptype="ROADMAP" />
        </BaseLayer>
        <BaseLayer name="Google Maps Terrain">
          <GoogleLayer googlekey={google_map_key} maptype="TERRAIN" />
        </BaseLayer>
        <BaseLayer name="Google Maps Satellite">
          <GoogleLayer googlekey={google_map_key} maptype="SATELLITE" />
        </BaseLayer>
        {asset && (
          <Overlay checked name="Marker">
            <Marker position={[asset.lat, asset.lng]} icon={myIcon} />
          </Overlay>
        )}
        {!!filtered_orthophotos?.length && filtered_orthophotos?.map((ortho, idx) => (
          <Overlay
            name={ortho.label || ortho.name}
            checked={checkBoxStatus.length ? checkBoxStatus[idx] : !!!idx}
            isGroup={ortho.isGroup}
            key={`${idx}-${ortho.label || ortho.name || 'label'}-${ortho.id}`}
          >
            {ortho.type === 'kml' ? <KmlLoader url={ortho.path} /> : (
              <TileLayer
                url={`${ortho.path}/{z}/{x}/{y}.png`}
                idx={idx}
              />
            )}
          </Overlay>
        ))}
        {/* {annotations.length > 0 && (
          <Overlay checked name="Annotations">
            {annotations.map(a => (
              <Marker
                onClick={() => console.log(a.id)}
                position={[a.latitude, a.longitude]}
                icon={myIcon}
              />
            ))}
          </Overlay>
        )} */}
      </LayersControl>
    </Map>
  );
};

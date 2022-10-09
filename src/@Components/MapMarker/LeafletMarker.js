/* eslint-disable max-len */
import * as L from 'leaflet';
import GreenMarker from '@Assets/Icons/Marker2.svg';
import YellowMarker from '@Assets/Icons/Marker3.svg';

const DefaultIcon = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png',
});
const LeafIcon = L.Icon.extend({ options: {} });
const GreenIcon = new LeafIcon({
  iconUrl: { YellowMarker },
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [27, 38],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
const ImageIcon = ({ url, ...extraProps }) => L.divIcon({
  html: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 328 384" style="position:fixed;box-shadow:0px 0px 13px 1px rgba(0, 0, 0, 0.2);">
      <defs><style>.cls-1,.cls-2{fill:none;stroke:#fff;stroke-linejoin:round;}.cls-1{stroke-width:12px;}.cls-2{stroke-width:5px;}.cls-3{fill:#fff;}</style></defs>
      <g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1">
        <rect class="cls-1" x="4" y="4" width="320" height="320"/>
        <line class="cls-2" x1="219" y1="324" x2="99" y2="324"/>
        <polygon class="cls-3" points="219 324 159 384 99 324 219 324"/>
      </g></g>
      <img src="${url}" style="width: 27px;height: 27px;position: absolute;" />
    </svg>`,
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [27, 38],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  ...extraProps,
});
const SelectedImageIcon = ({ url, ...extraProps }) => L.divIcon({
  html: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 328 384" style="position:fixed; transform: scale(1.5);box-shadow:0px 0px 10px 2px rgba(0, 0, 0, 0.3);">
      <defs><style type="text/css">.st0{fill:none;stroke:#6CA49B;stroke-width:21;stroke-linejoin:round;}.st1{fill:#FFBD02;stroke-width:16px;}.st2{fill:none;stroke:#FFBD02;stroke-width:21;stroke-linejoin:round;}</style></defs>
      <g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1">
        <line class="st0" x1="223" y1="328" x2="103" y2="328"/>
        <polygon class="st1" points="223,328 163,388 103,328 "/>
        <rect x="8" y="8" class="st2" width="320" height="320"/>
      </g></g>
      <img src="${url}" style="width: 27px;height: 27px;position:absolute;transform:scale(1.4);" />
    </svg>`,
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [27, 38],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  ...extraProps,
});

export default () => {
  return {
    DefaultIcon,
    GreenIcon,
    ImageIcon,
    SelectedImageIcon,
  };
};

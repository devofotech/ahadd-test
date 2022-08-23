import * as L from 'leaflet';

export const customColor = {
  primary: '#045c5c', // refer to global
  nativeblue: 'rgb(51, 136, 255)',
};

const MyCustomMarker = L.Icon.extend({
  options: {
    shadowUrl: null,
    iconAnchor: new L.Point(12, 12),
    iconSize: new L.Point(24, 24),
    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Information_icon4_orange.svg',
  },
});

export const drawOptions = ({ editLayer, ...extra }) => {
  const draw = {
    polyline: false,
    polygon: false,
    circlemarker: false,
    circle: false,
    rectangle: false,
    marker: false,
  };
  if (extra.withPolyline) {
    draw.polyline = {
      shapeOptions: {
        color: '#f357a1',
        weight: 10,
        layer_type: 'polyline',
      },
    };
  }
  if (extra.withPolygon) {
    draw.polygon = {
      allowIntersection: false, // Restricts shapes to simple polygons
      drawError: {
        color: '#e1e100', // Color the shape will turn when intersects
        message: '<strong>Polygon draw does not allow intersections!<strong> (allowIntersection: false)', // Message that will show when intersect
      },
      shapeOptions: {
        color: '#bada55',
        layer_type: 'polygon',
      },
    };
  }
  if (extra.withRectangle) {
    draw.rectangle = {
      shapeOptions: {
        clickable: false,
        layer_type: 'rectangle',
      },
    };
  }
  if (extra.withMarker) {
    draw.marker = {
      icon: new MyCustomMarker(),
    };
  }
  return {
    position: 'topright',
    draw,
    edit: {
      featureGroup: editLayer, // REQUIRED!!
      remove: true,
    },
    ...extra,
  };
};

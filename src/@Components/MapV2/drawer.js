export const customColor = {
  primary: '#045c5c', // refer to global
  nativeblue: 'rgb(51, 136, 255)',
};

export const drawOptions = ({ editLayer, ...extra }) => ({
  position: 'topright',
  draw: {
    polyline: {
      shapeOptions: {
        color: '#f357a1',
        weight: 10,
        layer_type: 'polyline',
      },
    },
    polygon: {
      allowIntersection: false, // Restricts shapes to simple polygons
      drawError: {
        color: '#e1e100', // Color the shape will turn when intersects
        message: '<strong>Polygon draw does not allow intersections!<strong> (allowIntersection: false)', // Message that will show when intersect
      },
      shapeOptions: {
        color: '#bada55',
        layer_type: 'polygon',
      },
    },
    circlemarker: false,
    circle: false,
    rectangle: {
      shapeOptions: {
        clickable: false,
        layer_type: 'rectangle',
      },
    },
    marker: false,
    // marker: {
    //     icon: new MyCustomMarker()
    //   }
  },
  edit: {
    featureGroup: editLayer, // REQUIRED!!
    remove: true,
  },
  ...extra,
});

/* eslint-disable max-lines */
import { useState, useEffect } from 'react';
import PolygonPicker from '@Components/MapV2/PolygonPicker';
import {
  Grid, TextField, MenuItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Dropzone from '@Components/DropzoneBox/index';
import { markerToString, polygonToString, stringToMarker } from '@Helpers';

const useStyles = makeStyles(() => ({
  gradient: {
    backgroundColor: 'var(--active-color)',
    backgroundImage: 'linear-gradient(var(--active-color), #33ABC1)',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 5,
  },
  inputTag: {
    backgroundColor: 'white',
    paddingLeft: 20,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 5,
  },
  label: {
    marginTop: 13,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    color: 'grey',
  },
  labelTag: {
    marginTop: 5,
    padding: 20,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    color: 'grey',
  },
}));

export default (h) => {
  const classes = useStyles();
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (!h.network) return;
    if (h.network == 1) {
      setIsDisabled(false);
      return;
    }
    h.setRegion(null);
    h.setSection(null);
    setIsDisabled(true);
  }, [h.network]);

  return (
    <Grid container className="px-1 overflow-auto" style={{ maxHeight: '39.8rem' }}>
      <Grid item xs={12} className="px-1 mb-2">
        <Dropzone files={h.files} setFiles={h.setFiles} type="image" height={180} customStyle={{ backgroundColor: 'white', marginBottom: 10 }} />
        <br />
        <CustomTextField classes={classes} name="Asset Id" value={h.name} onChange={(e) => h.setName(e.target.value)} />
      </Grid>
      {[
        {
          title: 'Network',
          children: (
            <CustomTextField
              classes={classes}
              name="Network"
              value={h.network}
              itemList={h.networks}
              onChange={(e) => h.setNetwork(e.target.value)}
              select
            />),
        },
        {
          title: 'Region',
          children: (<CustomTextField
            classes={classes}
            name="Region"
            value={h.network == 1 ? h.region : []}
            itemList={h.regions}
            onChange={(e) => h.setRegion(e.target.value)}
            select
            disabled={isDisabled}
          />),
        },
        {
          title: 'Section',
          children: (<CustomTextField
            classes={classes}
            name="Section"
            value={h.network == 1 ? h.region : []}
            itemList={h.sections}
            onChange={(e) => h.setSection(e.target.value)}
            select
            disabled={isDisabled}
          />),
        },
        {
          title: 'Ranking',
          children: (<CustomTextField
            classes={classes}
            name="Ranking"
            value={h.ranking}
            itemList={h.rankings}
            onChange={(e) => h.setRanking(e.target.value)}
            select
          />),
        },
        {
          title: 'Location',
          children: <Location {...h} classes={classes} locationCoordinate />,
        },
        {
          title: 'Polygon Coordinate',
          children: <PolygonCoordinate {...h} classes={classes} />,
        },
      ].map(({ children }) => (
        <Grid item xs={6} className="px-1 mb-2">
          {children}
        </Grid>
      ))}
    </Grid>
  );
};

const Location = (h) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <CustomTextField
          classes={h.classes}
          name={h.locationCoordinate ? 'Pin Coordinate' : 'Polygon Coordinate'}
          value={markerToString(h.marker)}
          onChange={(e) => h.setMarker(stringToMarker(e.target.value))}
        />
      </Grid>
      <Grid item xs={12} className="mb-2 py-2" style={{ height: 300 }}>
        <PolygonPicker
          picker={h.marker}
          setPicker={h.setMarker}
          pickerFor="marker"
        />
      </Grid>
    </Grid>
  );
};

const PolygonCoordinate = (h) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <CustomTextField
          classes={h.classes}
          name={h.locationCoordinate ? 'Pin Coordinate' : 'Polygon Coordinate'}
          value={polygonToString(h.polygon)}
          disabled
        />
      </Grid>
      <Grid item xs={12} className="mb-2 py-2" style={{ height: 300 }}>
        <PolygonPicker
          picker={h.polygon}
          setPicker={h.setPolygon}
          pickerFor="polygon"
          isLeafletDraw
        />
      </Grid>
    </Grid>
  );
};

const CustomTextField = (h) => {
  return (
    h.select ? (
      <TextField
        variant="outlined"
        fullWidth
        size="small"
        label={h.name}
        className="py-2"
        InputProps={{ className: h.classes.input }}
        InputLabelProps={{ className: h.classes.label }}
        {...h}
      >
        {h.itemList.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    ) : (
      <TextField
        placeholder={`Enter ${h.name} here`}
        variant="outlined"
        fullWidth
        size="small"
        className="py-2"
        InputProps={{ className: h.classes.input }}
        InputLabelProps={{ className: h.classes.label }}
        {...h}
      />
    )
  );
};

import LocationPicker from '@Components/Map/LocationPicker';
import {
  Grid, TextField, MenuItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Dropzone from '@Components/DropzoneBox/v3';
import { markerToString, stringToMarker } from '@Helpers';

import InputTag from './InputTag';

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
    marginTop: 5,
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

const network = [
  {
    value: 'BKE',
  },
  {
    value: 'LPT2',
  },
];

const region = [
  {
    value: 'North',
  },
  {
    value: 'Central',
  },
  {
    value: 'South',
  },
];

const section = [
  {
    value: 'N1',
  },
  {
    value: 'N2',
  },
  {
    value: 'N3',
  },
];

const ranking = [
  {
    value: 'Very High (AA)',
  },
  {
    value: 'High (A)',
  },
  {
    value: 'Medium (B)',
  },
  {
    value: 'Low (C)',
  },
  {
    value: 'Unranked',
  },
];

export default (h) => {
  const classes = useStyles();
  return (
    <Grid container className="px-1 overflow-auto" style={{ maxHeight: '39.8rem' }}>
      <Grid item xs={12} className="px-1 mb-2">
        <Dropzone files={h.files} setFiles={h.setFiles} type="image" height={180} />
        <CustomTextField classes={classes} name="Asset Id" value={h.name} onChange={(e) => h.setName(e.target.value)} />
      </Grid>
      {[
        {
          title: 'Network',
          children: <CustomTextField classes={classes} name="Network" value={h.network} values={network} onChange={(e) => h.setNetwork(e.target.value)} select />,
        },
        {
          title: 'Region',
          children: <CustomTextField classes={classes} name="Region" value={h.region} values={region} onChange={(e) => h.setRegion(e.target.value)} select />,
        },
        {
          title: 'Section',
          children: <CustomTextField classes={classes} name="Section" value={h.section} values={section} onChange={(e) => h.setSection(e.target.value)} select />,
        },
        {
          title: 'Ranking',
          children: <CustomTextField classes={classes} name="Ranking" value={h.ranking} values={ranking} onChange={(e) => h.setRanking(e.target.value)} select />,
        },
        {
          title: 'Location',
          children: <Location {...h} classes={classes} locationCoordinate />,
        },
        {
          title: 'Polygon Coordinate',
          children: <Location {...h} classes={classes} />,
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
        <CustomTextField classes={h.classes} name={h.locationCoordinate ? 'Pin Coordinate' : 'Polygon Coordinate'} value={markerToString(h.marker)} onChange={(e) => h.setMarker(stringToMarker(e.target.value))} />
      </Grid>
      <Grid item xs={12} className="mb-2 py-2" style={{ height: 300 }}>
        <LocationPicker
          marker={h.marker}
          setMarker={h.setMarker}
        />
      </Grid>
    </Grid>
  );
};

const CustomTextField = (h) => {
  return (
    h.select ? (
      <TextField
        placeholder={`Enter ${h.name} here`}
        variant="outlined"
        fullWidth
        size="small"
        className="py-2"
        InputProps={{ className: h.classes.input }}
        InputLabelProps={{ className: h.classes.label }}
        {...h}
      >
        {h.values.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.value}
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

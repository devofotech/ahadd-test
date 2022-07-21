import LocationPicker from '@Components/Map/LocationPicker';
import { Grid, TextField } from '@material-ui/core';
import Dropzone from '@Components/DropzoneBox/index';
import { markerToString, stringToMarker } from '@Helpers';

import InputTag from './InputTag';

export default (h) => {
  return (
    <Grid container className="px-1 overflow-auto" style={{ maxHeight: '39.8rem' }}>
      {[
        {
          title: 'Asset Name',
          children: <CustomTextField name="Asset Name" value={h.name} onChange={(e) => h.setName(e.target.value)} />,
        },
        {
          title: 'Asset Tag',
          children: <InputTag
            className="py-2"
            setSelectedTags={h.setAssetTag}
            selectedTags={h.assetTag}
            fullWidth
            variant="outlined"
            id="tags"
            name="tags"
            placeholder="Asset Tags"
          />,
        },
        {
          title: 'Location',
          children: <Location {...h} />,
        },
        {
          title: 'Upload Image',
          children: <Dropzone files={h.files} setFiles={h.setFiles} type="image" height={180} />,
        },
      ].map(({ title, children }) => (
        <Grid item xs={12} className="px-1">
          <h3 className="pl-2 my-1">{title}</h3>
          {children}
        </Grid>
      ))}
    </Grid>
  );
};

const Location = (h) => {
  return (
    <Grid container>
      <Grid container item xs={12}>
        <Grid item xs={12}>
          <CustomTextField name="Location" value={h.location} onChange={(e) => h.setLocation(e.target.value)} />
        </Grid>
        <Grid item xs={6} className="pr-1">
          <CustomTextField name="State" value={h.state} onChange={(e) => h.setState(e.target.value)} />
        </Grid>
        <Grid item xs={6} className="pl-1">
          <CustomTextField name="Country" value={h.country} onChange={(e) => h.setCountry(e.target.value)} />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <CustomTextField name="Coordinate" value={markerToString(h.marker)} onChange={(e) => h.setMarker(stringToMarker(e.target.value))} />
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
    <TextField
      placeholder={`Enter ${h.name} here`}
      variant="outlined"
      fullWidth
      size="small"
      className="py-2"
      {...h}
    />
  );
};

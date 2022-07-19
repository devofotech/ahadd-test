import {
  Grid, TextField, MenuItem,
} from '@material-ui/core';
import LocationPicker from '@Components/Map/LocationPicker';
import Dropzone from '@Components/DropzoneBox/index';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { markerToString, stringToMarker } from '@Helpers';
import InputTag from './InputTag'

export default (props) => {
  const phase = Object.assign({}, ...props.projectPhaseList?.map(m => ({ [m.id]: m.name })));
  const phases = props.asset?.selectedPhase.split(',').map((y, index) => ({ id: index, name: phase[y], value: y }));
  return (
    <div className="d-flex justify-content-center">
      <Grid container xs={12} spacing={2} style={{ overflowY: 'auto', maxHeight: '500px', overflowX: 'hidden' }}>
        <Grid item xs={6}>
          {[
            {
              label: 'Asset Name',
              input: (
                <CustomTextField
                  placeholder="Enter Asset Name Here"
                  value={props.name}
                  onChange={(e) => props.setName(e.target.value)}
                  styles={props.styles}
                />
              ),
            },
            {
              label: 'Asset ID',
              input: (
                <CustomTextField
                  disabled
                  value={props.id}
                  onChange={(e) => props.setId(e.target.value)}
                  styles={props.styles}
                />
              ),
            },
            {
              label: 'Asset Type',
              input: (
                <InputTag
                  setSelectedTags={props.setAssetType}
                  selectedTags={props.assetType}
                  fullWidth
                  variant="outlined"
                  id="tags"
                  name="tags"
                  placeholder="Asset Tags"
                />
              ),
            },
            {
              label: 'Current Asset Phase',
              input: (
                <TextField
                  variant="outlined"
                  fullWidth
                  size="small"
                  select
                  value={props.currentAssetPhase}
                  onChange={(e) => props.setCurrentAssetPhase(e.target.value)}
                  styles={props.styles}
                >
                  <MenuItem disabled>Current Asset Phase</MenuItem>
                  {phases.map(m => (
                    <MenuItem key={m.id} value={m.value}>{m.name}</MenuItem>
                  ))}
                </TextField>
              ),
            },
            {
              label: 'Additional Description',
              input: (
                <Editor
                  editorState={props.editorState}
                  toolbarClassName="toolbar-class"
                  wrapperClassName="wrapper-class"
                  editorClassName="editor-class"
                  onEditorStateChange={(e) => props.setEditorState(e)}
                  placeholder="Additional description here"
                  toolbar={{
                    options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker'],
                    inline: {
                      options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace'],
                    },
                  }}
                />
              ),
            },
          ].map(items => (
            <>
              <p style={{ padding: '15px 10px 5px' }}>{items.label}</p>
              {items.input}
            </>
          ))}
        </Grid>
        <Grid item xs={6}>
          <p style={{ padding: '15px 10px 5px' }}>Location</p>
          <Location {...props} />
          <p style={{ padding: '15px 10px 5px' }}>Upload Image</p>
          <p style={{ fontSize: '10px', paddingLeft: '10px' }}>File format should be in jpg, png</p>
          <div style={{ marginBottom: 10 }}>
            <Dropzone files={props.files} setFiles={props.setFiles} type="image" height={250} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export const Location = (props) => {
  return (
    <Grid container>
      <Grid container item xs={12}>
        <Grid item xs={12}>
          <CustomTextField
            placeholder="Enter Location Here"
            styles={props.styles}
            value={props.location}
            onChange={(e) => props.setLocation(e.target.value)}
          />
        </Grid>
        <Grid container item xs={12} style={{ justifyContent: 'space-between'}}>
          <Grid item xs={6}>
            <CustomTextField
              placeholder="Enter State Here"
              styles={props.styles}
              value={props.state}
              onChange={(e) => props.setState(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextField
              placeholder="Enter Country Here"
              value={props.country}
              styles={props.styles}
              onChange={(e) => props.setCountry(e.target.value)}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <CustomTextField
          placeholder="Enter Coordinate Here"
          styles={props.styles}
          value={markerToString(props.marker)}
          onChange={(e) => props.setMarker(stringToMarker(e.target.value))}
        />
      </Grid>
      <Grid item xs={12} style={{ height: 300, marginBottom: 10 }}>
        <LocationPicker
          marker={props.marker}
          setMarker={props.setMarker}
        />
      </Grid>
    </Grid>
  );
};

const CustomTextField = (props) => (
  <TextField
    variant="outlined"
    fullWidth
    size="small"
    className={props.styles}
    {...props}
  />
);

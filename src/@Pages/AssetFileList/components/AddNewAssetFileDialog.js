/* eslint-disable complexity */
import React, { useState, useEffect } from 'react';
import Button from '@Components/Button';
import {
  Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, CircularProgress, MenuItem, IconButton,
} from '@material-ui/core';
import { InsertLink } from '@material-ui/icons';
import Api, { endpoints } from '@Helpers/api';

export default ({ OrganizationId, ...h }) => {
  const [open, setOpen] = useState(false);

  const [filteredPhases, setFilteredPhases] = useState([]);
  const [AssetId, setAssetId] = useState();
  const [category, setCategory] = useState();
  const [GeospatialTypeId, setGeospatialTypeId] = useState();
  const [type, settype] = useState();
  const [media_type, setmedia_type] = useState();
  const [name, setname] = useState();
  const [label, setlabel] = useState();
  const [path, setpath] = useState();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (!!h.asset_id) {
      setFilteredPhases(h.phases.filter(p => h.assets.find(a => a.id === Number(h.asset_id)).selectedPhase.split(',').map(x => Number(x)).includes(p.id)));
    } else if (AssetId) {
      setFilteredPhases(h.phases.filter(p => h.assets.find(a => a.id === AssetId).selectedPhase.split(',').map(x => Number(x)).includes(p.id)));
    }
  }, [open, AssetId]);
  const handleClickOpen = () => { setOpen(true); };
  const handleClose = () => { setOpen(false); };

  const onSubmit = () => {
    const data = { is_external: 1 };
    if (!label || h.asset_id ? !h.asset_id : !AssetId || !category || !path) return;
    if (!!h.asset_id) data.AssetId = h.asset_id;
    if (!!AssetId) data.AssetId = AssetId;
    if (!!category) data.ProjectPhaseId = category;
    if (!!label) data.label = label;
    if (!!name) data.name = name;
    if (!!media_type) data.media_type = media_type;
    if (!!type) data.type = type;
    if (!!GeospatialTypeId) data.GeospatialTypeId = GeospatialTypeId;
    if (!!path) data.path = path;

    setIsLoading(true);
    Api({
      endpoint: endpoints.newAssetFile(),
      data,
      onSuccess: () => {
        handleClose();
        setIsLoading(false);
        toast('success', 'Added new asset file successfully');
        h.getAssetFile();
      },
      onFail: (err) => {
        const isString = typeof err === 'string';
        toast('error', `Failed to add asset file: ${isString ? err : ''}`);
        setIsLoading(false);
      },
    });
  };

  const mediaTypes = [
    {
      id: 'ortophotos',
      name: 'Orthophotos',
    },
    {
      id: '3d',
      name: '3D Data (Mesh)',
    },
    {
      id: 'point-clouds',
      name: '3D Data (Point Cloud)',
    },
    {
      id: '360-model',
      name: '360 Data',
    },
    {
      id: 'site-reports',
      name: 'Report',
    },
  ];

  return (
    <>
      <Button onClick={() => handleClickOpen()} className="ml-2 mr-2 mb-2">
        <IconButton style={{ padding: 0, color: 'white' }}>
          <InsertLink style={{ transform: 'rotate(-45deg)' }} />
        </IconButton>
        Add New
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle><h3>New Asset File</h3></DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {!h.asset_id && (
                <Grid xs={12}>
                  <CustomTextField
                    label="Asset"
                    required
                    select
                    value={AssetId}
                    onChange={(e) => setAssetId(e.target.value)}
                    children={h.assets.map(a => (
                      <MenuItem value={a.id}>{a.name}</MenuItem>
                    ))}
                  />
                </Grid>
              )}
              <Grid xs={12}>
                <CustomTextField
                  label="Phase"
                  required
                  select
                  value={category}
                  onChange={(e) => setCategory(Number(e.target.value))}
                  children={filteredPhases.map(p => (
                    <MenuItem value={p.id}>{p.name}</MenuItem>
                  ))}
                />
              </Grid>
              <Grid xs={12}>
                <CustomTextField
                  label="Label / Name"
                  required
                  value={label}
                  onChange={(e) => setlabel(e.target.value)}
                />
              </Grid>
              <Grid xs={12}>
                <CustomTextField
                  label="Source"
                  required
                  value={path}
                  onChange={(e) => setpath(e.target.value)}
                />
              </Grid>
              <Grid xs={12}>
                <CustomTextField
                  label="Media Type"
                  required
                  select
                  value={media_type}
                  onChange={(e) => setmedia_type(e.target.value)}
                  children={mediaTypes.map(p => (
                    <MenuItem value={p.id}>{p.name}</MenuItem>
                  ))}
                />
              </Grid>
              <Grid xs={12}>
                <CustomTextField
                  label="Group Name"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()} variant="text">
            Cancel
          </Button>
          <Button onClick={() => onSubmit()} disabled={isLoading}>
            {isLoading && <CircularProgress size={24} className="mr-2" />}
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const CustomTextField = (props) => (
  <TextField
    variant="outlined"
    fullWidth
    size="small"
    className="mb-3"
    {...props}
  />
);

// const CustomSelectField = (props) => (
//   <>
//     {props.label && <InputLabel>{props.label} {props.required && '*'}</InputLabel>}
//     <Select
//       variant="outlined"
//       fullWidth
//       required
//       size="small"
//       className="mb-3"
//       {...props}

//     />
//   </>
// );

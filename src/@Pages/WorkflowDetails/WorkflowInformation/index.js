import React, { useState } from 'react';
import {
  TextField, InputAdornment, IconButton, Grid, Checkbox, CircularProgress,
} from '@material-ui/core';
import { Add, Done, Search as SearchIcon } from '@material-ui/icons';
import { styled, makeStyles } from '@material-ui/core/styles';

export default (h) => {
  const classes = useStyles();
  const [description, setDescription] = useState(h.workflow.description ?? '');

  const AssetList = () => (
    <div className={`${classes.assetContainer} hide-scroll`}>
      {h.assetAccessList.map(asset => (
        <div className="d-flex justify-content-between align-item-center mt-2">
          <p>{asset.name}</p>
          <CustomCheckbox
            checked={!!h.selectedAsset.includes(asset.id)}
            name={asset.name}
            onChange={h.toggleAssetAccess}
            value={asset.id}
            className="p-0"
            classes={classes}
          />
        </div>
      ))}
    </div>
  );

  return (
    <Grid xs={12} container style={{ minHeight: '10vh' }} spacing={2}>
      <Grid item xs={8}>
        <h1 className={classes.title}>Workflow Info</h1>
        <div style={{ backgroundColor: '#fff' }}>
          <TextField
            placeholder="Enter description of the workflow"
            InputProps={{ style: { fontFamily: 'CeraProRegular' } }}
            multiline
            fullWidth
            required
            rows={7}
            variant="outlined"
            defaultValue={h.workflow.description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </Grid>
      <Grid item xs={4}>
        <h1 className={classes.title}>Assigned Asset</h1>
        <SearchBox
          label="Search"
          size="small"
          variant="outlined"
          fullWidth
          value={h.searchKey}
          onChange={(e) => h.setSearchKey(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton style={{ pointerEvents: 'none' }}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {h.isLoadingAsset
          ? (
            <div className={`${classes.assetContainer} hide-scroll flex-standard`}>
              <CircularProgress size={25} style={{ margin: 'auto', color: 'var(--primary-color)' }} />
            </div>
          )
          : <AssetList />}
      </Grid>
    </Grid>
  );
};

const SearchBox = styled(TextField)(() => ({
  backgroundColor: 'white',
  borderRadius: '30px',
  '& fieldset': {
    borderRadius: '30px',
  },
  marginBottom: 5,
  '& .MuiInputLabel-outlined': {
    fontFamily: 'CeraProRegular',
  },
}));

const CustomCheckbox = ({ classes, ...props }) => (
  <Checkbox
    color="default"
    icon={<Add className={classes.icon} />}
    checkedIcon={<Done className={classes.checkedIcon} />}
    {...props}
  />
);

const useStyles = makeStyles(() => ({
  icon: {
    fontSize: 22, backgroundColor: 'var(--secondary-color)', color: 'white', borderRadius: '15%',
  },
  checkedIcon: {
    fontSize: 20, color: 'var(--secondary-color)', backgroundColor: 'white', border: '1px solid #B9B9B9', borderRadius: '15%',
  },
  assetContainer: {
    backgroundColor: '#fff', padding: 10, overflowY: 'scroll', height: '6.45rem', border: '1px solid #c4c4c4', borderRadius: 4,
  },
  title: {
    fontSize: 14, fontWeight: 'bold', color: '#8B95AB', marginBottom: 10,
  },
}));

import React from 'react';
import { Grid } from '@material-ui/core';
import CenteredLoadingContainer from '@Components/CenteredLoadingContainer';
import AssetStorage from './AssetStorage';
import Hook from './hook';
import Sidebar from './Sidebar';

export default (props) => {
  const h = Hook(props);
  return (
    h.isLoading ? <CenteredLoadingContainer height="50vh" size={75} hasText text="asset data" /> : (
      <Grid container>
        <Sidebar {...h} />
        <AssetStorage {...h} user={props.user} />
      </Grid>
    )
  );
};

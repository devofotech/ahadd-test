import React from 'react';
import { Box, Grid, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DialogCarousel from '@Components/DialogCarousel';
import ModuleList from '../ModuleList';
import CreateProfile from './CreateProfile';
import Settings from '../Settings';
import Parameter from '../Parameter';

import useHook from './hook';

export default () => {
  const h = useHook();
  const classes = useStyles();
  return (
    <div className="p2" style={{ marginInline: '7.5rem' }}>
      <Box className="d-flex py-2 justify-content-between align-items-center">
        <div className="d-flex">
          <h1 className={`${classes.title} my-auto mr-4`}>Annotation Management</h1>
        </div>
        <DialogCarousel
          title="How to Add Asset"
          name="asset_create"
        />
      </Box>
      <Grid className="mt-3" container spacing={3} style={{ height: '83vh', overflow: 'hidden' }}>
        <ModuleList isCreate {...h} />
        <Grid xs={9} item className="d-flex flex-column overflow-hidden" style={{ height: '84vh' }}>
          <CreateProfile {...h} />
          <Divider className="mb-3 mt-1" style={{ flex: '0 0 auto' }} />
          <Settings {...h} />
          <Parameter isCreate {...h} />
        </Grid>
      </Grid>
    </div>
  );
};

const useStyles = makeStyles(() => ({
  title: {
    fontWeight: 600, fontSize: 28, color: 'var(--primary-color)',
  },
}));

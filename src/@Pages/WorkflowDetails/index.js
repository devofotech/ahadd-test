import React from 'react';
import { Box, Grid, Divider } from '@material-ui/core';
import DialogCarousel from '@Components/DialogCarousel';
import WorkflowList from './WorkflowList';
import WorkflowEdit from './WorkflowInformation';
import WorkflowTask from './WorkflowTask';
import ProfileHeader from './ProfileHeader';

import useHook from './hook';

export default () => {
  const h = useHook();
  return (
    <div className="p2" style={{ marginInline: '7.5rem' }}>
      <Box className="d-flex py-2 justify-content-between align-items-center">
        <div className="d-flex">
          <h1 className="my-auto mr-4" style={titleStyle}>Analysis Management</h1>
        </div>
        <DialogCarousel
          title="How to Add Asset"
          name="asset_create"
        />
      </Box>
      <Grid className="mt-3" container spacing={3} style={{ height: '83vh', overflow: 'hidden' }}>
        <WorkflowList {...h} />
        <Grid xs={9} item className="overflow-hidden">
          <ProfileHeader {...h} />
          <Divider className="mb-2 mt-1" />
          <div className="hide-scroll" style={{ height: '110vh', overflowY: 'auto', overflowX: 'hidden' }}>
            <WorkflowEdit {...h} />
            <WorkflowTask {...h} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

const titleStyle = {
  fontWeight: 600,
  fontSize: 28,
  color: 'var(--primary-color)',
};

import React from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Grid, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AddOutlined } from '@material-ui/icons';
import DialogCarousel from '@Components/DialogCarousel';
import Button from '@Components/Button';
import ModuleList from './ModuleList';
import ProfileHeader from './ProfileHeader';
import Settings from './Settings';
import Parameter from './Parameter';

import useHook from './hook';

export default (props) => {
  const h = useHook();
  const history = useHistory();
  const classes = useStyles();
  if (h.module.is_general) history.push('/module-management');
  return (
    <div className="p2" style={{ marginInline: '7.5rem' }}>
      <Box className="d-flex py-2 justify-content-between align-items-center">
        <div className="d-flex">
          <h1 className={`${classes.title} my-auto mr-4`}>Annotation Management</h1>
        </div>
        <div className="d-flex align-items-center">
          <DialogCarousel
            title="How to Add Asset"
            name="asset_create"
          />
          <Button
            variant="contained"
            style={{ color: '#FFFFFF', backgroundColor: 'var(--primary-color)', height: '92%' }}
            onClick={() => history.push('/module-management/new')}
          >
            <AddOutlined />
            Add Module
          </Button>
        </div>
      </Box>
      <Grid className="mt-3" container spacing={3} style={{ height: '83vh', overflow: 'hidden' }}>
        <ModuleList {...h} />
        <Grid xs={9} item className="d-flex flex-column overflow-hidden" style={{ height: '84vh' }}>
          <ProfileHeader {...h} />
          <Divider className="mb-3 mt-1" style={{ flex: '0 0 auto' }} />
          <Settings {...h} />
          <Parameter {...h} />
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

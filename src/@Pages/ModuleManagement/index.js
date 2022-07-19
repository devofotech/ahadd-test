import React from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AddOutlined } from '@material-ui/icons';
import DialogCarousel from '@Components/DialogCarousel';
import Button from '@Components/Button';
import Card from '@Components/CustomCard3';
import CenteredLoadingContainer from '@Components/CenteredLoadingContainer';
import ModuleData from './ModuleData';

import useHook from './hook';

export default () => {
  const h = useHook();
  const history = useHistory();
  const classes = useStyles();
  return (
    <div className="p2" style={{ marginInline: '7.5rem' }}>
      <Box className="d-flex py-2 justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <h1 className={`${classes.title} my-auto mr-4`}>Annotation Management</h1>
        </div>
        <div className="d-flex align-items-center" style={{ gap: 15 }}>
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="color-text-primary" style={{ fontSize: 14 }}>
            Learn More
          </a>
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
      {h.isLoading ? <CenteredLoadingContainer height="50vh" size={75} hasText text="modules" /> : (
        <Box className="py-3">
          <div style={{ padding: 2, paddingTop: 15 }}>
            <Grid container spacing={3}>
              {h.modules.filter(f => !f.is_general).map(data => (
                <Card
                  extraGrid
                  isToTheSide={3}
                  children={(
                    <ModuleData
                      data={data}
                      selectedParameter={h.parameterList[data.id]}
                      {...h}
                    />
                  )}
                  adjustStyle={{ height: '29rem' }}
                />
              ))}
            </Grid>
          </div>
        </Box>
      )}
    </div>
  );
};

const useStyles = makeStyles(() => ({
  title: {
    fontWeight: 600, fontSize: 28, color: 'var(--primary-color)',
  },
}));

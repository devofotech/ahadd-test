import React from 'react';
import { Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchBox from '@Components/SearchBox';
import Card from '@Components/CustomCard3';
import OrganizationCard from './OrganizationCard';

import useHook from './hook';

export default () => {
  const h = useHook();
  const classes = useStyles();
  return (
    <div className="p2" style={{ marginInline: '7.5rem' }}>
      <Box className="d-flex py-2 justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <h1 className={`${classes.title} my-auto mr-4`}>Organization Analytics</h1>
        </div>
        <SearchBox onChange={(e) => h.handleSearch(e)} />
      </Box>
      <Box className="py-3">
        <div style={{ padding: 2, paddingTop: 15 }}>
          <Grid container spacing={3}>
            {h.organizations.map(data => (
              <Card
                extraGrid
                isToTheSide={3}
                children={(
                  <OrganizationCard
                    data={data}
                    {...h}
                  />
                )}
                adjustStyle={{ height: '18rem', width: '16rem' }}
              />
            ))}
          </Grid>
        </div>
      </Box>
    </div>
  );
};

const useStyles = makeStyles(() => ({
  title: {
    fontWeight: 600, fontSize: 28, color: 'var(--primary-color)',
  },
}));

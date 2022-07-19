import React from 'react';
import { Grid } from '@material-ui/core';
import Card from '@Components/CustomCard3';
import CenteredLoadingContainer from '@Components/CenteredLoadingContainer';
import CreateTeam from './CreateTeam';
import ExistingTeam from './ExistingTeam';

import useHook from './hook';

const height = '22rem';

export default () => {
  const h = useHook();
  return (
    <div style={{ padding: 2, paddingTop: 15 }}>
      {h.isLoading ? <CenteredLoadingContainer height="50vh" size={75} hasText text="teams" /> : (
        <Grid container spacing={3}>
          <Card isCreate adjustStyle={{ height }} children={<CreateTeam user={h.user} {...h} />} />
          {!!h.teams?.length && h.teams.map((m, i) => (
            <Card adjustStyle={{ height }} children={<ExistingTeam index={i} user={h.user} {...m} {...h} />} />
          ))}
        </Grid>
      )}
    </div>
  );
};

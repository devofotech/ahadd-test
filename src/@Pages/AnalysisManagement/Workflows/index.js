import React from 'react';
import { Grid } from '@material-ui/core';
import Card from '@Components/CustomCard3';
import CenteredLoadingContainer from '@Components/CenteredLoadingContainer';
import CreateWorkflow from './CreateWorkflow';
import ExistingWorkflow from './ExistingWorkflow';
import useHook from './hook';

export default () => {
  const h = useHook();
  return (
    <div style={{ padding: 2, paddingTop: 15 }}>
      {h.isLoading ? <CenteredLoadingContainer height="50vh" size={75} hasText text="workflows" /> : (
        <Grid container spacing={3}>
          <Card isCreate extraGrid isToTheSide={3} children={<CreateWorkflow onCreate={h.createWorkflow} />} />
          {!!h.workflows.length && h.workflows.map((wf) => <Card extraGrid isToTheSide={3} children={<ExistingWorkflow data={wf} />} />)}
        </Grid>
      )}
    </div>
  );
};

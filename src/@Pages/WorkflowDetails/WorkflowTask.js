/* eslint-disable object-curly-newline */
import React from 'react';
import { Grid } from '@material-ui/core';
import TeamAssign from './TeamAssign';
import TeamWorkflow from './TeamWorkflow';

export default (props) => {
  return (
    <Grid xs={12} item className="mt-3" style={{ height: '100%' }}>
      <TeamWorkflow roleType={props.issues} {...props} />
      <TeamAssign roleType={props.issues} {...props} />
    </Grid>
  );
};

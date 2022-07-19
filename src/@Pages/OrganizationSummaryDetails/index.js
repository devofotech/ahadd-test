import MainContentNavbar from '@Components/MainContentNavbar';
import { Grid } from '@material-ui/core';
import React from 'react';
import Details from './Details';
import Sidebar from './Sidebar';
import useHook from './hook';

export default function OrganizationSummaryDetails() {
  const h = useHook();
  return (
    <div className="w-75 mx-auto">
      <MainContentNavbar to="/organization-summary" text={h.organization_detail?.name} />
      <Grid className="mt-3" container spacing={1} style={{ overflow: 'hidden' }}>
        <Sidebar {...h} />
        <Details {...h} />
      </Grid>
    </div>
  );
}

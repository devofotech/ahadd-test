import React from 'react';
import { Box, Grid } from '@material-ui/core';
import MainContentNavbar from '@Components/MainContentNavbar';
import MainContentContainer from '@Components/MainContentContainer';
import useHook from './hook';

import IssueStatusDisplay from './IssueStatusDisplay';
import IssueStatusEdit from './IssueStatusEdit';

export default (props) => {
  const h = useHook(props);
  return (
    <MainContentContainer style={{ minHeight: '90vh' }}>
      {!h.selectedAssetType
        ? (<MainContentNavbar to="/asset" text="Inspection Status Level" />)
        : (
          <div onClick={() => h.setSelectedAssetType()}>
            <MainContentNavbar to="/issue-status-level" text="Inspection Status Level" />
          </div>
        )}
      <Box className="d-flex justify-content-center">
        <Grid xs={12} sm={11}>
          {!h.selectedAssetType
            ? (<IssueStatusDisplay {...h} />)
            : (<IssueStatusEdit {...h} />)}
        </Grid>
      </Box>
    </MainContentContainer>
  );
};

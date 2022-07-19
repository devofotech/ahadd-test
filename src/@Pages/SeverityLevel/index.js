import React from 'react';
import { Box, Grid } from '@material-ui/core';
import MainContentNavbar from '@Components/MainContentNavbar';
import MainContentContainer from '@Components/MainContentContainer';
import useHook from './hook';

import SeverityDisplay from './SeverityDisplay';
import SeverityEdit from './SeverityEdit';

export default (props) => {
  const h = useHook(props);
  return (
    <MainContentContainer style={{ minHeight: '90vh' }}>
      {!h.selectedAssetType
        ? (<MainContentNavbar to="/asset" text="Asset Severity Level" />)
        : (
          <div onClick={() => h.setSelectedAssetType()}>
            <MainContentNavbar to="/severity-level" text="General Severity Level" />
          </div>
        )}
      <Box className="d-flex justify-content-center">
        <Grid xs={12} sm={11}>
          {!h.selectedAssetType
            ? (<SeverityDisplay {...h} />)
            : (<SeverityEdit {...h} />)}
        </Grid>
      </Box>
    </MainContentContainer>
  );
};

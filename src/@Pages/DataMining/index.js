import Navbar from '@Components/Navbar';
import { Grid } from '@material-ui/core';
import SideBar from '@Pages/Inspection/SideBar';
import Hook from '@Pages/DataMining/hooks';
import React from 'react';
import { useParams } from 'react-router-dom';
import DataSetSummary from './DataSetSummary';
import WordCloud from './WordCloud';
import DataMiningGraph from './DataMiningGraph';

export default (props) => {
  const { inspection_session } = useParams();
  const h = Hook({ ...props, InspectionId: inspection_session });
  return (
    <>
      <Navbar
        to="/project/data-mining/"
        text="DATA MINING"
      />
      <Grid container item xs={12} spacing={0}>
        <Grid item md={12} lg={3}>
          <SideBar {...h} />
        </Grid>
        <Grid item md={12} lg={9} spacing={0} direction="column">
          <Grid container direction="row">
            <Grid md={9} lg={8}>
              <DataSetSummary {...h} />
            </Grid>
            <Grid md={3} lg={4}>
              <WordCloud {...h} />
            </Grid>
          </Grid>
          <Grid item md={12} lg={12}>
            <DataMiningGraph {...h} />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

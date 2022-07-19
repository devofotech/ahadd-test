import React from 'react';
import { Grid } from '@material-ui/core';
import SingleBarGraph from '@Components/BarChart/SingleBarChart';

export default function DataMiningGraph({ graphData }) {
  return (
    <Grid item md={12} lg={12} style={{ height: '100%' }}>
      <Grid container spacing={3} style={{ height: '100%' }}>
        <Grid item xs={12}>
          <div className="paper" style={{ padding: '10px', margin: '10px', border: '1px solid var(--primary-color)' }}>
            <Grid item xs={12}>
              <SingleBarGraph data={graphData} label="Total" height={535} />
            </Grid>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
}

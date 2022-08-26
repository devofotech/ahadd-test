/* eslint-disable complexity */
import { Grid } from '@material-ui/core';
import _ from 'lodash';

export default (h) => {
  return (
    <>
      {/* <h3 className="text-dark my-4">Asset Summary</h3> */}
      <Grid
        container
        className="pl-5 pt-3 position-relative color-gradient-inline"
        style={{ borderTopRightRadius: 10, borderBottomRightRadius: 10, height: '60vh' }}>
        <Grid item xs={12}>
          <Grid xs={12}><CustomLabelDataField title="ASSET ID" value={h.name} /></Grid>
          <Grid xs={12}><CustomLabelDataField title="NETWORK" value={h.network.label} /></Grid>
          <Grid xs={12}><CustomLabelDataField title="REGION" value={h.region.label} /></Grid>
          <Grid xs={12}><CustomLabelDataField title="SECTION" value={h.section.label} /></Grid>
          <Grid xs={12}><CustomLabelDataField title="RANKING" value={h.ranking.label} /></Grid>
        </Grid>
      </Grid>
    </>
  );
};

const CustomLabelDataField = ({ title, value }) => (
  <>
    <p className="text-white my-2" style={{ fontSize: 14 }}>{title}</p>
    <p className="mt-2 mb-3 text-capitalize font-weight-bold text-white mr-2" style={{ fontSize: 16 }}>{value || '-'}</p>
  </>
);


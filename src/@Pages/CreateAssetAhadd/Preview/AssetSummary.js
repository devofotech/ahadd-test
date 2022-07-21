/* eslint-disable complexity */
import { Grid, Chip, makeStyles } from '@material-ui/core';
import _ from 'lodash';

export default (h) => {
  const classes = useStyles();
  const selectedModule = _.filter(h.moduleOption, { value: true });
  const selectedPhase = _.filter(h.assetPhaseList, { value: true });

  return (
    <>
      {/* <h3 className="text-dark my-4">Asset Summary</h3> */}
      <Grid container className="pl-5 pt-3 position-relative" style={{ borderRadius: 10, height: '60vh' }}>
        <Grid item xs={12}>
          <Grid xs={12}><CustomLabelDataField title="ASSET ID" value={h.name} /></Grid>
          <Grid xs={12}><CustomLabelDataField title="NETWORK" value={h.assetTag} /></Grid>
          <Grid xs={12}><CustomLabelDataField title="REGION" value={h.location} /></Grid>
          <Grid xs={12}><CustomLabelDataField title="SECTION" value={h.state} /></Grid>
          <Grid xs={12}><CustomLabelDataField title="RANKING" value={h.selectedTypeProfile.name} /></Grid>
        </Grid>
      </Grid>
    </>
  );
};

const CustomLabelDataField = ({
  title, value
}) => (
  <>
    <p className="text-white my-2" style={{ fontSize: 14 }}>{title}</p>
    <p className="mt-2 mb-3 text-capitalize font-weight-bold text-white" style={{ fontSize: 16 }}>{value || '-'}</p>
  </>
);

const useStyles = makeStyles({
  root: {
    backgroundColor: 'var(--primary-color)',
    textWeight: 600,
    color: 'white',
  },
});

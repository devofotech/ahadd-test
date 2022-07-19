import { Grid } from '@material-ui/core';
import Compliance from './Compliance';
import QualityDashboard from './QualityDashboard';
import ContractorDialog from './ContractorDialog';
import Hook from './hook';

export default function content() {
  const h = Hook('quality');
  return (
    <>
      <ContractorDialog open={h.openContractorDialog} setOpen={h.setOpenContractorDialog} />
      <Grid container>
        <Grid container item xs={12} spacing={3}>
          <Grid item xs={9}>
            <QualityDashboard navbar={false} h={h} />
          </Grid>
          <Grid item xs={3}>
            {/* later for project ahead
            <Compliance
              data={h.qlassicBySite}
              title={['Sites with progress ahead', 'Sites with progress delayed']}
            /> */}
            <Compliance
              data={h.qlassicBySite}
              title={['Sites with highest compliance', 'Sites with highest non-compliance']}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

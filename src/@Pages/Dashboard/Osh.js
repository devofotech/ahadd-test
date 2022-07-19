import { Grid } from '@material-ui/core';
import Osh from '@Pages/OSH';
import Compliance from './Compliance';
import Hook from './hook';

export default function content() {
  const h = Hook('osh');
  return (
    <>
      <Grid container>
        <Grid container item xs={12} spacing={3}>
          <Grid item xs={9}>
            <Osh navbar={false} />
          </Grid>
          <Grid item xs={3}>
            <Compliance
              data={h.compliancesBySite}
              title={['Sites with highest compliance', 'Sites with highest non-compliance']}
            />
            <Compliance
              data={h.compliancesByCategory}
              title={['Highest compliance category', 'Highest non-compliance category']}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

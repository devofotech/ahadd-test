import { Grid } from '@material-ui/core';
import HighlightTabs from '@Components/HighlightTabs';
import useHook from './hook';
import Sidebar from './Sidebar';
import Summary from './Summary';
import StorageAlert from './StorageAlert';

export default (props) => {
  const h = useHook(props);
  return (
    <div className="p2" style={{ marginInline: '7.5rem' }}>
      <div className="d-flex justify-content-between mb-2">
        <h1 className="pt-2" style={{ fontWeight: 600, fontSize: 28, color: 'var(--primary-color)' }}>
          Storage Monitoring
        </h1>
        <HighlightTabs items={h.tabslist} tab={h.storageMonitoringTab} setTab={h.setStorageMonitoringTab} />
      </div>
      <Grid container spacing={2}>
        <Sidebar {...h} />
        <Grid item xs={9}>
          {{
            0: <Summary {...h} />,
            1: <StorageAlert {...h} organizationId={props.user?.OrganizationId} />,
          }[h.storageMonitoringTab]}
        </Grid>
      </Grid>
    </div>
  );
};

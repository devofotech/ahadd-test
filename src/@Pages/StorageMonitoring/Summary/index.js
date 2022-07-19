import AreaChart from '@Components/AreaChart/v1';
import HighlightTabs from '@Components/HighlightTabs';
import MultilineChart from '@Components/MultilineChart/v3';
import { CircularProgress, IconButton } from '@material-ui/core';
import { Refresh } from '@material-ui/icons';
import _ from 'lodash';

export default (h) => {
  return (
    <>
      <div className="paper-shadow bg-white rounded px-4 py-2 mb-3">
        <div className="d-flex justify-content-between align-items-center" style={{ padding: 20 }}>
          <h3>Summary of Storage Usage</h3>
          <div className="d-flex justify-content-between align-items-center">
            <IconButton aria-label="delete">
              <Refresh onClick={() => h.setIsRefresh(prev => prev + 1)} />
            </IconButton>
            <HighlightTabs
              items={h.storageMonitorGraphTabList}
              tab={h.storageUsageGraphTab}
              setTab={h.setStorageUsageGraphTab}
            />
          </div>
        </div>
        <div className="flex-standard my-5 mx-5">
          {(h.isLoading || _.isEmpty(h.storageUsageData))
            ? <CircularProgress size={100} style={{ color: 'var(--primary-color)' }} />
            : <AreaChart {...h} />}
        </div>
      </div>
      <div className="paper-shadow bg-white rounded px-4 py-2 my-2" style={{ paddingBottom: '0.5rem !important' }}>
        <div className="d-flex justify-content-between align-items-center" style={{ padding: 20 }}>
          <h3>Summary of Data Count</h3>
          <div className="d-flex justify-content-between align-items-center">
            <IconButton aria-label="delete">
              <Refresh onClick={() => h.setIsRefresh(prev => prev + 1)} />
            </IconButton>
            <HighlightTabs
              items={h.storageMonitorGraphTabList}
              tab={h.dataCountGraphTab}
              setTab={h.setDataCountGraphTab}
            />
          </div>
        </div>
        <div className="flex-standard my-5 mx-5">
          {(h.isLoading || _.isEmpty(h.dataCountData))
            ? <CircularProgress size={100} style={{ color: 'var(--primary-color)' }} />
            : <MultilineChart {...h} />}
        </div>
      </div>
    </>
  );
};

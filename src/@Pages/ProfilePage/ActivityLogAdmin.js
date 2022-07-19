import {
  CircularProgress, Grid, Paper, Divider,
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import Api, { endpoints } from '@Helpers/api';
import InfiniteScroll from 'react-infinite-scroller';
import _, { capitalize } from 'lodash';
import ActivityLogCard from '@Components/ActivityLogCard';
import moment from 'moment';
import { KeyboardArrowLeft } from '@material-ui/icons';

export default (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [activityLog, setActivityLog] = useState({});

  const loadMore = () => {
    if (isLoading) return;
    setIsLoading(true);
    Api({
      endpoint: activityLog.nextpage ? ['GET', activityLog.nextpage] : endpoints.activityLog(),
      onSuccess: (response) => {
        if (activityLog.data) {
          const prev_data = [...activityLog.data];
          const prev_data_ids = prev_data.map((id) => id);
          const filtered_response_data = response.data.filter(f => !prev_data_ids.includes(f.id));
          setActivityLog({ ...response, data: [...prev_data, ...filtered_response_data] });
          setIsLoading(false);
          return;
        }
        setActivityLog(response);
        setIsLoading(false);
      },
      onFail: () => setIsLoading(false),
    });
  };

  const reloadActivityLog = () => {
    if (isLoading) return;
    setIsLoading(true);
    Api({
      endpoint: endpoints.activityLog(),
      onSuccess: (response) => {
        setActivityLog(response);
        setIsLoading(false);
      },
      onFail: () => setIsLoading(false),
    });
  };

  useEffect(() => {
    reloadActivityLog();
  }, [props.h.isLogUpdated]);

  const groupByDate = _.groupBy(activityLog?.data, x => moment(x.createdAt).format('MMMM DD, YYYY'));
  return (
    <Grid item xs={12} md={9}>
      <div className="d-flex align-items-center">
        <KeyboardArrowLeft
          style={{ fontSize: 30, padding: '6px 1px', borderRadius: 10 }}
          className="pointer bg-color-primary text-white"
          onClick={() => props.h.setActivePage(0)}
        />
        <h1 className="ml-2" style={{ fontWeight: 600, fontSize: 28, color: 'var(--primary-color)' }}>
          Activity Log (Admin)
        </h1>
      </div>
      <div className="w-100">
        <InfiniteScroll
          loadMore={loadMore}
          hasMore={!!activityLog.nextpage}
          loader={(
            <Grid container justify="center">
              <CircularProgress size={25} />
            </Grid>
          )}
          useWindow={false}
        >
          {!isLoading && Object.keys(groupByDate).map(date => (
            <Paper className="p-4 mt-3">
              <div className="h-100 w-100 justify-content-around">
                <h3 className="color-secondary">{capitalize(date)}</h3>
                {groupByDate[date].map((logData, idx) => (
                  <>
                    <ActivityLogCard {...logData} />
                    {(groupByDate[date].length - 1 !== idx) && <Divider />}
                  </>
                ))}
              </div>
            </Paper>
          ))}
        </InfiniteScroll>
      </div>
    </Grid>
  );
};

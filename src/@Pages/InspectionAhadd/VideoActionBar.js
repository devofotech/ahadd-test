import React from 'react';
import { Typography, Paper, makeStyles } from '@material-ui/core';
import { capitalize, spaceAfterUppercase } from '@Helpers';
import moment from 'moment';

const useStyles = makeStyles(() => ({
  metadata: { color: 'black' },
}));

export default function VideoActionBar(h) {
  const classes = useStyles();
  const metadata = h.mainVideo.metadata ? JSON.parse(h.mainVideo.metadata) : {};
  const MediaHeader = () => (
    <Typography gutterBottom style={{ display: 'flex', marginTop: 10 }}>
      <div style={{ flex: 5 }}>
        <h3>Video Info {h.isDeveloper && `(${h.mainVideo.id})`} &nbsp;</h3>
      </div>
    </Typography>
  );
  const reformatDate = (date) => {
    const splitDate = date?.split(' ');
    const newDate = splitDate[0].replace(/:/g, '/');
    return `${newDate} ${splitDate[1]}`;
  };
  return (
    <div className="paper shadow overflow-auto hide-scroll h-100 px-3" style={{ backgroundColor: 'var(--container-color)' }}>
      <MediaHeader />
      <Paper className="mt-3 p-3">
        {Object.keys(metadata).length === 0 ? <p>No data available for this video</p> : Object.keys(metadata).map(data => (
          <div className="d-flex">
            <p>{data === 'createdDate' ? capitalize(spaceAfterUppercase(data).toLowerCase()) : capitalize(data.toLowerCase())}: </p>
            <p className={classes.metadata}>
              &nbsp;
              {{
                dimensions: `${metadata.dimensions[0]} x ${metadata.dimensions[1]} px`,
                duration: metadata.duration > 120 ? `${(metadata.duration / 60).toFixed(2)} minutes` : `${metadata.duration} seconds`,
                frameRate: `${(metadata.frameRate).toFixed(1)} fps`,
                createdDate: moment(reformatDate(metadata.createdDate)).format('DD/MM/YYYY hh:mm A'),
              }[data] ?? metadata[data]}
            </p>
          </div>
        ))}
      </Paper>
    </div>
  );
}

import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import Button from '@Components/Button';
import { Link } from 'react-router-dom';
import { formatBytes } from '@Helpers';

export default ({ data, assetType }) => {
  const project_img = `${process.env.REACT_APP_S3}/${data.image ?? 'static/media/defaultAssetImg-01.png'}`;
  return (
    <Grid container xs={12} className="paper-shadow mb-3" style={{ backgroundColor: '#fff', minHeight: '12rem' }}>
      <Grid item xs={5}><img src={project_img} alt={data.name} width={250} height="100%" /></Grid>
      <Grid container item xs={7} className="p-3 w-100 bg-white">
        <div className="bg-white w-75">
          <Typography variant="h6" gutterBottom>{data.name}</Typography>
          <br />
          <TextLight>{data.location}, {data.state}</TextLight>
          <TextLight>{assetType}</TextLight>
        </div>
        <div className="w-25 d-flex justify-content-between align-items-end" style={{ flexDirection: 'column' }}>
          <p className="font-weight-bold">{formatBytes(data.asset_size, true, 2)}</p>
          <Link to={`/asset/${data?.id}`}>
            <Button size="small"><p className="text-white">View</p></Button>
          </Link>
        </div>
      </Grid>
    </Grid>
  );
};

const TextLight = (props) => (
  <Typography className="text-light" variant="body1" gutterBottom {...props}>{props.children}</Typography>
);

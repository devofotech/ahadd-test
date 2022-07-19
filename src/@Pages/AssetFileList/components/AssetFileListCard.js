import React from 'react';
import { Link } from 'react-router-dom';
import {
  Chip, Card, CardContent, IconButton, Grid,
  makeStyles, FormControlLabel, Switch, Tooltip,
} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { GetApp, Launch } from '@material-ui/icons';
import moment from 'moment';
import AssetFileUpdate from './AssetFileUpdate';
import DeleteAssetFile from './DeleteAssetFileDialog';

export default ({ file, getAssetFile, switchChange }) => {
  const classes = useStyles();

  const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  ))(({ theme }) => ({
    width: 36,
    height: 20,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#04847C',
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color:
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 16,
      height: 16,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === 'light' ? 'grey' : 'lightgrey',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  }));
  return (
    <Card className="bg-white" variant="outlined">
      <CardContent className="py-0">
        <Grid container>
          {[
            { xs: 1, children: <p style={{ fontSize: 14 }}>{file?.id}</p> },
            { xs: 1, children: <p style={{ fontSize: 14 }}>{file?.Asset.name}</p> },
            { xs: 2, children: <p style={{ fontSize: 14 }}>{file?.label}</p> },
            { xs: 2, children: <p style={{ fontSize: 14 }}>{file?.name}</p> },
            { xs: 1, children: file?.type ? <Chip size="small" className={classes.root} label={file?.type} /> : null },
            { xs: 1, children: file?.media_type ? <Chip size="small" className={classes.root} label={file?.media_type === '3d' ? "3D Mesh" : file?.media_type} /> : null },
            { xs: 1, children: <p style={{ fontSize: 14, textAlign: 'center', width: 'inherit' }}>{moment(file?.createdAt).format('DD MMMM YYYY')}</p> },
            { xs: 2, children: <ButtonList file={file} refresh={getAssetFile} /> },
            // { xs: 1, children: <DownloadFile {...file} /> },
            {
              xs: 1,
              children: <p
                style={{ fontSize: 14, textAlign: 'center', width: 'inherit' }}
                children={file?.path && !['extracting', 'pending_conversion'].includes(file?.status) ? (
                  <FormControlLabel
                    style={{ padding: '0px', margin: '0px', height: '100%' }}
                    control={<IOSSwitch checked={!!file.is_show} inputProps={{ 'data-id': file.id }} onChange={switchChange} />}
                  />
                ) : file?.status}
              />,
            },
          ].map(e => <Grid container {...e} className={!!e.className ? e.className : 'd-flex align-items-center'} />)}
        </Grid>

      </CardContent>
    </Card>
  );
};

const DownloadFile = (assetfile) => {
  return (
    <Tooltip title="Download">
      { !!assetfile.raw_path
        ? (
          <Link to={{ pathname: `${assetfile.raw_path}` }} target="_blank">
            <IconButton>
              <GetApp style={{ color: 'var(--secondary-color)' }} />
            </IconButton>
          </Link>
        )
        : (
          <IconButton disabled>
            <GetApp />
          </IconButton>
        )}
    </Tooltip>
  );
};

const OpenExternal = (assetfile) => {
  return (
    <Tooltip title="Open File">
      {['3d', '360-models', 'point-clouds', 'potree'].includes(assetfile.media_type)
        ? (
          <Link to={{ pathname: `${assetfile.path}` }} target="_blank">
            <IconButton>
              <Launch style={{ color: 'var(--secondary-color)' }} />
            </IconButton>
          </Link>
        )
        : (
          <IconButton disabled>
            <Launch />
          </IconButton>
        )}
    </Tooltip>
  );
};

const ButtonList = ({ file, refresh }) => {
  return (
    <div style={{ fontSize: 14, textAlign: 'center', width: 'inherit' }}>
      <AssetFileUpdate file={file} refresh={refresh} />
      <DeleteAssetFile file={file} refresh={refresh} />
      <DownloadFile {...file} />
      <OpenExternal {...file} />
    </div>
  );
};

const useStyles = makeStyles({
  root: {
    backgroundColor: 'var(--secondary-color)',
    textWeight: 600,
    color: 'white',
    padding: 1,
  },
  textLabel: {
    fontWeight: 600, fontSize: '0.8em', color: 'var(--tertiary-color)', cursor: 'pointer',
  },
  textData: { fontWeight: 800, fontSize: 14, color: 'var(--primary-color)' },
});

/* eslint-disable max-lines */
import React, { useState } from 'react';
import MUIDataTable from 'mui-datatables';
import {
  createMuiTheme, MuiThemeProvider, makeStyles, styled,
} from '@material-ui/core/styles';
import {
  Typography, Avatar, Tooltip, Card, CardMedia, CardActionArea, IconButton,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { Link } from 'react-router-dom';
import moment from 'moment';
import NoData from '@Assets/Images/Data-not-found4.svg';
import { ViewIcon, EditIcon } from '@Assets/Icons';

const useStyles = makeStyles({
  root: { maxWidth: '100%', margin: '0 2px', minHeight: '100%' },
  media: { height: '5vh', width: '5vw' },
  title: {
    fontWeight: 'bold', fontSize: 16, marginLeft: 10, marginTop: 5,
  },
  content: { color: '#707070', fontSize: 12 },
});

const options = {
  filter: false,
  search: false,
  print: false,
  download: false,
  viewColumns: false,
  responsive: 'standard',
  selectableRows: 'none',
  sort: false,
  elevation: 0,
  textLabels: {
    body: {
      noMatch: <img src={NoData} style={{ height: '70vh' }} />,
    },
  },
};

const columns = [
  {
    name: 'Asset Name',
    selector: 'name',
    align: 'left',
  },
  {
    name: 'Location',
    selector: 'location',
    align: 'left',
  },
  {
    name: 'Last Update',
    selector: 'lastUpdate',
    align: 'right',
  },
  {
    name: 'Access',
    selector: 'access',
    options: {
      setCellHeaderProps: (value) => ({ align: 'center' }),
      setCellProps: (value) => ({ align: 'center' }),
    },
  },
  {
    name: 'Actions',
    selector: 'actions',
    options: {
      setCellHeaderProps: (value) => ({ align: 'center' }),
      setCellProps: (value) => ({ align: 'center' }),
    },
  },
];

export default (props) => {
  const classes = useStyles();
  const [onAvatarHover, setOnAvatarHover] = useState({});

  const AssetLocationContent = (x) => {
    return (
      <Typography component="p" className={classes.content}>
        {`${x?.location}, ${x?.state}`}
      </Typography>
    );
  };
  const AssetLastUpdate = (x) => {
    return (
      <Typography component="p" className={classes.content}>
        {`Last Update on ${moment(x?.updatedAt).format('D MMMM YYYY, hh:mm A')}`}
      </Typography>
    );
  };
  const AssetActions = (x) => {
    return (
      <div className="d-flex align-items-center justify-content-center">
        <Link to={`/project?id=${x?.id}`}>
          <Tooltip title="View Asset in Map View">
            <IconButton>
              <ViewIcon height="24px" width="24px" />
            </IconButton>
          </Tooltip>
        </Link>
        <Link to={`/asset/${x?.id}`}>
          <Tooltip title="Edit Asset Detail">
            <IconButton>
              <EditIcon height="18px" width="18px" />
            </IconButton>
          </Tooltip>
        </Link>
        <Tooltip title="Delete Asset">
          <IconButton>
            <Delete style={{ color: 'red' }} onClick={() => { props.setSelectedAsset(x); props.setOpen(true); }} />
          </IconButton>
        </Tooltip>
      </div>
    );
  };

  const AssetNameContent = (x) => {
    return (
      <div className="d-flex align-items-center">
        <Card>
          <CardActionArea>
            <Link to={`/project?id=${x?.id}`}>
              <CardMedia className={classes.media} image={`${process.env.REACT_APP_S3}/${x.image ?? 'static/media/defaultAssetImg-01.png'}`} />
            </Link>
          </CardActionArea>
        </Card>
        <Typography gutterBottom className={classes.title}>{x?.name}</Typography>
      </div>
    );
  };
  const AssetAccess = (x) => {
    const assetWorkflowAccess = x.AssetAccesses.filter(acc => !!acc.Workflow).map(acc => ({ ...acc.Workflow, type: 'Workflow' }));
    const assetTeamAccess = x.AssetAccesses.filter(acc => !!acc.Team).map(acc => ({ ...acc.Team, type: 'Team' }));
    const assetUserAccess = x.AssetAccesses.filter(acc => !!acc.User).map(acc => acc.User);
    return (
      <div
        onClick={() => (
          props.setOpenRelative(true),
          props.setSelectedAsset(props.tableData),
          props.setWorkflowAccess(assetWorkflowAccess),
          props.setUserAccess(assetUserAccess),
          props.setTeamAccess(assetTeamAccess)
        )}
        className="d-flex justify-content-center"
      >
        <AvatarGroupIcon max={3}>
          {[...assetWorkflowAccess, ...assetTeamAccess, ...assetUserAccess]?.map((u, index) => (
            <Tooltip title={u.name}>
              <Avatar
                // onMouseEnter={() => setOnAvatarHover({ [index]: !onAvatarHover[index] })}
                // onMouseLeave={() => setOnAvatarHover({ [index]: !!onAvatarHover[index] })}
                style={{
                  backgroundColor: u.type === 'Team' ? `#${u.colour}` : u.type === 'Workflow' ? u.colour : '#506288',
                  borderRadius: u.type === 'Workflow' && '8px',
                  zIndex: onAvatarHover[index] ? 999 : !index ? 10 : 1,
                }}
                alt={u.name}
                src={`${process.env.REACT_APP_S3}/${u?.image}`}
              />
            </Tooltip>
          ))}
        </AvatarGroupIcon>
      </div>
    );
  };

  return (
    <>
      <MuiThemeProvider theme={getMuiTheme()}>
        <MUIDataTable
          options={options}
          columns={columns.map((col) => ({ ...col, label: col.name, name: col.selector }))}
          data={props.tableData.map((x) => {
            return ({
              ...x,
              name: <AssetNameContent {...x} />,
              location: <AssetLocationContent {...x} />,
              lastUpdate: <AssetLastUpdate {...x} />,
              access: <AssetAccess {...x} />,
              actions: <AssetActions {...x} />,
            });
          })}
        />
      </MuiThemeProvider>
    </>
  );
};

const AvatarGroupIcon = styled(AvatarGroup)({
  '& .MuiAvatar-root': {
    height: '22px',
    width: '22px',
    fontSize: 12,
    backgroundColor: '#506288',
    '&:hover': {
      zIndex: '999 !important',
    },
  },
});

const getMuiTheme = () => createMuiTheme({
  typography: {
    fontFamily: 'CeraProRegular',
  },
  overrides: {
    MuiTableHead: {
      root: {
        '& .MuiTableCell-root': {
          color: 'gray',
          fontSize: '13px',
          fontWeight: 500,
          textTransform: 'uppercase',
        },
      },
    },
    MuiTableRow: {
      root: {
        color: '#048279',
      },
    },
    MuiTableCell: {
      body: {
        color: 'var(--primary-color) !important',
        fontSize: 14,
        fontWeight: '400px',
      },
    },
    MuiChip: {
      root: {
        backgroundColor: '#03A69A',
        color: 'white',
      },
      deleteIcon: {
        backgroundColor: '#03A69A',
        color: 'white',
      },
    },
  },
});

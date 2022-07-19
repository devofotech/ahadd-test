/* eslint-disable complexity */
import React from 'react';
import MUIDataTable from 'mui-datatables';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Button, Chip } from '@material-ui/core';
import PublishIcon from '@material-ui/icons/Publish';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { GetApp } from '@material-ui/icons';

const options = {
  filter: true,
  filterType: 'dropdown',
  print: false,
  download: false,
  responsive: 'standard',
  selectableRows: 'none',
  sort: false,
  elevation: 0,
};

const activeButtonStyle = {
  color: 'var(--primary-color)',
  border: '1px solid var(--primary-color)',
  background: 'transparent',
  height: '1.8rem',
};

const chipStyle = {
  backgroundColor: 'var(--secondary-color)', textWeight: 600, color: 'white', padding: 1,
};

export default (props) => {
  const UploadFile = (x) => (
    <Button
      onClick={() => { props.setOpenDialog(x); }}
      style={{ ...activeButtonStyle, color: 'white', background: 'var(--primary-color)' }}
    >
      <PublishIcon style={{ paddingTop: 1, width: '18%' }} />
      <span style={{ fontSize: 12, textTransform: 'capitalize' }} children="&nbsp;Upload" />
    </Button>
  );

  const DownloadFile = ({ raw_path }) => {
    if (!raw_path) return null;
    return (
      <Link to={{ pathname: `${raw_path}` }} target="_blank">
        <Button style={activeButtonStyle}>
          <GetApp style={{ paddingTop: 1, width: '15%' }} />
          <span style={{ fontSize: 12, textTransform: 'capitalize' }} children="&nbsp;Download" />
        </Button>
      </Link>
    );
  };

  return (
    <>
      <MuiThemeProvider theme={getMuiTheme()}>
        <MUIDataTable
          options={options}
          columns={props.columns.map((col) => ({ ...col, label: col.name, name: col.selector }))}
          data={props.tableData.map((x) => {
            const statusTable = {
              pending_conversion: 'Pending Conversion',
              analyzing: 'Analyzing',
              extracting: 'Extracting',
              ready: 'Ready',
            };
            const actions = {
              pending_conversion: <UploadFile {...x} />,
              analyzing: 'Analyzing',
              extracting: 'Extracting',
              ready: <UploadFile {...x} />,
            };
            return ({
              ...x,
              asset_name: x.Asset?.name || x?.AssetId,
              label: x.label ? x.label : null,
              layer_group: x.name ? x.name : null,
              type: x.type ? <Chip size="small" style={chipStyle} label={x.type} /> : null,
              media_type: x.media_type ? <Chip size="small" style={chipStyle} label={x.media_type === '3d' ? '3D Mesh' : x?.media_type} /> : null,
              progressAt: <div>{moment(x.updatedAt || x.createdAt).format('DD MMMM YYYY')}</div>,
              status: !!x.status ? statusTable[x.status] : 'Pending Conversion',
              rawFile: <DownloadFile {...x} />,
              processFile: !!x.status ? actions[x.status] : null,
            });
          })}
        />
      </MuiThemeProvider>
    </>
  );
};

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
        fontWeight: 400,
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

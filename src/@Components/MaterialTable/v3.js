import React from 'react';
import MUIDataTable from 'mui-datatables';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import GetAppIcon from '@material-ui/icons/GetApp';
import PublishIcon from '@material-ui/icons/Publish';
import SplitButton from '@Components/SplitButton';
import moment from 'moment';
import NoData from '@Assets/Images/Data-not-found4.svg';

const options = {
  filter: true,
  filterType: 'dropdown',
  print: false,
  download: false,
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

const activeButtonStyle = {
  color: 'var(--primary-color)',
  border: '1px solid var(--primary-color)',
  background: 'transparent',
  height: '1.8rem',
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
  const DownloadFile = ({ pathname }) => (
    <Link to={{ pathname }} target="_blank">
      <Button style={activeButtonStyle}>
        <GetAppIcon style={{ paddingTop: 1, width: '15%' }} />
        <span style={{ fontSize: 12, textTransform: 'capitalize' }} children="&nbsp;Download" />
      </Button>
    </Link>
  );

  const StartProcessing = (x) => {
    const custom_color = !!x.disabled ? { color: 'grey', background: 'lightgrey' } : activeButtonStyle;
    return (
      <Button style={{ height: '1.8rem', ...custom_color }} disabled={!!x.disabled} onClick={x.onClick}>
        <PlayArrowIcon style={{ paddingTop: 1, width: '15%' }} />
        <span style={{ fontSize: 12, textTransform: 'capitalize' }} children="&nbsp;Start Processing" />
      </Button>
    );
  };

  const PaymentReferences = ({ payment }) => (
    <div>
      {payment
        ? (
          <>
            <div>{`${payment.currency.toUpperCase()}${payment.amount}`}</div>
            <div>{`Using ${payment.paymentmethod.toUpperCase()}`}</div>
          </>
        )
        : 'N/A'}
    </div>
  );

  return (
    <>
      <MuiThemeProvider theme={getMuiTheme()}>
        <MUIDataTable
          options={options}
          columns={props.columns.map((col) => ({ ...col, label: col.name, name: col.selector }))}
          data={props.tableData.map((x) => {
            const statusTable = ['Pending', 'Processing', 'Require More File', 'Rendering', 'Completed'];
            const actions = [
              <StartProcessing {...x} onClick={() => props.startProcessing(x.id)} />,
              <StartProcessing disabled />,
              <UploadFile {...x} />,
              <StartProcessing disabled />,
              <DownloadFile pathname={`${process.env.REACT_APP_ENDPOINT_URL}mapping/${x.id}`} />,
            ];
            return ({
              ...x,
              asset_name: x.Asset?.name || x.AssetId,
              mapping: 'Cloud Processing',
              progressAt: <div>{moment(x.updatedAt || x.createdAt).format('DD MMMM YYYY')}</div>,
              imagery: <div>{x.CloudProcessingType?.name}</div>,
              status: x.Payment ? statusTable[x.status] : 'Pending',
              processFile: x.Payment ? actions[x.status] : <StartProcessing disabled />,
              // rawFile: <DownloadFile pathname={`${process.env.REACT_APP_ENDPOINT_URL}mapping/${x.id}?raw=true`} />,
              rawFile: <SplitButton
                style={activeButtonStyle}
                options={x.CloudProcessingUploadSessions.length ? x.CloudProcessingUploadSessions.map(y => ({
                  path: `${process.env.REACT_APP_ENDPOINT_URL}mapping/${x.id}?raw=true&session=${y.upload_session}`,
                  label: moment(y.updatedAt).format('hh:mm A DD MMM YYYY'),
                }))
                  : x.files.split(',').map((y, idy) => ({
                    path: `${process.env.REACT_APP_ENDPOINT_URL}mapping/${x.id}?raw=true`,
                    label: `upload v${idy}`,
                  }))}
              />,
              paymentStatus: x.Payment ? 'Paid' : 'Payment Due',
              payments: <PaymentReferences payment={x.Payment} />,
              dateCompleted: '-',
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

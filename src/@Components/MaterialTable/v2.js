import React from 'react';
import MUIDataTable from 'mui-datatables';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import PublishIcon from '@material-ui/icons/Publish';
import moment from 'moment';
import SplitButton from '@Components/SplitButton';

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
  // const DisabledButton = (x) => {
  //   const custom_color = !!x.disabled ? { color: 'grey', background: 'lightgrey' } : activeButtonStyle;
  //   return (
  //     <Button style={{ height: '1.8rem', ...custom_color }} disabled={!!x.disabled} onClick={x.onClick}>
  //       {/* <PlayArrowIcon style={{ paddingTop: 1, width: '15%' }} /> */}
  //       <span style={{ fontSize: 12, textTransform: 'capitalize' }} children={x.status} />
  //     </Button>
  //   );
  // };
  const AfterProcessAction = (x) => (
    <>
      <UploadFile {...x} />
      &nbsp;
      <Button
        onClick={() => { props.updateCpToAsset(x.id); }}
        style={activeButtonStyle}
      >
        <GetAppIcon style={{ paddingTop: 1, width: '15%' }} />
        <span style={{ fontSize: 12, textTransform: 'capitalize' }} children="&nbsp;Update To Asset" />
      </Button>
    </>
  );

  // const DownloadFile = ({ pathname }) => (
  //   <Link to={{ pathname }} target="_blank">
  //     <Button style={activeButtonStyle}>
  //       <GetAppIcon style={{ paddingTop: 1, width: '15%' }} />
  //       <span style={{ fontSize: 12, textTransform: 'capitalize' }} children="&nbsp;Download" />
  //     </Button>
  //   </Link>
  // );

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
            const statusTable = ['Pending', 'Processing', 'Waiting more files', 'Uploading', 'Completed'];
            const actions = [
              <UploadFile {...x} />, // and req more files
              <UploadFile {...x} />, // and req more files
              <UploadFile {...x} />,
              // <DisabledButton disabled status={statusTable[x.status]} />,
              'Uploading',
              <AfterProcessAction {...x} />,
            ];
            return ({
              ...x,
              asset_name: x.Asset?.name || x?.AssetId,
              mapping: 'Cloud Processing',
              imagery: <div>{x.CloudProcessingType?.name}</div>,
              progressAt: <div>{moment(x.updatedAt || x.createdAt).format('DD MMMM YYYY')}</div>,
              status: x.Payment ? statusTable[x.status] : 'Pending',
              processFile: actions[x.status],
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
              // rawFile: <DownloadFile pathname={`${process.env.REACT_APP_ENDPOINT_URL}mapping/${x.id}?raw=true`} />,
              paymentStatus: x.Payment ? x.Payment.status : 'Payment Due',
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

import React from 'react';
import MUIDataTable from 'mui-datatables';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const options = {
  filter: false,
  filterType: 'dropdown',
  print: false,
  download: false,
  responsive: 'standard',
  selectableRows: 'none',
  sort: false,
  elevation: 0,
  pagination: false,
  search: false,
  viewColumns: false,
};

export default (props) => {
  return (
    <MuiThemeProvider theme={getMuiTheme()}>
      <MUIDataTable
        options={options}
        columns={props.columns.map((col) => ({ ...col, label: col.name, name: col.selector }))}
        data={props.tableData}
      />
    </MuiThemeProvider>
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
          color: '#000000DE',
          fontSize: 18,
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
        color: '#001847',
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

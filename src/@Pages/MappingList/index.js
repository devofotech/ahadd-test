import React from 'react';
import MainContentContainer from '@Components/MainContentContainer';

import Table from '@Components/MaterialTable/v3';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Hook from './hook';

const style = {
  title: {
    fontWeight: 600,
    fontSize: 28,
    color: 'var(--primary-color)',
  },
  btnDownload: {
    backgroundColor: 'white',
    border: '1px solid #03A69A',
    color: '#03A69A',
    paddingTop: 1,
    paddingBottom: 1,
  },
  btnUpload: {
    backgroundColor: '#03A69A',
    border: 'none',
    color: 'white',
    paddingTop: 2,
    paddingBottom: 2,
  },
};

const columns = (h) => [
  { name: 'Asset Name', selector: 'asset_name', options: { viewColumns: false } },
  { name: 'Mapping', selector: 'mapping' },
  {
    name: 'Output',
    selector: 'imagery',
    options: {
      setCellHeaderProps: (value) => ({
        style: { textAlign: 'left' },
      }),
    },
  },
  {
    name: 'Date Progress',
    selector: 'progressAt',
    options: {
      filter: false,
      setCellHeaderProps: (value) => ({
        style: { textAlign: 'center' },
      }),
      setCellProps: (value) => ({
        style: { textAlign: 'center' },
      }),
    },
  },
  { name: 'Imagery Name', selector: 'layername' },
  //   {
  //     name: 'Date Complete',
  //     selector: 'updatedAt',
  //     options: {
  //       filter: false,
  //       setCellHeaderProps: (value) => ({
  //         style: { textAlign: 'center' },
  //       }),
  //       setCellProps: (value) => ({
  //         style: { textAlign: 'center' },
  //       }),
  //     },
  //   },
  {
    name: 'Status',
    selector: 'status',
    options: {
      filter: false,
      setCellHeaderProps: (value) => ({
        style: { textAlign: 'center' },
      }),
      setCellProps: (value) => ({
        style: { textAlign: 'center' },
      }),
    },
  },
  {
    name: 'Payment Status',
    selector: 'paymentStatus',
    options: { filter: false, display: true },
  },
  {
    name: 'Payment References',
    selector: 'payments',
    options: { filter: false, display: h.show },
  },
  {
    name: 'Processed File',
    selector: 'processFile',
    options: {
      filter: false,
      display: true,
      setCellHeaderProps: (value) => ({
        style: { textAlign: 'center' },
      }),
      setCellProps: (value) => ({
        style: { textAlign: 'center' },
      }),
    },
  },
  {
    name: 'Raw File',
    selector: 'rawFile',
    options: {
      filter: false,
      display: h.show,
      setCellHeaderProps: (value) => ({
        style: { textAlign: 'center' },
      }),
      setCellProps: (value) => ({
        style: { textAlign: 'center' },
      }),
    },
  },
];

export default function Mapping(props) {
  const h = Hook(props);

  return (
    <MainContentContainer>
      <div className="d-flex justify-content-between py-2">
        <h1 className="my-auto pl-4 pb-2" style={style.title}>
          Geo Processing
        </h1>
        <div className="d-flex align-items-center" style={{ gap: 15 }}>
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="color-text-primary" style={{ fontSize: 14 }}>
            Learn More
          </a>
          {props.user?.can_add_raw_file && (
            <Link to="/mapping-list/processing">
              <Button variant="contained" style={{ color: '#FFFFFF', backgroundColor: 'var(--primary-color)' }}>
                <AddOutlinedIcon />
                <p className="text-white">Add Processing</p>
              </Button>
            </Link>
          )}
        </div>
      </div>
      <div className="mb-1">
        <div className="col-14">
          <div className="py-2" style={{ borderRadius: 10, marginBottom: 5 }}>
            <Table {...h} columns={columns(h)} tableData={h.layers} />
          </div>
        </div>
      </div>
    </MainContentContainer>
  );
}

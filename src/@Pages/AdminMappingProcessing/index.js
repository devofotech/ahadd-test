import React, { useState } from 'react';
import MainContentContainer from '@Components/MainContentContainer';
import Table from '@Components/MaterialTable/v2';
import UploadDialog from '@Components/UploadDialogProcessingFile';
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
  { name: 'Processing ID', selector: 'id', options: { viewColumns: false } },
  { name: 'Asset Name', selector: 'asset_name', options: { viewColumns: false } },
  { name: 'Mapping', selector: 'mapping', options: { display: h.show } },
  {
    name: 'Output',
    selector: 'imagery',
    options: {
      setCellHeaderProps: () => ({
        style: { textAlign: 'left' },
      }),
    },
  },
  {
    name: 'Date Progress',
    selector: 'progressAt',
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
  { name: 'Imagery Name', selector: 'layername' },
  {
    name: 'Date Complete',
    selector: 'updatedAt',
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
    name: 'File Uploaded',
    selector: 'rawFile',
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
    name: 'Payment Status',
    selector: 'paymentStatus',
    options: { filter: false, display: h.show },
  },
  {
    name: 'Payment References',
    selector: 'payments',
    options: { filter: false, display: h.show },
  },
];

export default function Mapping(props) {
  const h = Hook(props);
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <MainContentContainer>
      <UploadDialog {...h} withProgress open={openDialog} setOpen={setOpenDialog} title="Processed File" type="compress" />
      <div className="d-flex py-2">
        <h1 className="my-auto pl-4 pb-2" style={style.title}>
          Mapping&nbsp;Processing (Admins - Processing Team)
        </h1>
      </div>
      <div className="mb-1">
        <div className="col-14">
          <div className="py-2" style={{ borderRadius: 10, marginBottom: 5 }}>
            <Table {...h} columns={columns(h)} tableData={h.layers} setOpenDialog={setOpenDialog} />
          </div>
        </div>
      </div>
    </MainContentContainer>
  );
}

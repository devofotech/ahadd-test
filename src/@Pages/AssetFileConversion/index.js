import React, { useState } from 'react';
import MainContentContainer from '@Components/MainContentContainer';
import Table from '@Components/MaterialTable/v6';
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
  { name: 'ID', selector: 'id', options: { viewColumns: false } },
  { name: 'Asset', selector: 'asset_name', options: { viewColumns: false } },
  { name: 'Label / Name', selector: 'label', options: { viewColumns: false } },
  {
    name: 'Layer Group',
    selector: 'layer_group',
    options: {
      setCellHeaderProps: () => ({
        style: { textAlign: 'left' },
      }),
      display: h.show
    },
  },
  { name: 'Type', selector: 'type', options: { display: h.show } },
  { name: 'Media Type', selector: 'media_type', options: { display: true } },
  {
    name: 'Date Created',
    selector: 'progressAt',
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
];

export default function AssetFileConversion(props) {
  const h = Hook(props);
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <MainContentContainer>
      <UploadDialog {...h} withProgress open={openDialog} setOpen={setOpenDialog} title="Converted File" type="compress" />
      <div className="d-flex py-2">
        <h1 className="my-auto pl-4 pb-2" style={style.title}>
          Asset File Conversion (Admins - Processing Team)
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

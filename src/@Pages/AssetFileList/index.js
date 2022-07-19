import React from 'react';
import {
  IconButton, Grid, Card, CardContent,
} from '@material-ui/core';
import { Refresh } from '@material-ui/icons';
import Pagination from '@Components/Pagination';
import SearchBox from '@Components/SearchBox';
import CenteredLoadingContainer from '@Components/CenteredLoadingContainer';
import AddNewAssetFileDialog from './components/AddNewAssetFileDialog';
import useHook from './hook';
import AssetFileListCard from './components/AssetFileListCard';

const TableHeader = (props) => <p className="text-dark" style={{ fontSize: 16 }}>{props.children}</p>;

export default () => {
  const h = useHook();

  return (
    <div className="mx-5 mb-5">
      <div className="w-100 mt-3 d-flex justify-content-between align-items-center">
        <h1 style={{ fontWeight: 600, fontSize: 28 }}>
          Asset Files Management
        </h1>
        <div className="d-flex align-items-center">
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="color-text-primary" style={{ fontSize: 14 }}>
            Learn More
          </a>
          {/* <IconButton>
            <GetApp />
          </IconButton> */}
          <IconButton onClick={() => h.getAssetFile()}>
            <Refresh />
          </IconButton>
          {/* <IconButton>
            <FilterList />
          </IconButton> */}
          <AddNewAssetFileDialog {...h} />
          <SearchBox onChange={(e) => h.setKeyword(e.target.value)} onKeyDown={h.onKeyDown} onClick={h.getAssetFile} hasOnClick />
        </div>
      </div>
      <Card className="mb-4">
        <CardContent>
          <Grid container className="px-1">
            <Grid item xs={1}><TableHeader className="text-light">ID</TableHeader></Grid>
            <Grid item xs={1}><TableHeader className="text-light">Asset</TableHeader></Grid>
            <Grid item xs={2}><TableHeader>Label / Name</TableHeader></Grid>
            <Grid item xs={2}><TableHeader>Layer Group</TableHeader></Grid>
            <Grid item xs={1}><TableHeader>Type</TableHeader></Grid>
            <Grid item xs={1}><TableHeader>Media Type</TableHeader></Grid>
            <Grid item xs={1} style={{ textAlign: 'center' }}><TableHeader>Created</TableHeader></Grid>
            <Grid item xs={2} style={{ textAlign: 'center' }}><TableHeader>Action</TableHeader></Grid>
            <Grid item xs={1} style={{ textAlign: 'center' }}><TableHeader>Display</TableHeader></Grid>
          </Grid>
        </CardContent>
      </Card>
      {h.isLoading ? <CenteredLoadingContainer size={75} hasText text="data" /> : (
        !!h.assetFile?.length && h.assetFile.map((a) => (
          <AssetFileListCard file={a} {...h} />
        ))
      )}
      <div className="mt-3">
        <Pagination {...h} />
      </div>
    </div>
  );
};

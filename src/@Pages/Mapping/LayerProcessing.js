import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import Button from './Button';
import Dropzone from './Dropzone';

export default function LayerProcessing() {
  const [files, setFiles] = useState([]);
  return (
    <Grid container>
      <Grid container item xs={12} spacing={3}>
        <Grid item md={12} lg={12}>
          <Dropzone files={files} setFiles={setFiles} height={500} />
        </Grid>
        <Grid container item md={12} lg={12} style={{ display: 'flex', flexDirection: 'column' }}>
          <Grid item md={12} lg={12} style={{ flex: 1 }}>
            <Button
              variant="contained"
              onClick={() => console.log('upload click')}
              style={{
                margin: '15px 0px',
                padding: '4px 20px',
                opacity: files.length > 0 ? 1 : 0,
              }}
              disabled={files.length === 0}
            >
              UPLOAD DATA
            </Button>
          </Grid>
          <div style={{ flex: 6 }} />
        </Grid>
      </Grid>
    </Grid>
  );
}

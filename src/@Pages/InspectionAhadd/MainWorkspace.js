import React, { useRef } from 'react';
import { Grid } from '@material-ui/core';
import CenteredLoading from '@Components/CenteredLoading';
import ReactPlayer from 'react-player';
import AnnotateImage from './AnnotateImage';
import NoDataInterface from './NoDataInterface';

export default function MainWorkspace(props) {
  const ref = useRef(null);
  return (
    <div className="paper shadow overflow-auto hide-scroll" style={{ maxHeight: '60vh', minHeight: '60vh', minWidth: '71vw', maxWidth: '100vw'}} ref={ref}>
      <Grid container spacing={3}>
        {props.isLoading && (
          <CenteredLoading style={{
            position: 'absolute', height: '62vh', width: '72vw', backgroundColor: '#000000b3', zIndex: 2,
          }}
          />
        )}
        <Grid item xs={12} style={{ maxHeight: '60vh', minHeight: '60vh' }}>
          {props.tab === 0 && (props.images.length > 0
            ? <AnnotateImage {...props} paperRef={ref} />
            : <NoDataInterface />
          )}
          {props.tab === 1 && (props.videos.length > 0 ? (
            <Grid
              item
              container
              justify="center"
              alignItems="center"
              className="main-img flex-standard flex-column"
            >
              <ReactPlayer
                url={`${process.env.REACT_APP_S3}/${props.mainVideo?.path}`}
                width="100%"
                height="100%"
                controls
              />
            </Grid>
          ) : <NoDataInterface />)}
        </Grid>
      </Grid>
    </div>
  );
}

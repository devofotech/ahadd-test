import React, { useRef, useState } from 'react';
import { Grid, Tooltip } from '@material-ui/core';
import CenteredLoading from '@Components/CenteredLoading';
import ReactPlayer from 'react-player';
import YellowMarker from '@Assets/Icons/Marker3.svg';
import AnnotateImage from './AnnotateImage';
import NoDataInterface from './NoDataInterface';

export default function MainWorkspace(props) {
  const ref = useRef(null);
  const [image_size, set_image_size] = useState({ x: '100%', y: '100%' });
  const [is_ready, set_is_ready] = useState(false);
  const location_pin = props.images.filter(e => !e.main && !!e.pin_on_main).map(f => ({ coordinate: f.pin_on_main.split(','), ...f }));

  const convertToPosition = (value, axis) => Number(value / 100 * image_size[axis]);

  const onImgLoad = ({ target: img }) => {
    if (is_ready) return;
    const { offsetHeight, offsetWidth } = img;
    set_image_size({ x: offsetWidth, y: offsetHeight });
    set_is_ready(true);
  };

  const DisplayImage = () => {
    props.setIsLoading(false);
    return (
      <div style={{ backgroundColor: 'white' }} className="flex-standard w-100 h-100">
        <div style={{ width: image_size.x, height: image_size.y, position: 'relative' }}>
          {!!location_pin.length && is_ready && location_pin.map((location) => {
            return (
              <Tooltip title={location.id} placement="top">
                <img
                  src={YellowMarker}
                  className="position-absolute"
                  style={{
                    height: 30,
                    left: `${convertToPosition(location?.coordinate[0], 'x') - 10}px`,
                    top: `${convertToPosition(location?.coordinate[1], 'y') - 30}px`,
                    zIndex: 99,
                    cursor: 'pointer',
                  }}
                  draggable={false}
                  onClick={() => props.handleChangeMainImage(location.id)}
                />
              </Tooltip>
            );
          })}
          <img
            src={`${process.env.REACT_APP_S3}/${props.mainImage?.src}`}
            style={{ maxHeight: '100%', maxWidth: '100%' }}
            draggable={false}
            onLoad={onImgLoad}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="paper shadow overflow-auto hide-scroll" style={{ maxHeight: '60vh', minHeight: '60vh', minWidth: '71vw', maxWidth: '100vw' }} ref={ref}>
      <Grid container spacing={3}>
        {props.isLoading && (
          <CenteredLoading style={{
            position: 'absolute', height: '62vh', width: '73.5vw', top: 58, backgroundColor: '#000000b3', zIndex: 2,
          }}
          />
        )}
        <Grid item xs={12} style={{ maxHeight: '60vh', minHeight: '60vh' }}>
          {props.tab === 0 && (props.images.length > 0
            ? (
              <>
                {!!props.mainImage.is_main && <DisplayImage />}
                <AnnotateImage {...props} paperRef={ref} />
              </>
            )
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

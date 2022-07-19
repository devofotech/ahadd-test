import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent,
} from '@material-ui/core';
import { HelpOutline, Close } from '@material-ui/icons';
import Carousel from 'react-material-ui-carousel';
import Button from '@Components/Button';
import Api, { endpoints } from '@Helpers/api';

// delete later
// import img1 from './1_AddAsset.gif';
// import img2 from './5_AnnotateImage.gif';

// const item = [
//   { desc: 'Click on the button Add Asset to create new asset', no: 1, gif: img1 }, { desc: 'JWalla', no: 2, gif: img2 },
// ];

export default function index({ title, name, style = {} }) {
  const [isOpen, setIsOpen] = useState(false);
  const [buttonIndex, setButtonIndex] = useState(0);
  const [guides, setGuides] = useState([]);
  const getGuides = () => {
    Api({
      endpoint: endpoints.getGuides(),
      onSuccess: ({ data }) => {
        setGuides(data.filter(d => d.name === name));
      },
      onFail: (err) => { toast('error', err); },
    });
  };
  const isClose = () => {
    if (buttonIndex == (guides.length - 1)) {
      setIsOpen(false);
      setButtonIndex(0);
      return;
    }
    setButtonIndex(buttonIndex + 1);
  };
  useEffect(() => {
    getGuides();
  }, []);
  return (
    <>
      <div className="d-flex h-100 mx-2" style={{ alignItems: 'center' }}>
        <HelpOutline color="disabled" onClick={() => setIsOpen(true)} style={{ cursor: 'pointer', ...style }} />
      </div>
      <Dialog
        open={isOpen}
        onClose={() => null}
        aria-labelledby="form-dialog-title"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">
          <div className="w-100 d-flex justify-content-between align-items-center">
            <div>{title}</div>
            <Close fontSize="small" color="black" onClick={() => setIsOpen(false)} style={{ cursor: 'pointer' }} />
          </div>
        </DialogTitle>
        <DialogContent className="position-relative">
          <Carousel
            className="mb-4"
            autoPlay={false}
            prev={() => setButtonIndex(buttonIndex - 1)}
            next={isClose}
            NavButton={({ onClick, next, prev }) => {
              let position = {};
              if (next) position = { right: 0 };
              if (prev) position = { left: 0 };
              const buttonStyle = {
                width: '6rem', opacity: 1, position: 'absolute', bottom: -0,
              };
              return (
                <Button onClick={onClick} style={{ ...position, ...buttonStyle }}>
                  {(buttonIndex == (guides.length - 1) && !prev) ? 'Close' : next && 'Next'}
                  {prev && 'Previous'}
                </Button>
              );
            }}
            indicatorContainerProps={{
              style: {
                marginTop: 15,
                marginBottom: 5,
              },
            }}
            activeIndicatorIconButtonProps={{
              style: {
                color: 'var(--active-color)',
              },
            }}

          >
            {guides.map(m => (<Container {...m} />))}
          </Carousel>
          {/* <div className="d-flex justify-content-between mb-3 mx-1">
          <Button style={{ width: '6rem' }} onClick={onClickPrevious}>PREVIOUS</Button>
          <Button style={{ width: '6rem' }} onClick={onClickNext}>NEXT</Button>
        </div> */}
        </DialogContent>
      </Dialog>
    </>
  );
}

const Container = (props) => {
  return (
    <div className="d-flex flex-column">
      {/* <img src={props.gif} height="100%" width="100%" className="mb-4" /> */}
      <img src={`${process.env.REACT_APP_S3}/static/guides/${props.name}/${props.path}`} height="100%" width="100%" className="mb-4" />
      <div style={{ fontSize: 16 }} className="text-center mb-4">
        {props.description}
      </div>
    </div>
  );
};

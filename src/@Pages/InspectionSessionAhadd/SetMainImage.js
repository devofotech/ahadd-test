import React, { useState } from 'react';
import {
  Dialog, DialogContent, DialogTitle, Button, Grid, IconButton, DialogContentText,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import metro_pin_icon from '@Assets/Icons/metro-pin.svg';
import NoData from '@Assets/Images/Data-not-found3.svg';

const useStyles = makeStyles(() => ({
  closeBtn: { cursor: 'pointer', color: '#022C64' },
  root: { '&$checked': { color: 'rgb(30, 52, 101)' }, transform: 'scale(0.8)' },
}));

export default ({ InspectionFiles, ...props }) => {
  const classes = useStyles();
  const [open, set_open] = useState(false);
  const [selected_image, set_selected_image] = useState(InspectionFiles.find(e => !!e.is_main) ?? {});
  const images_with_path = InspectionFiles.filter(e => !!e.path);

  const handleSubmit = () => {
    if (!selected_image?.id) return;
    set_open(false);
    props.onSave(selected_image?.id, props.id);
  };

  return (
    <>
      <IconButton className="color-gradient-inline" style={{ width: 18, height: 18 }} onClick={() => set_open(true)}>
        <img src={metro_pin_icon} height="18px" width="18px" />
      </IconButton>
      <Dialog
        open={open}
        onClose={() => set_open(false)}
        fullWidth
        maxWidth={!images_with_path.length ? 'sm' : 'xl'}
      >
        <DialogTitle>
          <div className="w-100 d-flex justify-content-between">
            <p style={{ fontSize: 32, color: '#022C64', fontWeight: 600 }}>Set Main Image</p>
            <Close className={classes.closeBtn} onClick={() => set_open(false)} />
          </div>
          <DialogContentText className="m-0 p-0">
            Select an image as main image. Best to select image that cover widest view of the inspection site.
          </DialogContentText>
        </DialogTitle>
        <DialogContent className="d-flex justify-content-center pb-4">
          {!images_with_path.length ? (
            <img src={NoData} style={{ width: '100%' }} />
          ) : (
            <Grid container xs={12}>
              <Grid item xs={6} className="p-1">
                <Grid container xs={12} spacing={2} style={{ maxHeight: '65vh', overflow: 'auto' }}>
                  {images_with_path.map((item) => (
                    <ImageCard item={item} onClickImage={() => set_selected_image(item)} selected_image={selected_image} />
                  ))}
                </Grid>
              </Grid>
              <Grid container item xs={6}>
                <Grid item xs={12} className="flex-standard" style={{ border: '1px solid grey', borderRadius: 15, height: '55vh' }}>
                  {!!selected_image.id ? (
                    <img
                      src={`${process.env.REACT_APP_S3}/${selected_image?.path}`}
                      loading="lazy"
                      style={{ maxHeight: '100%', maxWidth: '100%' }}
                    />
                  ) : 'No Selected Image'}
                </Grid>
                {selected_image?.id && (
                  <Grid item xs={12} className="d-flex py-3" direction="column" style={{ alignItems: 'flex-end' }}>
                    <p style={{ color: '#022C64', fontSize: 18 }}>{`Cycle ${props?.cycle} (${props?.year}), ${props.Asset?.name}`}</p>
                    <p className="text-secondary">{moment(selected_image?.createdAt).format('DD MMM YYYY')}</p>
                    <p className="text-secondary">{moment(selected_image?.createdAt).format('h:mm A')}</p>
                    <Button className="color-gradient-inline mt-3" style={{ borderRadius: 18, color: 'white' }} onClick={handleSubmit}>
                      Set Main Image
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Grid>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

const styles = {
  image: {
    position: 'relative',
    width: '100%',
    aspectRatio: '4/3',
    backgroundSize: 'cover',
    cursor: 'pointer',
  },
};

const ImageCard = ({ item, onClickImage, selected_image }) => {
  const [hover, setHover] = useState(false);
  const handleMouseEnter = () => { setHover(!hover); };
  const handleMouseLeave = () => { setHover(!hover); };
  return (
    <Grid item xs={4}>
      <div
        style={{
          ...styles.image,
          backgroundImage: `url(${process.env.REACT_APP_S3}/${item?.path})`,
          ...(hover && {
            transitionDuration: '0.25s',
            transform: 'scale(1.02)',
          }),
          border: selected_image?.id === item.id && '3px solid #022C64',
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        loading="lazy"
        onClick={() => onClickImage(item)}
      />
    </Grid>
  );
};

import {
  Button, Card, Dialog, DialogContent, Grid, CardActionArea, CardContent, CardMedia, Typography,
} from '@material-ui/core';
import { styled, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import mapping_2d from '@Assets/Images/mapping_2d.png';
import CenteredLoading from '@Components/CenteredLoading';
import useHook from './hook';

const useStyles = makeStyles({
  media: { height: 200 },
  title: { height: 45 },
  description: { height: '14rem', overflow: 'auto', padding: '0 5px' },
});

export default function AssetDemoButton({ projects }) {
  const h = useHook();
  const hasDemo = !!projects.filter(a => !!a.is_demo).length;
  return (
    <>
      {hasDemo ? (
        <AddDemoButton variant="outlined" border="red" onClick={() => h.createDemoAccount('clear')}>
          <p className="text-danger">Clear Demo</p>
        </AddDemoButton>
      ) : (
        <AddDemoButton variant="outlined" onClick={() => h.setOpen(true)}>
          <p>Add Demo</p>
        </AddDemoButton>
      )}
      <Dialog onClose={() => h.setOpen(false)} open={h.open} fullWidth maxWidth="lg">
        <DialogContent className="py-4 px-5 hide-scroll">
          {h.isLoadingData
            ? <CenteredLoading style={{ height: '50vh' }} />
            : (
              <>
                <h2>Get you started !</h2>
                <p style={{ color: 'var(--dark-color)', fontSize: 18 }}>
                  By selecting one of the asset type from below, we will create demo assets and data for you to
                  explore and further understand how our system works.
                </p>
                <Grid container spacing={2} className="mt-3">
                  {h.DemoGroupList.map(demogroup => (
                    <Grid item xs={12} md={3}>
                      <AssetCard createDemoAccount={h.createDemoAccount} data={demogroup} view />
                    </Grid>
                  ))}
                </Grid>
              </>
            )}
        </DialogContent>
      </Dialog>
    </>
  );
}

const AssetCard = ({ data, createDemoAccount }) => {
  const classes = useStyles();
  const assetImage = !!data?.image ? `${process.env.REACT_APP_S3}/${data?.image}` : mapping_2d;
  return (
    <Card onClick={() => createDemoAccount('add', data.id)}>
      <CardActionArea>
        <CardMedia className={classes.media} image={assetImage} title={data.name} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
            {data.name}
          </Typography>
          <Typography className={classes.description} variant="body2" color="textSecondary" component="p" style={{ position: 'relative' }}>
            {data.description.split('|').map(e => (
              <>
                <p className="text-justify text-secondary">{e}</p>
                <br />
              </>
            )) ?? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'}
            {!!data.credit && <div style={{ position: 'absolute', bottom: 15 }}>Credit: {data.credit}</div>}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const AddDemoButton = styled(Button)(({ border = 'var(--primary-color)' }) => ({
  backgroundColor: '#FFF',
  color: 'var(--primary-color)',
  border: `2px solid ${border}`,
  paddingBottom: '3px !important',
  zIndex: 1,
  '&:hover': {
    backgroundColor: '#FFF',
  },
  position: 'fixed',
  bottom: '40px',
  right: '54%',
  left: '46%',
  width: '150px',
}));

/* eslint-disable complexity */
/* eslint-disable max-len */
import { useState, useEffect } from 'react';
import {
  Card, CardActionArea, CardContent, CardMedia, Typography,
} from '@material-ui/core';
import mapping_2d from '@Assets/Images/mapping_2d.png';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  media: { height: 200 },
  title: { height: 60 },
  description: { height: '21rem', overflow: 'auto', padding: '0 5px' },
});

export default ({ isAssetsType = false, isDisabled = false, ...h }) => {
  const classes = useStyles();
  const [onHover, setOnHover] = useState(false);
  const [animation, setAnimation] = useState(false);
  const nextStep = () => {
    if (!h.view) {
      h.handleNextStepAssetType();
      h.setAssetType(h.data.id);
    }
  };
  const assetImage = !!h.data?.image ? `${process.env.REACT_APP_S3}/${h.data?.image}` : mapping_2d;
  const opacity = isDisabled ? '70%' : '100%';
  const textTitle = isDisabled ? 'text-secondary' : animation && 'text-white';
  const textDesc = animation ? 'text-white' : 'text-secondary';
  const textLearnMore = isDisabled ? 'text-secondary' : animation ? 'text-white' : 'color-text-primary';

  useEffect(() => {
    if (!isAssetsType) return;
    if (onHover) { setAnimation(true); return; }
    setAnimation(false);
    return;
  }, [onHover]);

  const cardProps = {
    false: {
      onClick: () => nextStep(),
      onMouseOver: () => setOnHover(true),
      onMouseLeave: () => setOnHover(false),
      style: { backgroundColor: animation && 'var(--primary-color)', transition: 'all .25s' },
    },
    true: {
      style: { backgroundColor: 'lightgrey' },
    },
  };

  return (
    <Card {...cardProps[isDisabled]}>
      <CardActionArea>
        <CardMedia className={classes.media} image={assetImage} title={h.data?.name} style={{ filter: isDisabled && 'grayscale(1)' }} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className={`${classes.title} ${textTitle}`} style={{ opacity, transition: 'all .25s' }}>
            {h.data?.name}
          </Typography>
          {isDisabled && <p className={`${textTitle} pt-1`} style={{ opacity, position: 'absolute', top: 240 }}>(Coming soon)</p>}
          <Typography className={classes.description} variant="body2" color="textSecondary" component="p" style={{ position: 'relative' }}>
            {h.data?.description?.split('|').map(e => (
              <>
                <p className={`text-justify ${textDesc}`} style={{ transition: 'all .25s', opacity }}>{e}</p>
                <br />
              </>
            )) ?? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'}
            <p className="mt-2" style={{ position: 'absolute', bottom: 5 }}>
              <a href="https://ofo.my" target="_blank" rel="noopener noreferrer" className={`text-justify ${textLearnMore}`} style={{ opacity }}>
                Learn More
              </a>
            </p>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

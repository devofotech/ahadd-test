import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import { Grid } from '@material-ui/core';
import plus_ahadd from '@Assets/Images/plus_ahadd.svg';
import '@Components/CenteredLoading/text.css';
import './index.css';

export default function RedirectPage() {
  const container = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require('@Assets/Images/driving-lottie.json'),
    });
  }, []);

  return (
    <Grid container alignItems="center" justify="center" className="d-flex flex-column" style={{ height: '100vh' }}>
      <img
        src={plus_ahadd}
        className="img-fluid fade-in"
        style={{ width: '28rem', paddingBottom: '0.75rem' }}
      />
      <div className="fade-in my-3" ref={container} style={{ height: 350, marginBottom: 50 }} />
      <h3 className="loading-text fade-in">Please wait, try to login you</h3>
    </Grid>
  );
}

import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import lottie from 'lottie-web';
import Button from '@Components/Button';

export default function AccountCreated(props) {
  const container = useRef(null);
  const { login, loginAuth } = props;

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require('@Assets/Icons/success-animation.json'),
    });
  }, []);

  return (
    <div>
      <Grid item xs={8} className="flex-standard flex-column mx-auto">
        <div style={{
          textAlign: 'center', alignItems: 'center', padding: '3rem', zIndex: 99,
        }}
        >
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '34px' }}>Congratulations!</h2>
            <h2 style={{ fontSize: '34px', marginBottom: '5rem' }}>Your account have been registered!</h2>
            <div className="container" ref={container} style={{ height: '55%', width: '55%' }} />
            <h2 style={{ marginTop: '5rem' }}>Click continue to proceed into homepage</h2> <br />
          </div>
          <div>
            <Link to="/login">
              <Button
                style={{
                  height: '3rem', width: '7rem', fontSize: 16, fontWeight: 'bold',
                }}
                onClick={() => login(loginAuth)}
              >
                Continue
              </Button>
            </Link>
          </div>
        </div>
      </Grid>
    </div>
  );
}

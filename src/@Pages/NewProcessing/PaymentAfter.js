import { useEffect, useState, useRef } from 'react';
import CancelIcon from '@material-ui/icons/Cancel';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Button from '@Components/Button';
import lottie from 'lottie-web';
import MainContentContainer from '@Components/MainContentContainer';

export default (h) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const container = useRef(null);
  useEffect(() => {
    if (h.intents) {
      switch (h.intents.status) {
        case 'requires_source':
          setIsSuccess(false);
          break;
        case 'succeeded':
          setIsSuccess(true);
          break;
        default:
          break;
      }
    }
  }, [h.intents]);

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require('@Assets/Icons/success-animation.json'),
    });
  }, [isSuccess]);

  return (
    <MainContentContainer>
      <Grid item xs={8} className="flex-standard flex-column mx-auto">
        <div style={{ textAlign: 'center', alignItems: 'center', padding: '2rem' }}>
          {isSuccess ? (
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ fontSize: '40px' }}>{h.isOrgUnlimited ? 'Upload' : 'Order'} Successful !</h2>
              <div className="container" ref={container} style={{ height: '40vh' }} />
              {!h.isOrgUnlimited && <><h2 style={{ marginTop: '1rem' }}>We&apos;ve sent the receipt to your email !</h2> <br /></>}
            </div>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ fontSize: '40px' }}>{h.isOrgUnlimited ? 'Upload' : 'Payment'} Unsuccessful</h2>
              <CancelIcon style={{ fontSize: 100, color: 'salmon', marginTop: '5rem' }} />
              <h2 style={{ marginTop: '1rem' }}>Please retry in a moment !</h2> <br />
            </div>
          )}
          <div style={{ marginTop: '1rem', marginBottom: '15rem' }}>
            <Link to="/mapping-list/">
              <Button className="mt-1">
                RETURN TO PROCESSING
              </Button>
            </Link>
          </div>
        </div>
      </Grid>
    </MainContentContainer>
  );
};

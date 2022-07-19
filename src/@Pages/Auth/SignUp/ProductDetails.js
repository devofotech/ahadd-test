/* eslint-disable complexity */
/* eslint-disable max-len */
import React, { useEffect, useRef } from 'react';
import {
  Grid, Typography, Container, Box, CircularProgress,
} from '@material-ui/core/';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import lottie from 'lottie-web';
import signup from '@Assets/Images/signup.png';
import { numberWithCommas } from '@Helpers';

export default ({ product, mode, isLoading }) => {
  const lottieBox = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: lottieBox.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require('@Assets/Images/sign-up-lottie.json'),
    });
  }, [isLoading]);

  return (
    <MuiThemeProvider theme={getMuiTheme()}>
      <Grid item xs={6} className="mt-5 position-relative">
        {isLoading ? (
          <CircularProgress
            size={75}
            className="position-absolute"
            style={{
              top: '50%', left: '50%', marginTop: -30, marginLeft: -40, color: 'var(--primary-color)',
            }}
          />
        ) : (
          <>
            {!!product ? (
              <>
                <Typography variant="h4" gutterBottom className="text-center color-active font-weight-bold text-wrap w-100">
                  geoRÄISE Data Ecosystem
                </Typography>
                <div className="flex-standard m-4">
                  <img
                    src={product?.image ? `${process.env.REACT_APP_S3}/${product.image}` : signup}
                    width="500"
                    height="250"
                  />
                </div>
                <Typography variant="h5" gutterBottom className="text-center color-active font-weight-bold mx-auto">
                  {product.name} Plan
                </Typography>
                <Container maxWidth="sm">
                  {!!product.price ? (
                    <>
                      <Box className="mt-2 mb-3 d-flex justify-content-center align-items-end">
                        <Typography variant="h3" style={{ fontSize: '30px' }} className="text-center">
                          $&nbsp;{numberWithCommas((product[`price_${mode}`].unit_amount / 100).toFixed(2))}
                        </Typography>
                        <div style={{ color: 'var(--tertiary-color)', fontSize: 12, marginBottom: 2 }}>/{mode === 'monthly' ? 'month' : 'year'}</div>
                      </Box>
                    </>
                  ) : (
                    <Typography variant="h3" style={{ fontSize: '30px' }} className="text-center mt-2 mb-1">Free</Typography>
                  )}
                  <Box className="text-center" style={{ fontWeight: 600 }}>
                    <TextDisplayGreen textGray="Up to&nbsp;" textGreen={`${product.user_limit} Team User${!!product.price ? 's' : ''}`} position={2} />
                    <TextDisplayGreen textGray="Up to&nbsp;" textGreen={`${product.asset_limit} Asset${!!product.price ? 's' : ''} Creation`} position={2} />
                    <TextDisplayGreen textGray="&nbsp;Storage" textGreen={`${product.value / 1000}GB `} position={1} />
                    <TextDisplayGreen textGray="Standard Email Support" />
                    {!!product.free_token && (<TextDisplayGreen textGray="Free&nbsp;" textGreen={`${product.free_token} geoRÄISE Token`} position={2} />)}
                    <TextDisplayGreen textGray="Full Access to geoRÄISE Features" />
                  </Box>
                </Container>
              </>
            ) : (
              <>
                <Typography variant="h4" gutterBottom className="text-center color-active font-weight-bold mx-3" style={{ fontSize: '30px' }}>
                  A Smarter Way to Manage Your Assets
                </Typography>
                <div className="flex-standard m-5">
                  <div ref={lottieBox} className="my-2" style={{ height: '60%', width: '60%' }} />
                </div>
                <Container maxWidth="sm">
                  <Typography variant="subtitle1" gutterBottom className="color-active">
                    geoRÄISE is a geospatial-based digital twin data ecosystem to help manage, analyze, and visualize your data 
                    in the most effective manner.
                    <br /><br />
                    It is available as Software as a Service (SaaS) to deliver best-in-class experience for asset management 
                    to a wider market. <text style={{ fontWeight: 700 }}>Try now!</text>
                  </Typography>
                </Container>
              </>
            )}
          </>
        )}
      </Grid>
    </MuiThemeProvider>
  );
};

const TextDisplayGreen = ({ textGray, textGreen, position }) => {
  if (position == 2) {
    return (
      <div className="mt-2 d-flex flex-row justify-content-center">
        <Typography variant="h4" style={{ fontSize: 15, color: 'grey' }}>{textGray}</Typography>
        <Typography variant="h4" style={{ fontSize: 15, color: 'var(--secondary-color)' }}>{textGreen}</Typography>
      </div>
    );
  }
  if (position == 1) {
    return (
      <div className="mt-2 d-flex flex-row justify-content-center">
        <Typography variant="h4" style={{ fontSize: 15, color: 'var(--secondary-color)' }}>{textGreen}</Typography>
        <Typography variant="h4" style={{ fontSize: 15, color: 'grey' }}>{textGray}</Typography>
      </div>
    );
  }
  return (
    <div className="mt-2 d-flex flex-row justify-content-center">
      <Typography variant="h4" style={{ fontSize: 15, color: 'grey' }}>{textGray}</Typography>
    </div>
  );
};

const getMuiTheme = () => createMuiTheme({
  typography: {
    fontFamily: 'CeraProRegular',
  },
});

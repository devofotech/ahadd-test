import React from 'react';
import {
  Grid, Typography, Container, Box,
} from '@material-ui/core/';
import signup from '@Assets/Images/signup.png';

export default function SignUpImage() {
  return (
    <Grid item xs={6} className="mt-5 pt-4">
      <Typography variant="h4" gutterBottom className="text-center color-active font-weight-bold">
        Various device, various outputs, ONE data platform
      </Typography>
      <div className="flex-standard m-5">
        <img src={signup} />
      </div>
      <Container maxWidth="sm">
        <Typography variant="subtitle1" gutterBottom className="color-active">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
          voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </Typography>
      </Container>
    </Grid>

  );
}

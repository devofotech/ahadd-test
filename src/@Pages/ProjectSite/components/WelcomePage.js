import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, Grid, DialogActions,
} from '@material-ui/core';
import { AllInclusive } from '@material-ui/icons';
import Button from '@Components/Button';
import WelcomeImg from '@Assets/Images/Welcome.svg';
import { numberWithCommas, pluralizer } from '@Helpers';
import WelcomeAnimation from './WelcomeAnimation';

export default function WelcomePage(h) {
  return (
    <>
      <Dialog
        open={h.open}
        onClose={() => h.handleClose()}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="form-dialog-title">
          <div className="w-100 d-flex justify-content-between align-items-center">
            <p style={{ color: '#5b6272', fontWeight: 600 }}>Welcome to geoRÄISE !</p>
          </div>
        </DialogTitle>
        <DialogContent className="position-relative">
          <div>
            <WelcomeAnimation />
            {/* <img src={WelcomeImg} alt="Welcome banner" width="100%" /> */}
            <div className="mt-4">
              <div className="d-flex">
                <p style={{ fontSize: 14, color: '#04847c' }}>Hello&nbsp;</p>
                <p style={{ color: '#5b6272', fontSize: 14 }}>{h.user?.name},</p>
              </div>
              <p style={{ color: '#5b6272', fontSize: 14, marginTop: 15 }}>
                It&apos;s awesome to have you on board and we hope you enjoy your experience <br />with us !
              </p>
              <div className="d-flex" style={{ marginTop: 15 }}>
                <p style={{ fontSize: 14, color: '#5b6272' }}>You have subscribed to our</p>
                <p style={{ fontSize: 14, color: '#04847c' }}>&nbsp;{h.currentPlan} Plan</p>
                <p style={{ fontSize: 14, color: '#5b6272' }}>. Here&apos;s the benefit of your account:</p>
              </div>
              <Grid container spacing={2} style={{ marginTop: 15, backgroundColor: '#edf0f4', padding: 20 }}>
                {[
                  {
                    title: <p style={{ fontWeight: 600, color: 'black', fontSize: 12 }}>USER</p>,
                    content: <p style={{ color: '#04847c', fontSize: 14 }}>{pluralizer('Team User', h.plan?.user_limit, true)}</p>,
                  },
                  {
                    title: <p style={{ fontWeight: 600, color: 'black', fontSize: 12 }}>ASSET</p>,
                    content: <p style={{ color: '#04847c', fontSize: 14 }}>{pluralizer('Assets', h.plan?.asset_limit, true)}</p>,
                  },
                  {
                    title: <p style={{ fontWeight: 600, color: 'black', fontSize: 12 }}>STORAGE</p>,
                    content: <p style={{ color: '#04847c', fontSize: 14 }}>{numberWithCommas(h.plan?.value / 1000)} GB</p>,
                  },
                  {
                    title: <p style={{ fontWeight: 600, color: 'black', fontSize: 12 }}>geoRÄISE TOKEN</p>,
                    content: <p style={{ color: '#04847c', fontSize: 14 }}>{h.isOrgUnlimited ? (<AllInclusive />) : h.plan?.free_token} geoRÄISE Token</p>,
                  },
                  {
                    title: <p style={{ fontWeight: 600, color: 'black', fontSize: 12 }}>FEATURES</p>,
                    content: <p style={{ color: '#04847c', fontSize: 14 }}>Full Access</p>,
                  },
                  {
                    title: <p style={{ fontWeight: 600, color: 'black', fontSize: 12 }}>SUPPORT</p>,
                    content: <p style={{ color: '#04847c', fontSize: 14 }}>Standard Email Support</p>,
                  },
                ].map(benefit => (
                  <Grid item xs={4}>
                    {benefit.title}
                    {benefit.content}
                  </Grid>
                ))}
              </Grid>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            size="small"
            disabled={!!h.isLoading}
            style={{ marginRight: 8, marginTop: 15, marginBottom: 15 }}
            onClick={() => h.handleClose()}
          >
            Got it!
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid, Typography, TextField, FormGroup, FormControlLabel, Checkbox, Box,
} from '@material-ui/core/';
import Button from '@Components/Button';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { AuthContext } from '@Context/Auth';
import TermOfUseDialog from '@Components/TermOfUseDialog';
import { CardInput } from './CardInput';

const useStyles = makeStyles(() => ({
  gradient: {
    backgroundColor: 'var(--active-color)',
    backgroundImage: 'linear-gradient(var(--active-color), #33ABC1)',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 5,
  },
  label: {
    marginTop: 5,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    color: 'grey',
  },
}));

export const SignUpForm = (h) => {
  const location = useLocation();
  const [enableSignUp, setEnableSignUp] = useState(false);
  const { token } = useContext(AuthContext);
  const { from } = location.state || { from: { pathname: '/' } };
  const classes = useStyles();
  if (token && h.user !== 'logged out') return <Redirect to={from} />;
  return (
    <Grid item xs={6} className={classes.gradient}>
      <div className="mt-5 mx-5 px-5" style={{ maxWidth: 500 }}>
        <Typography variant="h4" gutterBottom className="text-white font-weight-bold">
          Create an account
        </Typography>
        <Typography variant="subtitle1" className="text-white">
          Enter your details below to continue
        </Typography>
        <Box component="form" onSubmit={h.handleSubmit} className="mt-2">
          <Grid container spacing={2}>
            {[
              {
                label: 'First Name', value: h.firstName, onChange: e => h.setFirstName(e.target.value), sm: 6,
              },
              {
                label: 'Last Name', value: h.lastName, onChange: e => h.setLastName(e.target.value), sm: 6,
              },
              { label: 'Company Name', value: h.company, onChange: e => h.setCompany(e.target.value) },
              {
                label: 'Email', value: h.email, onChange: e => { h.setEmail(e.target.value); h.setIsTaken(false); }, type: 'email',
              },
              {
                label: 'Password', value: h.password, onChange: e => h.setPassword(e.target.value), type: h.passwordVisibility ? 'text' : 'password',
              },
            ].map(d => (
              <Grid item xs={12} sm={d.sm}>
                {h.isTaken && d.label === 'Email' && (
                  <h6 style={{ fontSize: 12, color: 'red' }}>
                    The email has already existed, please use other email or login to you account.
                  </h6>
                )}
                <TextField
                  {...d}
                  variant="outlined"
                  className="pb-0 w-100 mt-2"
                  InputProps={{ className: classes.input }}
                  InputLabelProps={{ className: classes.label }}
                  autoComplete="new-password"
                  size="small"
                />
              </Grid>
            ))}
            {!!h.selectedProduct && <CardInput {...h} classes={classes} />}
          </Grid>
          <FormGroup>
            <FormControlLabel
              className="mt-3"
              control={<Checkbox className="text-white" required="true" onChange={e => setEnableSignUp(e.target.checked)} />}
              label={(
                <h6 className="text-white d-flex align-items-center">I have read and agree to the
                  <Link className="color-primary ml-2 hover-overlay" onClick={h.handleOpenModal}>
                    Terms of Use
                  </Link>
                </h6>
              )}
            />
            <FormControlLabel
              control={<Checkbox className="text-white" />}
              label={(
                <h6 className="text-white">Please send me occasional emails about the products. You can unsubscribe at any time</h6>
              )}
            />
          </FormGroup>
          <Button
            type="submit"
            fullWidth
            className="mt-3"
            disabled={!enableSignUp}
          >
            Sign Up
          </Button>
          <div className="d-flex justify-content-center m-3">
            <h6 className="text-white">Already have an account?</h6>
            <Link to="/login">
              <h6 className="color-primary ml-1 hover-overlay">&nbsp;Login here</h6>
            </Link>
          </div>
        </Box>
        <TermOfUseDialog {...h} />
      </div>
    </Grid>
  );
};

import {
  Checkbox, FormControlLabel, FormGroup, Grid, TextField, Box, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@Components/Button';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import TermOfUseDialog from '@Components/TermOfUseDialog';

export default (h) => {
  const [enableSignUp, setEnableSignUp] = useState(false);
  const disableSave = enableSignUp && !!h.firstName && !!h.company && !!h.password;
  const classes = useStyles();
  console.log('vvv', h)
  return (
    <Grid item xs={6} className={classes.gradient}>
      <div className="mt-5 mx-5 px-5" style={{ maxWidth: 500 }}>
        <Typography variant="h4" gutterBottom className="text-white font-weight-bold">
          Your Information
        </Typography>
        <Typography variant="subtitle1" className="text-white">
          In order to use our service, information below is required
        </Typography>
        <Box component="form" className="mt-2">
          <Grid container spacing={2}>
            {[
              {
                label: 'First Name*', value: h.firstName, onChange: e => h.setFirstName(e.target.value), sm: 6,
              },
              {
                label: 'Last Name', value: h.lastName, onChange: e => h.setLastName(e.target.value), sm: 6,
              },
              { label: 'Company Name*', value: h.company, onChange: e => h.setCompany(e.target.value) },
              {
                label: 'Phone Number', value: h.phone, onChange: e => h.setPhone(e.target.value),
              },
              {
                label: 'Email', value: h.email, onChange: e => h.setEmail(e.target.value), type: 'email', disabled: true,
              },
              {
                label: 'Password*', value: h.password, onChange: e => h.setPassword(e.target.value), type: h.passwordVisibility ? 'text' : 'password',
              },
            ].map(d => (
              <Grid item xs={12} sm={d.sm}>
                <TextField
                  {...d}
                  variant="outlined"
                  className="pb-0 w-100 mt-2"
                  InputProps={{
                    className: classes.input,
                  }}
                  InputLabelProps={{
                    className: classes.label,
                  }}
                  autoComplete="new-password"
                  size="small"
                />
              </Grid>
            ))}
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
            // type="submit"
            onClick={h.handleSubmit}
            fullWidth
            className="mt-3"
            disabled={!disableSave}
          >
            Save
          </Button>
        </Box>
        <TermOfUseDialog {...h} />
      </div>
    </Grid>
  );
};

const useStyles = makeStyles(() => ({
  gradient: {
    backgroundColor: 'var(--active-color)',
    backgroundImage: 'linear-gradient(var(--active-color), #33ABC1)',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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

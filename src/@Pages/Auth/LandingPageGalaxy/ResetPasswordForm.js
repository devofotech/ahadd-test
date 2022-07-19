import {
  Grid, Button, TextField, CircularProgress,
} from '@material-ui/core';
import { useLocation, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Label } from 'reactstrap';
import { makeStyles, styled } from '@material-ui/core/styles';
import Api, { endpoints } from '@Helpers/api';
import queryString from 'query-string';

const useStyles = makeStyles(() => ({
  wrapper: {
    position: 'relative',
  },
  btnLogin: {
    backgroundColor: '#7723CA',
    color: '#fff',
    width: '100%',
    '&:hover': {
      backgroundColor: 'var(--primary-color)',
    },
  },
  buttonProgress: {
    color: '#7723CA',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function ResetPasswordForm() {
  const classes = useStyles();
  const location = useLocation();
  const [token, set_token] = useState(false);
  const [is_loading, set_is_loading] = useState(false);
  const [password, set_password] = useState('');
  const [repassword, set_repassword] = useState('');
  const [error_password, set_error_password] = useState('');
  const [error_repassword, set_error_repassword] = useState('');

  const send_api = () => {
    const pw_err = !password ? 'Password is required' : null;
    const repw_err = (repassword !== password) ? 'Password does not match' : null;
    set_error_password(pw_err);
    set_error_repassword(repw_err);

    if (pw_err || repw_err) return;

    set_is_loading(true);
    Api({
      endpoint: endpoints.resetPassword(),
      data: { password, token },
      onSuccess: () => {
        toast('success', 'Reset password successful. Please login using new password');
        setTimeout(() => window.location = '/', 5000);
        set_is_loading(false);
      },
      onFail: () => {
        toast('error', 'Failed to reset password');
        set_is_loading(false);
      },
    });
  };

  useEffect(() => {
    const { token: tokenFromURL } = queryString.parse(location.search);
    if (!tokenFromURL) {
      window.location = '/';
      return;
    }
    set_is_loading(true);
    Api({
      endpoint: endpoints.verifyResetPasswordToken(),
      data: { token: tokenFromURL },
      onSuccess: () => {
        set_is_loading(false);
        set_token(tokenFromURL);
      },
      onFail: () => {
        toast('error', 'Reset password token invalid, please request forget password again.');
        setTimeout(() => window.location = '/', 5000);
        set_is_loading(false);
      },
    });
  }, []);

  const onKeyDown = ({ key }) => {
    if (key === 'Enter') {
      send_api();
    }
  };

  if (!token) return (<></>);

  return (
    <div>
      <Label
        style={{ color: '#03A69A', fontSize: 12.5, marginLeft: 5 }}
        for="password"
        children="Password"
      />
      <DetailsField
        onKeyDown={onKeyDown}
        id="standard-password-input"
        type="password"
        value={password}
        onChange={(e) => set_password(e.target.value)}
        autoComplete="current-password"
        style={{ width: '100%' }}
        error={!!error_password}
        helperText={error_password}
        variant="outlined"
        size="small"
      />
      <Label
        style={{
          color: '#03A69A', marginTop: 5, marginLeft: 5, fontSize: 12.5,
        }}
        for="confirm-password"
        children="Confirm Password"
      />
      <DetailsField
        onKeyDown={onKeyDown}
        id="standard-password-input"
        type="password"
        value={repassword}
        onChange={(e) => set_repassword(e.target.value)}
        autoComplete="current-password"
        style={{ width: '100%' }}
        error={!!error_repassword}
        helperText={error_repassword}
        variant="outlined"
        size="small"
      />
      <Grid item container xs={12} justify="flex-end" style={{ marginTop: 5, marginBottom: 5 }}>
        <Link to="/login">
          <h6
            style={{
              color: 'gray', fontWeight: 400, margin: 0, cursor: 'pointer',
            }}
          >
            Back to Login
          </h6>
        </Link>
      </Grid>
      <Grid item xs={12}>
        <div className={classes.wrapper}>
          <Button
            variant="contained"
            className={classes.btnLogin}
            onClick={send_api}
            disabled={is_loading}
          >
            RESET PASSWORD
          </Button>
          {is_loading && <CircularProgress size={24} className={classes.buttonProgress} />}
        </div>
      </Grid>
      {error_password && (
        <Grid item container xs={12} justify="space-around">
          <div style={{ color: 'red' }}>
            {error_password}
          </div>
        </Grid>
      )}
    </div>
  );
}

const DetailsField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'white',
    },
    '& input': {
      color: 'white',
    },
    '&:hover fieldset': {
      borderColor: 'white',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'white',
    },
  },
});

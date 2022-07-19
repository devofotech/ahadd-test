import { Grid, TextField } from '@material-ui/core';
import { Button } from 'reactstrap';
import { User, Lock } from '@Assets/Icons';
import Mail from '@material-ui/icons/MailOutline';

export default function LoginForm(h) {
  return (
    <div>
      <Grid item container xs={12} justify="space-around" alignItems="center">
        {h.isForgotPassword ? <Mail width="20" />
          : <User width="20" />}
        <Grid item container xs={10}>
          <TextField
            onKeyDown={h.onKeyDown}
            id="standard-basic"
            label={h.isForgotPassword ? 'Email' : 'Username'}
            style={{ width: '100%' }}
            value={h.email}
            onChange={(e) => h.setEmail(e.target.value)}
          />
        </Grid>
      </Grid>
      {!h.isForgotPassword && (
        <Grid item container xs={12} justify="space-around" alignItems="center">
          <Lock width="20" />
          <Grid item container xs={10} style={{ flexFlow: 'row' }}>
            <TextField
              onKeyDown={h.onKeyDown}
              id="standard-password-input"
              label="Password"
              type="password"
              value={h.password}
              onChange={(e) => h.setPassword(e.target.value)}
              autoComplete="current-password"
              style={{ width: '100%' }}
            />
          </Grid>
        </Grid>
      )}
      <div className="d-flex flex-column py-2">
        <h6
          className="text-center py-2 pointer"
          onClick={h.toggleForgotPassword}
          style={{ color: '#abc4c2', fontSize: 12 }}
        >
          {h.isForgotPassword ? 'Back to Login' : 'Forgot your Password?'}
        </h6>
        {/* <h6
          className="text-center py-2"
          style={{ color: '#abc4c2', fontSize: 12 }}
        >
          Don&apos;t have an account?&nbsp;
          <span className="pointer font-weight-bold color-text-primary">Sign Up</span>
        </h6> */}
      </div>
      <Button
        onClick={() => h.attemptLoginOrPasswordReset()}
        color="warning"
        className="btn-block mx-auto w-75"
        style={{
          backgroundColor: 'var(--primary-color)', borderRadius: '10px', borderColor: 'none',
        }}
      >
        <p className="text-white">{h.isForgotPassword ? 'RESET PASSWORD' : 'SIGN IN'}</p>
      </Button>
      <Grid item container xs={12} justify="space-around">
        <div className="pt-3" style={{ color: 'red', fontSize: 12, fontWeight: 700 }}>
          {h.loginError === 'fail to authenticate user' ? 'Invalid username or password' : h.loginError}
        </div>
      </Grid>
    </div>
  );
}

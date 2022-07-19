import React from 'react';
import { Grid } from '@material-ui/core';
import { KeyboardReturn } from '@material-ui/icons';
import { Label, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import googleIcon from '@Assets/Icons/googleIcon.svg';

export const LoginForm = ({
  email, setEmail, password, setPassword, isForgotPassword = false, loginError, ...h
}) => {
  return (
    <div>
      <Label
        style={{ color: '#03A69A', fontSize: 12.5, marginLeft: 5 }}
        for="email"
        children="Email address"
      />
      <input
        id="email"
        autoFocus
        onKeyDown={h.onKeyDown}
        disabled={h.loading}
        className="form-control login-input mx-auto"
        type="text"
        required=""
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {!isForgotPassword && (
        <>
          <Label
            style={{
              color: '#03A69A', marginTop: 20, marginLeft: 5, fontSize: 12.5,
            }}
            for="password"
            children="Password"
          />
          <input
            id="password"
            onKeyDown={h.onKeyDown}
            disabled={h.loading}
            className="form-control login-input mx-auto"
            type="password"
            required=""
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginBottom: 10 }}
          />
        </>
      )}
      <div className="d-flex flex-column py-2">
        <h6
          className="text-center py-2"
          onClick={h.toggleForgotPassword}
          style={{
            color: '#abc4c2', fontWeight: 400, fontSize: 12, margin: 0, cursor: 'pointer',
          }}
        >
          {isForgotPassword ? 'Back to Login' : 'Forgot your Password?'}
        </h6>
        <h6
          className="text-center py-2"
          style={{
            color: '#abc4c2', fontWeight: 400, fontSize: 12, margin: 0,
          }}
        >
          Don&apos;t have an account?&nbsp;
          <Link to="/sign-up">
            <span style={{ fontWeight: 600, color: '#03A69A', cursor: 'pointer' }}>Sign Up</span>
          </Link>
        </h6>
      </div>
      <Button
        className="btn-block mx-auto"
        style={{ backgroundColor: '#03A69A', borderRadius: '5px' }}
        onClick={() => h.attemptLoginOrPasswordReset()}
        children={isForgotPassword ? 'RESET PASSWORD' : 'LOGIN'}
      />
      {/* {!isForgotPassword && (
        <Button
          className="btn-block mx-auto"
          style={{ backgroundColor: '#fff', borderRadius: '5px' }}
          onClick={() => window.location.replace(`${process.env.REACT_APP_ENDPOINT_URL}auth/google`)}
          children={(
            <div className="d-flex" style={{ justifyContent: 'space-evenly', color: 'gray' }}>
              <img src={googleIcon} width={25} />
              LOGIN WITH GOOGLE
            </div>
          )}
        />
      )} */}
      <a href="https://georaise.com/">
        <div className="d-flex align-items-center mt-2">
          <KeyboardReturn style={{ color: '#03A69A', width: 16 }} />
          <h6
            className="text-center py-2"
            style={{
              fontWeight: 600, color: '#03A69A', cursor: 'pointer', fontSize: 12, marginLeft: 5
            }}
          >
            Back to landing page&nbsp;
          </h6>
        </div>
      </a>
      <Grid item container xs={12} justify="space-around">
        <div className="pt-3" style={{ color: 'red', fontSize: 12, fontWeight: 700 }}>
          {loginError === 'fail to authenticate user' ? 'Invalid username or password' : loginError}
        </div>
      </Grid>
    </div>
  );
};

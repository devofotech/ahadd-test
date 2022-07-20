import { Container, Grid } from '@material-ui/core';
import plus_ahadd from '@Assets/Images/plus_ahadd.svg';
import highway_ahadd from '@Assets/Images/highway_ahadd.svg';
import moment from 'moment';
import { Redirect } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '@Context/Auth';
import LoginForm from './LoginForm';

export default function LandingPageAhadd(h) {
  const { token } = useContext(AuthContext);
  const is_login = h.location.pathname.includes('login');
  if (token && h.user !== 'logged out') return <Redirect to={h.from} />;
  return (
    <>
      <Container maxWidth="false" className="px-0">
        <Grid container alignItems="center" justify="space-around" style={{ height: '100vh' }}>
          <Grid item xs={12} lg={6} xl={7} alignItems="center">
            <img
              src={highway_ahadd}
              style={{ height: '100vh' }}
            />
          </Grid>
          <Grid item container xs={12} lg={6} xl={5} justify="center">
            <Grid item xs={12} direction="column" justify="space-between" alignItems="center" className="px-5">
              <div className="text-center mx-auto d-flex justify-content-center align-items-end">
                <img
                  src={plus_ahadd}
                  className="img-fluid"
                  style={{ width: '28rem', paddingBottom: '0.75rem' }}
                />
              </div>
              <Grid className="flex-standard" direction="column">
                <p style={{ color: '#0061AA', fontWeight: 'bold' }}>Automated Highway Asset Defect Detection</p>
                <p className="text-wrap text-dark mt-2" style={{ fontSize: 14, width: '28rem' }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Utenim ad minim veniam, quis nostrud exercitation ullamco laborisnisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </Grid>
              <Grid>
                {is_login && <LoginForm {...h} />}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <div className="d-none d-xl-block">
        <Grid container justify="center" alignItems="center" className="footer">
          <p className="my-auto text-dark" style={{ fontSize: 11 }}>
            {moment().year()} AHADD - Automated Highway Asset Defect Detection powered by&nbsp;
            <a href="https://ofo.my" target="_blank" rel="noopener noreferrer">
              OFO Tech
            </a>
          </p>
        </Grid>
      </div>
    </>
  );
}

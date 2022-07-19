import { Container, Grid } from '@material-ui/core';
import login_video from '@Assets/Videos/login_video.webm';
import logo_raise from '@Assets/Images/supervision2_nobg.svg';
import moment from 'moment';
import { Redirect } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '@Context/Auth';
import LoginForm from './LoginForm';

export default function LandingPageSupervision(h) {
  const { token } = useContext(AuthContext);
  const is_login = h.location.pathname.includes('login');
  if (token && h.user !== 'logged out') return <Redirect to={h.from} />;
  return (
    <>
      <Container>
        <Grid container alignItems="center" justify="space-around" style={{ height: '100vh' }}>
          <Grid item container lg={4} justify="center">
            <Grid item xs={12} direction="column" justify="space-between" alignItems="center">
              <Grid>
                <div className="text-center mx-auto">
                  <img
                    src={logo_raise}
                    className="img-fluid mb-4 pb-0"
                    style={{ width: '60%' }}
                  />
                </div>
              </Grid>
              <Grid>
                {is_login && <LoginForm {...h} />}
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={8} alignItems="center">
            <video width="100%" autoPlay muted loop>
              <source src={login_video} type="video/webm" />
              Your browser does not support the video tag.
            </video>
          </Grid>
        </Grid>
      </Container>
      <Grid container justify="center" alignItems="center" className="footer">
        <p className="my-auto text-dark" style={{ fontSize: 11 }}>
          {moment().year()} RAISE - Reality Asset e-Information System powered by&nbsp;
          <a href="https://ofo.my" target="_blank" rel="noopener noreferrer">
            OFO Tech
          </a>
        </p>
      </Grid>
    </>
  );
}

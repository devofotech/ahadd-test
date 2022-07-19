import {
  Container, Row, Col, Card, CardBody,
} from 'reactstrap';
import { Grid } from '@material-ui/core';
import moment from 'moment';
import logo_raise from '@Assets/Images/geoRaise_logo_gradient.png';
import { Redirect } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '@Context/Auth';
import { LoginForm } from './LoginForm';
import ResetPasswordForm from './ResetPasswordForm';
import './newstyle.css';

export default function LandingPageGalaxy(h) {
  const { token } = useContext(AuthContext);
  const is_login = h.location.pathname.includes('login');
  const is_reset = h.location.pathname.includes('reset-password');
  if (token && h.user !== 'logged out') return <Redirect to={h.from} />;

  return (
    <div className="login-page">
      <div className="fullscreen-video" style={{ zIndex: 0 }}>
        <video className="login-bg-video" type="video/webm" src={`${process.env.REACT_APP_S3}/static/media/bg-video.mp4`} autoPlay muted loop />
      </div>

      <Container>
        <Row className="justify-content-center">
          <Col lg={4}>
            <Card
              className="d-flex mx-auto"
              style={{
                backgroundColor: 'rgb(10, 80, 70, 0.12)',
                border: '0px',
                zIndex: 2,
                width: '80%',
              }}
            >
              <CardBody className="d-flex-column p-4 position-relative">
                <div className="text-center mx-auto">
                  <img
                    src={logo_raise}
                    className="img-fluid mb-4 pb-0"
                    style={{ width: '36%' }}
                  />
                </div>
                {is_login && <LoginForm {...h} />}
                {is_reset && <ResetPasswordForm />}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <Grid container justify="center" alignItems="center" className="footer" style={{ backgroundColor: '#03A69A' }}>
        <p className="my-auto" style={{ color: 'white', fontSize: 11 }}>
          {moment().year()} geoRÄISE™ - A Smarter Way To Manage Your Assets
        </p>
      </Grid>
    </div>
  );
}

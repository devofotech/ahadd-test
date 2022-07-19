import { Container, Grid } from '@material-ui/core';
import logo_raise from '@Assets/Images/geoRaise_logo_gradient.png';
import moment from 'moment';

function PrivacyPolicy() {
  return (
    <>
      <Container>
        <Grid style={{ marginTop: 10 }}>
          <div className="text-center mx-auto">
            <img src={logo_raise} height={40} />
          </div>
        </Grid>
        <Grid container alignItems="center" justify="space-around" style={{ height: '90vh' }}>
          <div>
            <h2>Privacy Policy</h2>
            <br />
            <div style={{ textAlign: 'justify' }}>
              <p>
                OFO TECH is committed to protect the privacy and security of any
                personal data that Company may provide through the forms/surveys
                posted on-line. Personal data includes information that can be
                linked or directed to a specific individual for example name,
                address, phone number or email address. Should OFO TECH asks the
                Company to provide certain information by which an
                individual/personnel can be identified when using this website, then
                the Company can be assured that it will only be used for such
                purpose it is requested. In accordance with Personal Data Protection
                Act 2010 of Malaysia (PDPA), any personal data provided by the
                Company shall be protected according to the Act and SME Corp.
                Malaysia shall not be held liable nor responsible for any
                information and/or contents in this Form/surveys that has been
                revealed and/or abused at large and/or already within public
                knowledge and for any risks and/or occurrences by publishing any of
                the contents and informationgiven herein. All the information
                provided by the Company is for the utilization of SME Corp. Malaysia
                and its verified strategic partners.
              </p>
              <br />
              <p>
                <strong>Your Privacy</strong>
              </p>
              <p>
                This site is to explain the privacy policy which includes the use
                and the protection of information submitted by the visitor. If you
                make any transaction or send e-mails which contain personal
                information, this information may be shared with other public
                agencies to help us to provide better and effective service
              </p>
              <br />
              <p>
                <strong>Information gathered</strong>
              </p>
              <p>
                No personal data will be collected while browsing this website
                unless information provided by you through e-mails or online
                application.
              </p>
              <br />
              <p>
                <strong>
                  What will happen if I were to make links to other website?
                </strong>
              </p>
              <p>
                The website has links to other websites. The privacy policy is only
                applicable for this website. Other websites linked may have their
                own Privacy Policy which differs from our policy and users are
                advised to read through and understand the Privacy Policy for every
                website visited.
              </p>
              <br />
              <p>
                <strong>Amendments Policy</strong>
              </p>
              <p>
                If the Privacy Policy is amended, the amendments will be updated for
                this website. While browsing through this website, you will be noted
                with the relevant information gathered, the way that the information
                is used depending on the situation, and how the information is
                shared with others.
              </p>
            </div>
          </div>
        </Grid>
      </Container>
      <Grid container justify="center" alignItems="center" className="footer">
        <p className="my-auto" style={{ fontSize: 11 }}>
          {moment().year()} geoRÄISE - Reality Asset e-Information System powered by&nbsp;
          <a href="https://ofo.my" target="_blank" rel="noopener noreferrer" className="color-text-primary">
            OFO Tech
          </a>
        </p>
      </Grid>
    </>
  );
}

export default PrivacyPolicy;

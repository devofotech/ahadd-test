import HeaderImg from '@Assets/Images/about-us-header.svg';
import { Grid } from '@material-ui/core';
import moment from 'moment';

const HeaderText = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

function AboutUs() {
  return (
    <div
      style={{
        background: '#fff', flex: 1, height: '100%', minHeight: '100vh', position: 'relative',
      }}
    >
      <Grid style={{ position: 'relative' }}>
        <div style={{ background: '#4C7281' }}>
          <img src={HeaderImg} width="100%" style={{ opacity: '55%' }} />
        </div>
        <div style={{ ...HeaderText }}>
          <p style={{ fontSize: 22, color: '#fff' }}>PLUS</p>
          <p style={{ fontSize: 24, fontWeight: 700, color: '#fff' }}>AUTOMATED HIGHWAY ASSET<br />DEFECT DETECTION (AHADD)</p>
        </div>
      </Grid>
      <Grid
        className="pb-4"
        container
        style={{
          height: 'auto', paddingLeft: 350, paddingRight: 350, marginTop: 50,
        }}
      >
        <div className="d-flex">
          <h3 style={{ fontSize: 30, color: '#5B6272' }}>About&nbsp;Us&nbsp;&nbsp;</h3>
          <div style={{ textAlign: 'justify', marginLeft: 60 }}>
            <p style={{ color: '#5B6272', fontSize: 14 }}>
              Published on 2021. Accessible through PLUS intranet and PLUSGeospatial is a web-based Mapping (GIS / Geospatial)
              application system. Display all PLUS assets in the form of maps and integrate with other system (TEMAN, ADAMS, BIM, Traffic).
            </p>
            <p style={{ marginTop: 30, color: '#5B6272', fontSize: 14 }}>
              PLUSGeospatial capable to simulate the analysis for slope, water direction, traffic routing and navigation.
              Other than that, the application has capability to allow internal users to experience the new GIS map viewing
              together with 360 degree street and aerial level panoramic view.
            </p>
          </div>
        </div>
        <div className="d-flex mt-5">
          <h3 style={{ fontSize: 30, color: '#5B6272' }}>Disclaimer</h3>
          <div style={{ textAlign: 'justify', marginLeft: 60 }}>
            <p style={{ color: '#5B6272', fontSize: 14 }}>
              This map is the sole property of Projek Lebuhraya Usahasama Berhad (&quot;PLUS Berhad&quot;)
              and PLUS Berhad is not liable for any loss or damage caused by the usage of any information obtained from this website.
              PLUS Berhad and its representative does not make any warranty, representation or guarantee as to the content,
              accuracy or completeness of any of the map data.
            </p>
            <p style={{ marginTop: 30, color: '#5B6272', fontSize: 14 }}>
              All aspects of the data provided herein are susceptible to a degree of error due to the complexities of the process involved
              in compiling and mapping the data. All materials contained on this site are distributed and transmitted AS IS without warranties
              of any kind, either express or implied including without limitation, warranties of title or implied warranties of merchantability
              or fitness for a particular purpose and PLUS Berhad reserves the right to change, remove or add to the information provided on this
              system at any time and without any notice.
            </p>
            <p style={{ marginTop: 30, color: '#5B6272', fontSize: 14 }}>
              In no event shall PLUS Berhad become liable to users of this data for any loss or damages arising from the use, operation or
              modification of the data and your use of this map is subject to PLUS Berhad being indemnified against any loss whatsoever.
              The visual presentation of data is being provided strictly as a courtesy, and not as an obligation.
            </p>
          </div>
        </div>
      </Grid>
      <div className="flex-standard position-absolute" style={{ bottom: -10, left: '50%', transform: 'translate(-50%, 0)' }}>
        <p style={{ fontSize: 11 }}>
          {moment().year()} AHADD - Automated Highway Asset Defect Detection powered by&nbsp;
          <a href="https://ofo.my" target="_blank" rel="noopener noreferrer" className="color-text-primary">
            OFO Tech
          </a>
        </p>
      </div>
    </div>
  );
}

export default AboutUs;

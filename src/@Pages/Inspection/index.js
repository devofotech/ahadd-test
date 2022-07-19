/* eslint-disable complexity */
import React from 'react';
import { useParams } from 'react-router-dom';
import { Grid, makeStyles } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import Tour from 'reactour';
import Navbar from '@Components/Navbar';
import Map from '@Components/MapV2';
import Button from '@Components/Button'
import DialogCarousel from './DialogCarousel/index';
import './mapcustomdraw.css';

import Hook from './hook';
import SideBar from './SideBar';
import ActionBar from './ActionBar';
import MainWorkspace from './MainWorkspace';
import VideoActionBar from './VideoActionBar';

const useStyles = makeStyles(() => ({
  toggleButton: {
    backgroundColor: 'white',
    color: 'var(--primary-color)',
    border: '2px solid var(--primary-color)',
    height: '38px',
    fontFamily: 'CeraProRegular',
    '&.Mui-selected': {
      backgroundColor: 'var(--primary-color)',
      border: '2px solid var(--primary-color)',
      color: 'white !important',
    },
  },
}));

export default function Inspection(props) {
  const { inspection_session } = useParams();
  const h = Hook({ ...props, InspectionId: inspection_session });
  const classes = useStyles();
  const isDeveloper = props.user?.raise_role === 'developer';
  const showImageActionBar = h.tab === 0 && !!Object.keys(h.mainImage).length;
  const showVideoActionBar = h.tab === 1 && !!Object.keys(h.mainVideo).length;
  const handleToggleViewType = (e, v) => !!v && h.setToggleAnnotationView(v);
  return (
    <>
      <div className="w-100 d-flex justify-content-between align-items-center">
        <Tour
          steps={stepsAnnotate}
          isOpen={h.openAnnotateTour}
          onRequestClose={() => h.setOpenAnnotateTour(false)}
          showNumber={false}
          showNavigationNumber={false}
          showCloseButton={false}
          getCurrentStep={(curr) => h.setCurrentStep(curr)}
          nextButton={<Button>NEXT</Button>}
          prevButton={prevButton(h.currentStep)}
          lastStepNextButton={<Button>GOT IT!</Button>}
        />
        <Navbar
          to={false}
          text="INSPECTION"
          subtext={h.inspections?.length ? h.inspections[0]['Inspection.name'] : ''}
        />
        <div className="d-flex justify-content-end align-items-center" style={{ gap: 20 }}>
          <ToggleButtonGroup
            value={h.toggleAnnotationView}
            exclusive
            onChange={handleToggleViewType}
            size="small"
          >
            <ToggleButton className={`${classes.toggleButton} ${classes.toggleLeft}`} value="image">
              Image
            </ToggleButton>
            <ToggleButton className={`${classes.toggleButton} ${classes.toggleRight}`} value="map">
              &nbsp;&nbsp;Map&nbsp;&nbsp;
            </ToggleButton>
          </ToggleButtonGroup>
          <DialogCarousel title="How to Annotate Image" name="annotate_image" style={{ marginRight: 20, fontSize: 28 }} {...h} />
        </div>
      </div>
      <Grid container item xs={12} spacing={2}>
        <Grid container item xs={12} lg={showImageActionBar || showVideoActionBar ? 9 : 12} spacing={2}>
          <Grid item xs={12} className="mapgrid" data-tut="workspace">
            {h.toggleAnnotationView === 'image' ? <MainWorkspace {...h} buttonTour="annotate-button" />
              : (
                <Map
                  filtered_projects={h.images.map(d => ({ ...d, lat: d.lat ?? h.asset_details.lat, lng: d.lng ?? h.asset_details.lng }))}
                  selected_project={h.ImgIdxForMap}
                  set_selected_project={h.setImgIdxForMap}
                  project={h.mainImage}
                  mapStyle={{
                    maxHeight: '60vh', minHeight: '60vh', minWidth: '71vw', maxWidth: '71vw',
                  }}
                  iconType="WithImage"
                  isInspection
                />
              )}
          </Grid>
          <Grid item xs={12} data-tut="annotate-sidebar">
            <SideBar {...h} />
          </Grid>
        </Grid>
        {showImageActionBar && (
          <Grid item md={12} lg={3} data-tut="annotate-list">
            {!!Object.keys(h.mainImage).length && <ActionBar {...h} isDeveloper={isDeveloper} />}
          </Grid>
        )}
        {showVideoActionBar && (
          <Grid item md={12} lg={3} data-tut="annotate-list">
            {!!Object.keys(h.mainVideo).length && <VideoActionBar {...h} isDeveloper={isDeveloper} />}
          </Grid>
        )}
      </Grid>
    </>
  );
}

function prevButton(currStep) {
  return (
    currStep === 0 ? <Button disabled>PREVIOUS</Button> : <Button>PREVIOUS</Button>
  );
}

const stepsAnnotate = [
  {
    selector: '[data-tut="workspace"]',
    content: () => (
      <>
        <h3 style={{ color: 'black', textAlign: 'center' }}>Annotation Canvas </h3>
        <hr />
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </>
    ),
  },
  {
    selector: '[data-tut="annotate-sidebar"]',
    content: () => (
      <>
        <h3 style={{ color: 'black', textAlign: 'center' }}>Annotation Sidebar </h3>
        <hr />
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </>
    ),
  },
  {
    selector: '[data-tut="annotate-list"]',
    content: () => (
      <>
        <h3 style={{ color: 'black', textAlign: 'center' }}>Annotation Action Bar </h3>
        <hr />
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </>
    ),
  },
  {
    selector: '[data-tut="annotate-button"]',
    content: () => (
      <>
        <h3 style={{ color: 'black', textAlign: 'center' }}>Annotation Button </h3>
        <hr />
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </>
    ),
  },
];

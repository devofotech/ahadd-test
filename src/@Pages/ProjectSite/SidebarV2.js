/* eslint-disable max-len */
import { useState } from 'react';
import { Box, Grid } from '@material-ui/core';
import { ReportIcon } from '@Assets/Icons';
import Dropdown from '@Components/Dropdown';
import Button from '@Components/Button';
import AssetDetail from '@Components/AssetDetail/v2';
import { CameraAlt } from '@material-ui/icons';
import DemoLabel from '@Assets/Images/demo-label.svg';
import Tour from 'reactour';
import { RankingAhaddIcon } from '@Assets/Icons/RankingAhaddIcon';
import moment from 'moment';
import BarChart from '@Components/BarChart/v2';
import CycleDialog from './components/CycleDialog';

export default function SidebarV2(props) {
  const hasSeverity = ![92, 93].includes(props.project.id);
  const hasProjectPhasePackage = ![92, 93].includes(props.project.id);
  const hasPhasePageAccess = !!props.selectedPhaseWithViewPageAccess.length;
  const [currentStep, setCurrentStep] = useState(0);
  const [openCycleDialog, setOpenCycleDialog] = useState(false);
  const [cycleChart, setCycleChart] = useState();
  const onSave = (cycle, year) => setCycleChart(`Cycle ${cycle}, ${moment(year).format('YYYY')}`);

  return (
    <>
      <CycleDialog
        openCycleDialog={openCycleDialog}
        setOpenCycleDialog={setOpenCycleDialog}
        onSave={onSave}
      />
      <Grid item xs={12} md={3} id="top" className="sidebar position-relative" style={{ zIndex: 1 }}>
        <Tour
          steps={sidebarSteps}
          isOpen={props.isFirstSidebarTour}
          onRequestClose={() => { props.setIsFirstSidebarTour(false); window.localStorage.setItem('tour', false); }}
          showNumber={false}
          showNavigationNumber={false}
          showCloseButton={false}
          disableInteraction
          getCurrentStep={(curr) => setCurrentStep(curr)}
          nextButton={<Button>NEXT</Button>}
          prevButton={prevButton(currentStep)}
          lastStepNextButton={<Button>GOT IT!</Button>}
        />
        {!!props.project.is_demo && (
          <img
            src={DemoLabel}
            style={{
              position: 'absolute',
              zIndex: 99,
              top: -7,
              left: 5,
            }}
          />
        )}
        <div
          className="position-absolute"
          style={{
            position: 'absolute', zIndex: 99, top: 5, right: 5,
          }}
        >
          <RankingAhaddIcon type="unrank" />
        </div>
        <img
          className="sidebar-img"
          style={{ objectFit: 'cover', width: '100%', aspectRatio: '3/2' }}
          src={`${process.env.REACT_APP_S3}/${!!props.project.image ? props.project.image : 'static/media/defaultAssetImg-01.png'}`}
          alt="asset"
          data-tut="side-img"
        />
        <div className="d-flex justify-content-center flex-wrap" style={{ flex: 1 }}>
          <Box className="mt-2" style={{ width: '90%' }} data-tut="side-dropdown">
            <Dropdown
              selectedItem={props.selected_project}
              setSelectedItem={props.set_selected_project}
              itemList={props.filtered_projects.map(e => e.name)}
              size="big"
              Hx="h6"
            />
          </Box>

          <div className="d-flex mt-2" style={{ width: '90%' }}>
            <Button className="mx-auto" style={{ backgroundImage: 'linear-gradient(to right, var(--main-color), var(--primary-color))', borderRadius: 18, width: '45%' }}>
              <CameraAlt style={{ fontSize: 16, marginLeft: 4, marginRight: 4 }} />
              INSPECTION
            </Button>

            <Button className="mx-auto color-gradient-inline" style={{ borderRadius: 18, width: '45%' }}>
              <ReportIcon color="var(--light-color)" transform="scale(0.55)" />
              DOCUMENT
            </Button>
          </div>

          <AssetDetail details={props.project} assetTypeList={props.assetTypeList} />

          <div className="py-2 flex-standard" style={{ width: '90%', backgroundColor: '#022C64', borderRadius: 10 }}>
            <p style={{ color: 'var(--light-color)' }}>INSPECTION DETECTION RATING</p>
          </div>

          <Grid container spacing={1} className="mt-2" style={{ width: '90%' }}>
            <Grid item xs={6}>
              <div className="d-flex align-items-center pointer" style={{ border: '1px solid black', padding: 3, borderRadius: 5 }} onClick={() => setOpenCycleDialog(true)}>
                <div style={{ width: '1.5rem', height: '1.5rem', backgroundColor: '#008FFB' }} />
                <p style={{ paddingLeft: 5, color: 'var(--dark-color)', fontSize: 14 }}>
                  {cycleChart ?? 'Select Cycle'}
                </p>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="d-flex align-items-center" style={{ border: '1px solid black', padding: 3, borderRadius: 5 }}>
                <div style={{ width: '1.5rem', height: '1.5rem', backgroundColor: '#4FD8AF' }} />
                <p style={{ paddingLeft: 5, color: 'var(--dark-color)', fontSize: 14 }}>Cycle 1, 2023</p>
              </div>
            </Grid>
          </Grid>
          <BarChart />
        </div>
      </Grid>
    </>
  );
}

function prevButton(currStep) {
  return (
    currStep === 0 ? <Button disabled>PREVIOUS</Button> : <Button>PREVIOUS</Button>
  );
}

const sidebarSteps = [
  {
    selector: '[data-tut="side-img"]',
    content: () => (
      <>
        <h3 style={{ color: 'black', textAlign: 'center' }}>Map Side Panel</h3>
        <hr />
        This is your side panel of your asset. All information of your assets will be shown here
      </>
    ),
  },
  {
    selector: '[data-tut="side-dropdown"]',
    content: () => (
      <>
        <h3 style={{ color: 'black', textAlign: 'center' }}>Asset Dropdown</h3>
        <hr />
        You may choose to view any added assets here
      </>
    ),
  },
  {
    selector: '[data-tut="side-phase"]',
    content: () => (
      <>
        <h3 style={{ color: 'black', textAlign: 'center' }}>Asset Phase Dropdown</h3>
        <hr />
        You may toggle displayed data according to the asset project phase
      </>
    ),
  },
  {
    selector: '[data-tut="side-chart"]',
    content: () => (
      <>
        <h3 style={{ color: 'black', textAlign: 'center' }}>Inspection Summary</h3>
        <hr />
        The summary of inspection details and status will be shown here
      </>
    ),
  },
  {
    selector: '[data-tut="side-buttons"]',
    content: () => (
      <>
        <h3 style={{ color: 'black', textAlign: 'center' }}>Asset Details</h3>
        <hr />
        All the asset details such as inspection data, 3D data, 360 data and report will be shwon here.
      </>
    ),
  },
  {
    selector: '[data-tut="control-layer"]',
    content: () => (
      <>
        <h3 style={{ color: 'black', textAlign: 'center' }}>Geospatial Layers</h3>
        <hr />
        All the GIS and imagery layers (vector and raster) will be available here.
      </>
    ),
  },
  // ...
];

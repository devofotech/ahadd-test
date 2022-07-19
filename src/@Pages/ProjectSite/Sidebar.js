/* eslint-disable complexity */
/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import {
  Box, Grid, IconButton, Tooltip,
} from '@material-ui/core';
import {
  CCTV, Search, Cube3D, Icon360, ReportIcon,
} from '@Assets/Icons';
import { MapIcon } from '@Assets/Icons/TopbarIcons';

import Dropdown from '@Components/Dropdown';
import RoundedButton from '@Components/RoundedButton';
import Button from '@Components/Button';

import AssetDetail from '@Components/AssetDetail';
import ProjectSummary from '@Components/AssetDetail/ProjectSummary';
import PieChart from '@Components/PieChart';
import {
  ChevronLeft, ChevronRight, HelpOutline, InfoOutlined,
} from '@material-ui/icons';
import DemoLabel from '@Assets/Images/demo-label.svg';
import Tour from 'reactour';
import SidebarCards from './SidebarCards';

export default function Property(props) {
  const hasSeverity = ![92, 93].includes(props.project.id);
  const hasProjectPhasePackage = ![92, 93].includes(props.project.id);
  const hasPhasePageAccess = !!props.selectedPhaseWithViewPageAccess.length;
  const [currentStep, setCurrentStep] = useState(0);
  return (
    <Grid item xs={12} md={3} id="top" className="sidebar position-relative" style={{ zIndex: 1 }}>
      <Tour
        steps={sidebarSteps}
        isOpen={props.isFirstSidebarTour}
        onRequestClose={() => {props.setIsFirstSidebarTour(false); window.localStorage.setItem('tour', false)}}
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
      <img
        className="sidebar-img"
        style={{ objectFit: 'cover', width: '100%', aspectRatio: '3/2' }}
        src={`${process.env.REACT_APP_S3}/${!!props.project.image ? props.project.image : 'static/media/defaultAssetImg-01.png'}`}
        alt="asset"
        data-tut="side-img"
      />
      <div className="d-flex justify-content-center flex-wrap" style={{ flex: 1 }}>

        <div className="d-flex align-items-center my-2">
          <h6 className="text-light text-center w-100 mr-1">ASSET INFO</h6>
          <Tooltip title="View Asset Info Description">
            <IconButton disableRipple style={{ backgroundColor: 'transparent', padding: 0 }}>
              <InfoOutlined onClick={() => props.setOpenInfoDialog(true)} />
            </IconButton>
          </Tooltip>
          <Tooltip title="View Sidebar Guide">
            <IconButton disableRipple style={{ backgroundColor: 'transparent', padding: 0 }}>
              <HelpOutline onClick={() => props.setIsFirstSidebarTour(true)} />
            </IconButton>
          </Tooltip>
        </div>

        <Box style={{ width: '90%' }} data-tut="side-dropdown">
          <Dropdown
            selectedItem={props.selected_project}
            setSelectedItem={props.set_selected_project}
            itemList={props.filtered_projects.map(e => e.name)}
            size="big"
            Hx="h6"
          />
        </Box>

        <AssetDetail details={props.project} assetTypeList={props.assetTypeList} />
        {/* <ProjectSummary details={props.project} phases={props.phases} /> */}

        {hasProjectPhasePackage && hasPhasePageAccess && (
          <div className="d-flex w-100 px-3">
            <Box style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }} data-tut="side-phase">
              <Dropdown
                selectedItem={props.category}
                setSelectedItem={props.set_category}
                itemList={props.selectedPhaseWithViewPageAccess.map(m => m?.name)}
                size="small"
                Hx="h6"
              />
            </Box>
          </div>
        )}

        <div className="position-relative" data-tut="side-chart">
          {{
            0: hasSeverity && <PieChart isRoundOff details={props.project} type="status" />,
            1: hasSeverity && <PieChart isRoundOff details={props.project} type="severity" />,
          }[props.piechartType]}
          {[0].includes(props.piechartType) && <ChevronRight className="position-absolute pointer" style={{ right: 20, top: '50%', color: 'var(--primary-color)' }} onClick={() => props.setPiechartType(1)} />}
          {[1].includes(props.piechartType) && <ChevronLeft className="position-absolute pointer" style={{ left: 20, top: '50%', color: 'var(--primary-color)' }} onClick={() => props.setPiechartType(0)} />}
        </div>

        <div
          className="d-flex justify-content-around flex-wrap"
          style={{
            flex: 1, marginBottom: 30, marginRight: 20, marginLeft: 20,
          }}
          data-tut="side-buttons"
        >
          {[
            {
              text: 'Inspection',
              to: `/project/inspection?id=${props.project?.id}`,
              children: <Search color="var(--light-color)" />,
              page_access: hasPhasePageAccess,
            },
            {
              text: 'CCTV',
              to: `/project/cctv?id=${props.project?.id}`,
              children: <CCTV color="var(--light-color)" />,
              page_access: !!props.project.has_cctv,
            },
            {
              text: '3D Data',
              to: `/project/asset/3d?id=${props.project?.id}`,
              children: <Cube3D color="var(--light-color)" />,
              page_access: !!props.parentProps.user?.can_view_3d,
            },
            {
              text: 'Virtual Tour',
              to: `/project/asset/360?id=${props.project?.id}`,
              children: <Icon360 color="var(--light-color)" />,
              page_access: !!props.parentProps.user?.can_view_360,
            },
            {
              text: 'PDF Report',
              to: `/project/report?id=${props.project?.id}`,
              children: <ReportIcon color="var(--light-color)" transform="scale(0.85)" />,
              page_access: !!props.parentProps.user?.can_view_report,
            },
            // {
            //   text: 'Mapping',
            //   to: '/project/mapping',
            //   children: <MapIcon />,
            // },
          ].map(e => (
            e.page_access && (
              <div style={{ flex: 1 }}>
                <RoundedButton scrollTo="top" scrollTop {...e} onClick={() => props.parentProps.setIsMap(false)} />
              </div>
            )
          ))}
        </div>
      </div>
    </Grid>
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

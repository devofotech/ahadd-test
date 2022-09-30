/* eslint-disable max-len */
import { useState, useEffect } from 'react';
import { Box, Grid } from '@material-ui/core';
import { ReportIcon } from '@Assets/Icons';
import Dropdown from '@Components/Dropdown';
import Button from '@Components/Button';
import AssetDetail from '@Components/AssetDetail/v2';
import { CameraAlt } from '@material-ui/icons';
import DemoLabel from '@Assets/Images/demo-label.svg';
import { RankingAhaddIcon } from '@Assets/Icons/RankingAhaddIcon';
import moment from 'moment';
import BarChart from '@Components/BarChart/v2';
import { Link } from 'react-router-dom';
import CycleDialog from './components/CycleDialog';

export default function SidebarV2(props) {
  const [currentStep, setCurrentStep] = useState(0);
  const [openCycleDialog, setOpenCycleDialog] = useState(false);
  const [cycleChart, setCycleChart] = useState();
  const [selectedDate, handleDateChange] = useState(new Date());
  const [cycle, setCycle] = useState();
  const [severity, set_severity] = useState([
    { x: 1, y1: 0, y2: 0 },
    { x: 2, y1: 0, y2: 0 },
    { x: 3, y1: 0, y2: 0 },
    { x: 4, y1: 0, y2: 0 },
    { x: 5, y1: 0, y2: 0 },
  ]);
  const onSave = () => setCycleChart(`Cycle ${cycle}, ${moment(selectedDate).format('YYYY')}`);
  const inspectionList = props.project.aerial_inspections_details.sort((a, b) => b.date.localeCompare(a.date));

  useEffect(() => {
    setCycleChart();
    setCycle();
    set_severity(prevVal => prevVal.map(ann => ({ ...ann, y1: 0, y2: 0 })));
    if (!inspectionList.length) return;
    inspectionList[0].InspectionFiles.forEach(element => {
      if (!element.Annotations.length) return;
      element.Annotations.forEach(element2 => {
        set_severity(prevVal => prevVal.map(ann => (ann.x === element2.SeverityId ? ({ ...ann, y2: ann.y2 + 1 }) : ann)));
      });
    });
  }, [props.project]);

  useEffect(() => {
    if (!inspectionList.length) return;
    if (!cycleChart) return;
    set_severity(prevVal => prevVal.map(ann => ({ ...ann, y1: 0 })));
    const selectedInspectionList = inspectionList.filter(e => e.cycle === cycle && e.year === Number(moment(selectedDate).format('YYYY')));
    selectedInspectionList.forEach(element => {
      if (!element.InspectionFiles.length) return;
      element.InspectionFiles.forEach(element2 => {
        if (!element2.Annotations.length) return;
        element2.Annotations.forEach(element3 => {
          set_severity(prevVal => prevVal.map(ann => (ann.x === element3.SeverityId ? ({ ...ann, y1: ann.y1 + 1 }) : ann)));
        });
      });
    });
  }, [cycleChart]);

  return (
    <>
      <CycleDialog
        openCycleDialog={openCycleDialog}
        setOpenCycleDialog={setOpenCycleDialog}
        onSave={onSave}
        selectedDate={selectedDate}
        handleDateChange={handleDateChange}
        cycle={cycle}
        setCycle={setCycle}
      />
      <Grid item xs={12} md={3} id="top" className="sidebar position-relative" style={{ zIndex: 1 }}>
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
          <RankingAhaddIcon type={props.project.RankingId} />
        </div>
        <img
          className="sidebar-img"
          style={{ objectFit: 'cover', width: '100%', aspectRatio: '3/2' }}
          src={`${process.env.REACT_APP_S3}/${!!props.project.image ? props.project.image : 'static/media/defaultAssetImg-01.png'}`}
          alt="asset"
        />
        <div className="d-flex justify-content-center flex-wrap" style={{ flex: 1 }}>
          <Box className="mt-2" style={{ width: '90%' }}>
            <Dropdown
              selectedItem={props.selected_project}
              setSelectedItem={props.set_selected_project}
              itemList={props.filtered_projects.map(e => e.name)}
              size="big"
              Hx="h6"
            />
          </Box>

          <div className="d-flex mt-2" style={{ width: '90%' }}>
            <Link to={`/project/inspection?id=${props.project?.id}`} className="mx-auto flex-standard" style={{ width: '45%' }}>
              <Button className="w-100 color-gradient-inline box-shadow-bottom" style={{ borderRadius: 18 }}>
                <CameraAlt style={{ fontSize: 16, marginLeft: 4, marginRight: 4 }} />
                INSPECTION
              </Button>
            </Link>

            {/* <Link to={`/project/report?id=${props.project?.id}`} className="mx-auto flex-standard" style={{ width: '45%' }}> */}
            <div className="mx-auto flex-standard" style={{ width: '45%' }}>
              <Button className="w-100 color-gradient-disabled box-shadow-bottom" disabled style={{ borderRadius: 18 }}>
                <ReportIcon color="var(--light-color)" transform="scale(0.55)" />
                DOCUMENT
              </Button>
            </div>
            {/* </Link> */}
          </div>

          <AssetDetail
            details={props.project}
            assetTypeList={props.assetTypeList}
            regions={props.regions}
            sections={props.sections}
          />

          <div className="py-2 flex-standard" style={{ width: '90%', backgroundColor: '#022C64', borderRadius: 10 }}>
            <p style={{ color: 'var(--light-color)' }}>INSPECTION DETECTION RATING</p>
          </div>

          <Grid container spacing={1} className="mt-2" style={{ width: '90%' }}>
            <Grid item xs={6}>
              <div className="d-flex align-items-center pointer" style={{ border: '1px solid black', padding: 3, borderRadius: 5 }} onClick={() => setOpenCycleDialog(true)}>
                <div style={{ width: '1.5rem', height: '1.5rem', backgroundColor: '#008FFB' }} />
                <p style={{ paddingLeft: 5, color: 'var(--dark-color)', fontSize: 14 }}>
                  {!props.project.aerial_inspections_details.length ? props.project.lastinspection : cycleChart ?? 'Select Cycle'}
                </p>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="d-flex align-items-center" style={{ border: '1px solid black', padding: 3, borderRadius: 5 }}>
                <div style={{ width: '1.5rem', height: '1.5rem', backgroundColor: '#4FD8AF' }} />
                <p style={{ paddingLeft: 5, color: 'var(--dark-color)', fontSize: 14 }}>{!props.project.aerial_inspections_details.length ? props.project.lastinspection : `Cycle ${inspectionList[0]?.cycle}, ${inspectionList[0]?.year}`}</p>
              </div>
            </Grid>
          </Grid>
          <BarChart data={severity} />
        </div>
      </Grid>
    </>
  );
}

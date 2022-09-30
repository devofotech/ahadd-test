/* eslint-disable complexity */
/* eslint-disable max-lines */
/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import { useState, useEffect } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import {
  Button, Grid, IconButton, Tooltip,
} from '@material-ui/core';
import Table from '@Components/MaterialTable/v7';
import Navbar from '@Components/Navbar';
import DeleteDialog from '@Components/DeleteDialog';
import moment from 'moment';
import { isValidHttpUrl, initialsFromUser, getOpenCaseFromInspection } from '@Helpers';
import { ViewIcon, DeleteIcon } from '@Assets/Icons';
import DataNotFoundImg from '@Assets/Images/Data-not-found3.svg';
import HighlightTabs from '@Components/HighlightTabs';
import MainContentContainer from '@Components/MainContentContainer';
import CenteredLoadingContainer from '@Components/CenteredLoadingContainer';
import { Delete, Search } from '@material-ui/icons';
import PaginationV2 from '@Components/PaginationV2';
import CreateInspection from './CreateInspection';
import Hook from './hook';
import ViewSummary from './ViewSummary';
import SetMainImage from './SetMainImage';

const columns = [
  { name: 'No', selector: 'id' },
  { name: 'Cycle', selector: 'cycle' },
  { name: 'Year', selector: 'year' },
  {
    name: 'Inspection Date',
    selector: 'inspectionAt',
    options: {
      setCellHeaderProps: () => ({
        style: { textAlign: 'center' },
      }),
      setCellProps: () => ({
        style: { textAlign: 'center' },
      }),
    },
  },
  {
    name: 'Upload Time',
    selector: 'createdAt',
    options: {
      setCellHeaderProps: () => ({
        style: { textAlign: 'center' },
      }),
      setCellProps: () => ({
        style: { textAlign: 'center' },
      }),
    },
  },
  {
    name: 'Uploader',
    selector: 'userimage',
    options: {
      setCellHeaderProps: () => ({
        style: { textAlign: 'center' },
      }),
      setCellProps: () => ({
        style: { textAlign: 'center' },
      }),
    },
  },
  {
    name: 'Summary',
    selector: 'summary',
    options: {
      setCellHeaderProps: () => ({
        style: { textAlign: 'center' },
      }),
      setCellProps: () => ({
        style: { textAlign: 'center' },
      }),
    },
  },
  {
    name: 'Actions',
    selector: 'actions',
    options: {
      setCellHeaderProps: () => ({
        style: { textAlign: 'center' },
      }),
      setCellProps: () => ({
        style: { textAlign: 'center' },
      }),
    },
  },
];

const searchCategory = [
  { key: 'id', label: 'ID' },
  { key: 'cycle', label: 'Cycle' },
  { key: 'year', label: 'Year' },
];

const avstyle = {
  width: '2.5em',
  height: '2.5em',
  borderRadius: '50%',
  fontSize: '12px',
  backgroundColor: '#506288',
  color: 'white',
  objectFit: 'cover',
  paddingBottom: '1px',
  marginLeft: 'auto',
  marginRight: 'auto',
  boxShadow: '0.5px 0.5px 4px 1px rgba(0,0,0,0.1)',
};

export default function InspectionSessionAhadd(props) {
  const h = Hook(props);
  const [data, setData] = useState([]);

  const ViewBtn = ({ id }) => (
    <Link to={`/inspection/${id}`}>
      <Tooltip title="View Inspection" placement="top">
        <IconButton className="color-gradient-inline" style={{ width: 18, height: 18 }}>
          <Search style={{ color: 'white' }} height="18px" width="18px" />
        </IconButton>
      </Tooltip>
    </Link>
  );

  const DeleteBtn = (inspection) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Tooltip title="Delete Inspection" placement="top">
          <Delete
            style={{
              color: 'red', width: 34, height: 34, cursor: 'pointer',
            }}
            onClick={() => setOpen(true)}
          />
        </Tooltip>
        <DeleteDialog
          open={open}
          setOpen={setOpen}
          selected={inspection}
          deleteFunction={() => h.deleteInspection(inspection.id)}
        />
      </>
    );
  };

  const userImage = ({ User, pilot_name }) => {
    return (
      User.image ? (
        <Tooltip title={pilot_name} className="flex-standard" placement="top">
          <img
            src={isValidHttpUrl(User.image)
              ? User.image
              : `${process.env.REACT_APP_S3}/${User.image}`}
            style={avstyle}
          />
        </Tooltip>
      ) : (
        <Tooltip title={pilot_name} placement="top">
          <div className="flex-standard" style={avstyle}>{initialsFromUser({ name: pilot_name })}</div>
        </Tooltip>
      )
    );
  };
  const actionBtn = (x) => {
    return (
      <div className="d-flex justify-content-around align-items-center" style={{ gap: 2, transform: 'scale(0.8)' }}>
        <ViewBtn {...x} />
        <SetMainImage {...x} onSave={h.setMainImage} />
        <DeleteBtn {...x} />
      </div>
    );
  };

  useEffect(() => {
    const filteredInspections = h.inspectionSessions.sort((a, b) => b.date.localeCompare(a.date));
    const modifiedInspections = filteredInspections.map(getOpenCaseFromInspection);
    setData(modifiedInspections.map(eachSession => ({
      ...eachSession,
      cycle: <p style={{ color: 'var(--main-color)' }}>{`Cycle ${eachSession?.cycle}`}</p>,
      year: <p style={{ color: 'var(--main-color)' }}>{eachSession?.year}</p>,
      inspectionAt: moment(eachSession.date).format('DD MMMM YYYY'),
      createdAt: moment(eachSession.createdAt).format('DD MMMM YYYY / HH:mm'),
      userimage: userImage(eachSession),
      summary: <ViewSummary {...eachSession} />,
      actions: actionBtn(eachSession),
    })));
  }, [h.inspectionSessions]);
  useEffect(() => {
    if (!h.project_id) return;
    if (!props.selectedPhaseWithViewPageAccess.length) return <Redirect to="/project" />;
  }, [h.project_id]);
  return (
    <MainContentContainer>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Navbar
          to="/project/"
          text="Image Inspection"
        />
        <CreateInspection
          project={props.project}
          onSave={h.createInspection}
          projectPhase={props.selectedPhaseList}
          user={props.user}
        />
      </div>
      {h.isLoading ? <CenteredLoadingContainer height="50vh" size={75} hasText text="sessions" /> : (
        <Grid
          container
          item
          xs={12}
          style={{
            paddingLeft: 0, paddingRight: 20, paddingTop: 0, paddingBottom: 20,
          }}
          className="flex-standard"
        >
          <Grid item xs={12}>
            <PaginationV2 keysList={searchCategory} totalData={data?.length} {...h} />
          </Grid>
          {!!h.inspectionSessions?.length ? (
            <Grid item xs={12}>
              <Table {...h} columns={columns} tableData={data} />
            </Grid>
          ) : (
            <div className="d-flex justify-content-center">
              <img src={DataNotFoundImg} style={{ width: '30vw' }} />
            </div>
          )}
        </Grid>
      )}
    </MainContentContainer>
  );
}

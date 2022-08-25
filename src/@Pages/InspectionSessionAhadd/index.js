/* eslint-disable complexity */
/* eslint-disable max-lines */
/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import { useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import {
  Button, Grid, IconButton, Tooltip,
} from '@material-ui/core';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
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
import CreateInspection from './CreateInspection';
import Hook from './hook';
import ViewSummary from './ViewSummary';
import SetMainImage from './SetMainImage';

const columns = [
  {
    name: 'Number',
    selector: 'id',
    options: {
    },
  },
  {
    name: 'Cycle',
    selector: 'cycle',
    options: {
    },
  },
  {
    name: 'Year',
    selector: 'year',
    options: {
    },
  },
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
  const selectedInspections = h.inspectionType === 'Map'
    ? h.inspectionSessions.filter(f => !!f.is_map)
    : h.inspectionSessions.filter(f => !f.is_map);
  const history = useHistory();
  const [selectedInspection, setSelectedInspection] = useState();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const selectedTab = h.tabsList.find(({ value }) => value === h.tab);
  const filteredAssetType = Object.assign(props.assetTypeList?.filter(f => f.id == props.project?.AssetTypeId));

  const ViewBtn = ({ id }) => (
    <IconButton
      style={{ width: 24, height: 24 }}
      onClick={() => {
        if (h.isDefaultSeverities) {
          const MySwal = withReactContent(Swal);
          MySwal.fire({
            title: 'The selected asset not being assign with severity yet. Please assign it first',
            confirmButtonText: 'Go to Severity Page',
            showCancelButton: true,
            confirmButtonColor: 'var(--primary-color)',
            cancelButtonText: 'Do Nothing',
          }).then((result) => {
            if (result.isConfirmed) history.push('/severity-level');
          });
          return;
        }
        if (h.isDefaultIssues) {
          const MySwal = withReactContent(Swal);
          MySwal.fire({
            title: `The selected asset not being assign with issue status for ${filteredAssetType[0]?.name} yet. Please assign it first`,
            confirmButtonText: 'Go to Issue Status Page',
            showCancelButton: true,
            confirmButtonColor: 'var(--primary-color)',
            cancelButtonText: 'Do Nothing',
          }).then((result) => {
            if (result.isConfirmed) history.push('/issue-status-level');
          });
          return;
        }
        history.push(`/${h.inspectionType === 'Map' ? 'map-annotate' : 'inspection'}/${id}`);
      }}
    >
      <ViewIcon height="24px" width="24px" />
    </IconButton>
  );

  const DeleteBtn = (inspection) => (
    <IconButton onClick={() => { setSelectedInspection(inspection); setOpen(true); }} style={{ width: 24, height: 24 }}>
      <DeleteIcon height="20px" width="20px" />
    </IconButton>
  );
  const userImage = ({ User, pilot_name }) => {
    return (
      User.image ? (
        <Tooltip title={pilot_name} className="flex-standard">
          <img
            src={isValidHttpUrl(User.image)
              ? User.image
              : `${process.env.REACT_APP_S3}/${User.image}`}
            style={avstyle}
          />
        </Tooltip>
      ) : (
        <Tooltip title={pilot_name}>
          <div className="flex-standard" style={avstyle}>{initialsFromUser({ name: pilot_name })}</div>
        </Tooltip>
      )
    );
  };
  const actionBtn = () => {
    return (
      <div className="d-flex justify-content-around align-items-center" style={{ gap: 2 }}>
        <IconButton className="color-gradient-inline" style={{ width: 18, height: 18 }}>
          <Search style={{ color: 'white' }} height="18px" width="18px" />
        </IconButton>
        <SetMainImage />
        <Delete style={{
          color: 'red', width: 34, height: 34, cursor: 'pointer',
        }}
        />
      </div>
    );
  };
  const summaryBtn = () => {
    return (
      <ViewSummary />
    );
  };

  useEffect(() => {
    const filteredInspections = selectedInspections.filter(x => {
      const toFilter = Object.keys(selectedTab?.filter ?? []);
      for (let idx = 0; idx < toFilter.length; idx++) {
        const keys = toFilter[idx];
        if (!(x[keys] === selectedTab.filter[keys])) return false;
      }
      return true;
    }).sort((a, b) => b.date.localeCompare(a.date));
    const modifiedInspections = filteredInspections.map(getOpenCaseFromInspection);
    setData(modifiedInspections.map(eachSession => ({
      ...eachSession,
      cycle: <p style={{ color: 'var(--main-color)' }}>Cycle 2</p>,
      year: <p style={{ color: 'var(--main-color)' }}>2022</p>,
      inspectionAt: moment(eachSession.date).format('DD MMMM YYYY'),
      createdAt: moment(eachSession.createdAt).format('DD MMMM YYYY / HH:mm'),
      userimage: userImage(eachSession),
      summary: summaryBtn(),
      actions: actionBtn(),
    })));
  }, [h.inspectionSessions, h.inspectionType, h.tab]);
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
        {props.selectedPhaseWithViewPageAccess.some((phase) => phase.addPageAccess) && (
          <CreateInspection
            project={props.project}
            onSave={h.createInspection}
            projectPhase={props.selectedPhaseList}
            user={props.user}
            modules={h.assetModuleList}
            inspectionType={h.inspectionType}
          />
        )}
      </div>
      {!!h.assetModuleList[h.currentAssetPhase?.id] && (
        <HighlightTabs
          items={h.tabsList}
          tab={h.tab}
          setTab={h.setTab}
          selectedInspection={selectedInspections}
        />
      )}
      <DeleteDialog
        open={open}
        setOpen={setOpen}
        selected={selectedInspection}
        setSelected={setSelectedInspection}
        deleteFunction={() => h.deleteInspection(selectedInspection.id)}
      />
      {h.isLoading ? <CenteredLoadingContainer height="50vh" size={75} hasText text="sessions" /> : (
        <Grid
          item
          xs={12}
          style={{
            paddingLeft: 0, paddingRight: 20, paddingTop: 20, paddingBottom: 20,
          }}
        >
          {!!data?.length ? (
            <Table {...h} columns={columns} tableData={data} />
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

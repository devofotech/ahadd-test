/* eslint-disable complexity */
/* eslint-disable max-lines */
/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import { useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import {
  Grid, IconButton, Tooltip,
} from '@material-ui/core';
import { HelpOutline } from '@material-ui/icons';
import Swal from 'sweetalert2';
import Tour from 'reactour';
import withReactContent from 'sweetalert2-react-content';
import Table from '@Components/MaterialTable/v4';
import Navbar from '@Components/Navbar';
import DeleteDialog from '@Components/DeleteDialog';
import moment from 'moment';
import { isValidHttpUrl, initialsFromUser, getOpenCaseFromInspection } from '@Helpers';
import { ViewIcon, DeleteIcon } from '@Assets/Icons';
import DataNotFoundImg from '@Assets/Images/Data-not-found3.svg';
import RaiseSyncIcon from '@Assets/Icons/sync.svg';
import RaiseMobileIcon from '@Assets/Icons/mobile.svg';
import RaiseWebIcon from '@Assets/Icons/web.svg';
import CustomToggleButton from '@Components/CustomToggleButton';
import HighlightTabs from '@Components/HighlightTabs';
import MainContentContainer from '@Components/MainContentContainer';
import Button from '@Components/Button';
import CenteredLoadingContainer from '@Components/CenteredLoadingContainer';
import CreateInspection from './CreateInspection';
import EditInspection from './EditInspection';
import OpenIssue from './OpenIssue';
import Hook from './hook';

const columns = [
  {
    name: 'ID',
    selector: 'id',
    align: 'center',
  },
  {
    name: 'NAME',
    selector: 'name',
    align: 'left',
    minWidth: 240,
  },
  {
    name: 'DESCRIPTION',
    selector: 'description',
    align: 'left',
    minWidth: 150,
  },
  {
    name: 'UPLOADER',
    selector: 'userimage',
    align: 'center',
  },
  {
    name: 'DATE',
    selector: 'inspectionAt',
    align: 'center',
  },
  {
    name: 'FROM',
    selector: 'app',
    align: 'center',
  },
  {
    name: 'STATUS',
    selector: 'status',
    align: 'center',
  },
  {
    name: 'ACTION',
    selector: 'actions',
    align: 'center',
  },
];

const iconstyle = {
  width: '2.7em',
  height: '2.7em',
};

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

export default function InspectionSession(props) {
  const h = Hook(props);
  const selectedInspections = h.inspectionType === 'Map'
    ? h.inspectionSessions.filter(f => !!f.is_map)
    : h.inspectionSessions.filter(f => !f.is_map);
  const history = useHistory();
  const [selectedInspection, setSelectedInspection] = useState();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const selectedTab = h.tabsList.find(({ value }) => value === h.tab);
  const filteredAssetType = Object.assign(props.assetTypeList?.filter(f => f.id == props.project?.AssetTypeId));
  const IconFrom = ({ title, icon }) => (
    <Tooltip title={title}>
      <img
        src={icon}
        style={iconstyle}
        alt={title}
      />
    </Tooltip>
  );
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
  const EditBtn = (inspection) => (
    <EditInspection
      inspectionId={inspection.id}
      inspectionName={inspection.name}
      inspectionDescription={inspection.description}
      inspectionUploader={inspection.pilot_name}
      inspectionDate={inspection.date}
      onSave={h.updateInspection}
    />
  );

  const statusIssue = (inspection) => (
    <>
      {h.accessOpenIssueList.includes(h.selectedPhaseId)
        && (<OpenIssue setIsUpdated={h.setIsUpdated} projectDetails={props.project} currentUser={props.user} {...inspection} />)}
    </>
  );

  const renamingApp = (nameApp) => {
    const namAppSelector = !nameApp ? 'raiseweb' : nameApp;
    const iconlabel = process.env.REACT_APP_BRANCH === 'galaxy' ? 'geoRÄISE' : 'i-Supervision';
    return (
      <>
        {{
          raisemobile: <IconFrom title={`${iconlabel} Mobile`} icon={RaiseMobileIcon} />,
          raisesync: <IconFrom title={`${iconlabel} Sync`} icon={RaiseSyncIcon} />,
          raiseweb: <IconFrom title={`${iconlabel} Web`} icon={RaiseWebIcon} />,
        }[namAppSelector]}
      </>
    );
  };

  const ActionSection = (inspection) => {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ gap: 2 }} data-tut="inspection-actions">
        {h.currentAssetPhase?.addPageAccess && <ViewBtn id={inspection.id} />}
        {h.currentAssetPhase?.editPageAccess && <EditBtn {...inspection} />}
        {h.currentAssetPhase?.removePageAccess && <DeleteBtn {...inspection} />}
      </div>
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
      inspectionAt: moment(eachSession.date).format('DD/MM/YYYY'),
      actions: ActionSection(eachSession),
      userimage: eachSession.User.image ? (
        <Tooltip title={eachSession.pilot_name}>
          <img
            src={isValidHttpUrl(eachSession.User.image)
              ? eachSession.User.image
              : `${process.env.REACT_APP_S3}/${eachSession.User.image}`}
            style={avstyle}
          />
        </Tooltip>
      ) : (
        <Tooltip title={eachSession.pilot_name}>
          <div className="flex-standard" style={avstyle}>{initialsFromUser({ name: eachSession.pilot_name })}</div>
        </Tooltip>
      ),
      app: renamingApp(eachSession.app),
      status: statusIssue(eachSession),
    })));
  }, [h.inspectionSessions, h.inspectionType, h.tab]);
  useEffect(() => {
    if (!h.project_id) return;
    if (!props.selectedPhaseWithViewPageAccess.length) return <Redirect to="/project" />;
  }, [h.project_id]);
  return (
    <MainContentContainer>
      <Tour
        steps={!!data.length ? stepsIfHaveInspection : stepsIfNoInspection}
        isOpen={h.openInspectionTour}
        onRequestClose={() => h.setOpenInspectionTour(false)}
        showNumber={false}
        showNavigationNumber={false}
        showCloseButton={false}
        getCurrentStep={(curr) => setCurrentStep(curr)}
        nextButton={<Button>NEXT</Button>}
        prevButton={prevButton(currentStep)}
        lastStepNextButton={<Button>GOT IT!</Button>}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Navbar
          to="/project/"
          text="Inspection Session"
          subtext={props.filtered_projects[props.selected_project]?.name}
        />
        <div className="d-flex align-items-center">
          <IconButton disableRipple style={{ backgroundColor: 'transparent', padding: 0 }}>
            <HelpOutline onClick={() => h.setOpenInspectionTour(true)} />
          </IconButton>
          &nbsp;&nbsp;
          <div data-tut="toggle-button">
            <CustomToggleButton {...h} />
          </div>
          &nbsp;&nbsp;
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
            <Table
              tableHead
              columns={columns}
              tableData={props.data ?? data}
              tableMinWidth={300}
              tableMaxHeight={900}
            />
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

function prevButton(currStep) {
  return (
    currStep === 0 ? <Button disabled>PREVIOUS</Button> : <Button>PREVIOUS</Button>
  );
}

const stepsIfHaveInspection = [
  {
    selector: '[data-tut="toggle-button"]',
    content: () => (
      <>
        <h3 style={{ color: 'black', textAlign: 'center' }}>Toggle Image/Map Inspection </h3>
        <hr />
        Quickly toggle between image or map inspection.
      </>
    ),
  },
  {
    selector: '[data-tut="inspection-actions"]',
    content: () => (
      <>
        <h3 style={{ color: 'black', textAlign: 'center' }}>Inspection Actions</h3>
        <hr />
        View details of the inspection by clicking the 'Eye' icon. You may delete the inspection by clicking the 'Trash' icon.
      </>
    ),
  },
];
const stepsIfNoInspection = [
  {
    selector: '[data-tut="toggle-button"]',
    content: () => (
      <>
        <h3 style={{ color: 'black', textAlign: 'center' }}>Toggle Image/Map Inspection </h3>
        <hr />
        Quickly toggle between image or map inspection.
      </>
    ),
  },
];

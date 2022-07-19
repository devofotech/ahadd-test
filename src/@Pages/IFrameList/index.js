import Table from '@Components/Table';
import Navbar from '@Components/Navbar';
import moment from 'moment';
import { IconButton, Tooltip } from '@material-ui/core';
import { ViewIcon } from '@Assets/Icons';
import DataNotFoundImg from '@Assets/Images/Data-not-found3.svg';
import { Delete } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import DeleteDialog from '@Components/DeleteDialog';
import MainContentContainer from '@Components/MainContentContainer';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  cancelBtn: { backgroudColor: 'var(--primary-color)', color: 'var(--primary-color)' },
  submitBtn: { backgroundColor: 'red', color: '#FFFFFF' },
}));

const columns = [
  {
    name: 'ID',
    selector: 'id',
    sortable: true,
    width: '65px',
  },
  {
    name: 'NAME',
    selector: 'name',
    sortable: true,
    wrap: true,
    width: '60%',
  },
  {
    name: 'CREATED DATE',
    selector: 'date',
    sortable: true,
    width: '20%',
    center: true,
  },
  {
    name: 'ACTIONS',
    selector: 'action',
    width: '15%',
    center: true,
    headerStyle: () => {
      return { display: 'flex', justifyContent: 'center' };
    },
  },
];

const filter_src = (type, project) => project?.asset_files.filter(x => (Array.isArray(type) ? type.includes(x.media_type) : x.media_type === type));
const filter_src_phase = (phaseId, src) => src.filter(x => x.ProjectPhaseId === phaseId);
const formatDate = (time) => moment(time).format('h:mm a DD/MM/YYYY');

const ViewBtn = ({ path }) => (
  <Tooltip title="View 3D file">
    <a href={path} target="_blank" rel="noreferrer">
      <IconButton>
        <ViewIcon height="24px" width="24px" />
      </IconButton>
    </a>
  </Tooltip>
);

export default ({
  projects = [], selected_project = 0, type = '', category, selectedPhaseList: phases, openDeleteDialog, setOpenDeleteDialog, deleteFile, selectedFile, setSelectedFile, user,
}) => {
  const classes = useStyles();
  let filterType = null;
  if (type === '3d') {
    filterType = ['3d', 'point-clouds', 'potree'];
  }
  if (type === 'threeSixty') {
    filterType = ['360-models'];
  }
  let src = filter_src(filterType ?? type, projects[selected_project]);
  if (src?.length && phases[category]?.id) src = filter_src_phase(phases[category]?.id, src);
  const title = {
    '3d': '3D Data',
    threeSixty: '360 Virtual Tour',
  };
  const showDelete = type === '3d' ? !!phases[category]?.remove3DAccess : !!phases[category]?.remove360Access;

  const path = {
    '3d': '3d',
    threeSixty: '360',
  };

  const DeleteBtn = (s) => (
    <Tooltip title="Delete 3D file">
      <IconButton style={{ width: 12, height: 12 }} onClick={() => { setOpenDeleteDialog(true); setSelectedFile(s); }}>
        <Delete style={{ color: 'red' }} />
      </IconButton>
    </Tooltip>
  );

  const ActionSection = (s) => {
    return (
      <div className="d-flex justify-content-around align-items-center" style={{ gap: 5 }}>
        <ViewBtn path={s.path} />
        {showDelete && <DeleteBtn {...s} />}
      </div>
    );
  };

  const data = src?.map(s => ({
    ...s,
    // name: <Link to={`/project/asset/${path[type]}/${s.id}`}><p>{s.name}</p></Link>,
    name: <a href={s.path} target="_blank" rel="noreferrer"><p>{s.label ?? s.name}</p></a>,
    date: formatDate(s.createdAt),
    action: ActionSection(s),
  }));

  if (!['3d', 'threeSixty'].includes(type)) return <Redirect to="/project" />;
  if (type === '3d' && !user?.can_view_3d) return <Redirect to="/project" />;
  if (type === 'threeSixty' && !user?.can_view_360) return <Redirect to="/project" />;

  return (
    <MainContentContainer>
      <Navbar
        to="/project/"
        text={title[type]}
      />

      <div className="overflow-auto" style={{ padding: '15px', maxHeight: '50rem' }}>
        {!!data?.length ? (
          <Table columns={columns} data={data} />
        ) : (
          <div className="d-flex justify-content-center">
            <img src={DataNotFoundImg} style={{ width: '30vw' }} />
          </div>
        )}
      </div>

      <DeleteDialog
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
        selected={selectedFile}
        setSelected={setSelectedFile}
        deleteFunction={() => deleteFile(selectedFile.id)}
      />
    </MainContentContainer>
  );
};

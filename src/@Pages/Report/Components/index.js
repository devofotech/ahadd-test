import { IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { ShareIcon, DownloadIconV2 } from '@Assets/Icons';

export const ActionBtn = () => {
  return (
    <div className="d-flex justify-content-around align-items-center" style={{ gap: 0 }}>
      <IconButton style={{ width: 16, height: 16 }}>
        <ShareIcon />
      </IconButton>
      <IconButton style={{ width: 16, height: 16 }}>
        <DownloadIconV2 />
      </IconButton>
      <DeleteButton />
    </div>
  );
};

const DeleteButton = ({ report, setOpen, setSelectedReport }) => (
  <IconButton style={{ width: 16, height: 16 }} onClick={() => { setSelectedReport(report); setOpen(true); }}>
    <Delete style={{ color: 'red' }} />
  </IconButton>
);

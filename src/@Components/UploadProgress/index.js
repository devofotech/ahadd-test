import { useState } from 'react';
import { LinearProgress, IconButton, Tooltip } from '@material-ui/core';
import { Close, Maximize } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { formatBytes } from '@Helpers';
import CircularProgress from './CircularProgress';

const CustomLinearProgress = withStyles(() => ({
  barColorPrimary: {
    backgroundColor: 'var(--primary-color)',
  },
}))(LinearProgress);

export default (props) => {
  const [open, setOpen] = useState(true);

  const onClickCancelAll = () => {
    props.setFiles([]);
    props.uploadFiles.forEach(xhr => {
      xhr.abort();
    });
  };

  // const onClickCancelOne = (idx) => {
  //   const newFilesArray = [...props.files]
  //   newFilesArray.splice(idx, 1);
  //   props.setFiles(newFilesArray);
  //   props.uploadFiles[idx].abort();
  // };

  return (
    <div
      className="position-fixed mx-2 rounded-top border-bottom-0 bg-white"
      style={{
        right: 0,
        bottom: 0,
        width: 350,
        border: '1px solid var(--dark-color)',
        zIndex: 1,
      }}
    >
      <Head {...props} setOpen={setOpen} onClickCancelAll={onClickCancelAll} />
      {open && <FileList {...props} />}
    </div>
  );
};

const Head = ({ onClickCancelAll, ...props }) => {
  const totalSize = parseInt(props.files.reduce((a, b) => a + b.size, 0) / 1);
  const doneUploaded = props.percentages.reduce((a, b) => (b === 100 ? a + 1 : a), 0);
  const totalSizeUploaded = parseInt(props.files.reduce((a, b, i) => (props.percentages[i] / 100) * b.size + a, 0) / 1);
  const totalProgress = parseInt((totalSizeUploaded / totalSize) * 100);
  const sizeUploaded = (formatBytes(totalSize, false) * (totalProgress / 100)).toFixed(1);

  return (
    <>
      <div className="p-3">
        <div className="d-flex justify-content-between">
          <h5 className="text-dark">{props.title}</h5>
          <Maximize className="pointer" onClick={() => props.setOpen(prev => !prev)} />
        </div>
        <div className="d-flex justify-content-between">
          <p className="color-tertiary">
            {doneUploaded} of {props.files?.length.toLocaleString()} ({sizeUploaded}/{formatBytes(totalSize)})
          </p>
          <p className="pointer text-dark" onClick={onClickCancelAll}>CANCEL ALL</p>
        </div>
      </div>
      <CustomLinearProgress variant="determinate" value={totalProgress} style={{ backgroundColor: '#CED2DB' }} />
    </>
  );
};

const FileList = ({ files, percentages }) => {
  return (
    <div className="overflow-auto" style={{ maxHeight: 360 }}>
      {files?.map((file, idx) => (
        <div className="d-flex align-items-center pl-3 pt-1">
          <CircularProgress value={percentages[idx]} style={{ color: 'var(--primary-color)' }} />
          <Tooltip placement="top" title={file.name} arrow>
            <p className="mx-2 text-truncate text-dark">{file.name}</p>
          </Tooltip>
          {/* <IconButton className="ml-auto" onClick={() => onClickCancelOne(idx)}>
            <Close />
          </IconButton> */}
        </div>
      ))}
    </div>
  );
};

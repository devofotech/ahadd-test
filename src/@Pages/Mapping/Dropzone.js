import React from 'react';
import { Close } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { useDropzone } from 'react-dropzone';
import { IconDropzone } from '@Assets/Icons/CardIcons';
import clsx from 'clsx';
import './dropzone.css';

const useStyles = makeStyles(() => ({
  noData: {
    height: '-webkit-fill-available',
    margin: 0,
    // position: 'absolute',
    top: '25%',
    // if using css transform
    // top: '50%',
    // transform: 'translateY(-50%)',
  },
}));
export default function Dropzone({ files, setFiles, height }) {
  const classes = useStyles();
  const { getRootProps, getInputProps, open } = useDropzone({
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
    accept: 'image/jpeg, image/png',
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) => Object.assign(file, {
          preview: URL.createObjectURL(file),
        })),
      );
    },
  });
  const isScrollable = files.length > 0 ? { overflowY: 'scroll' } : { alignItems: 'center' };
  const isChildCustomCenter = files.length > 0 ? 'dropzone d-flex flex-column noData' : clsx('dropzone d-flex flex-column noData', classes.noData);
  const isCustomStyle = height ? { height } : {};

  return (
    <div
      style={{
        ...{
          border: '1px solid #ced4da',
          borderRadius: 10,
          height: 700,
        },
        ...isScrollable,
        ...isCustomStyle,
      }}
      className="d-flex flex-column"
    >
      <div
        {...getRootProps({ className: isChildCustomCenter })}
      >
        <input {...getInputProps()} />

        {files.length > 0 ? (
          files.map((file, fileidx) => {
            console.log('xxx file', file);
            return (
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ flex: 1 }} key={file.name}>
                  <img
                    src={file.preview}
                    style={{
                      width: '100%',
                      height: '100px',
                      objectFit: 'contain',
                    }}
                    alt="uploaded"
                  />
                </div>
                <div style={{ flex: 4, display: 'flex', flexDirection: 'row' }}>
                  <p style={{ flex: 9, fontSize: '0.9em' }}>
                    Name: {file.name} <br />
                    Size: {file.size / 1000} kb <br />
                    Type: {file.type}
                  </p>
                  <Close
                    className="cancel-button"
                    style={{ flex: 1 }}
                    onClick={() => setFiles(files.filter((xx, idx) => idx !== fileidx))}
                  />
                </div>
                <hr />
              </div>
            );
          })
        ) : (
          // <div style={{ textAlign: 'center', position: 'absolute', transform: 'translate(160%, 80%)' }}>
          <div style={{ textAlign: 'center', margin: 'auto' }}>
            {' '}
            <IconDropzone width={127.804} height={89.463} />
            <p style={{ textAlign: 'center', color: '#ADB5BD' }}>
              Drag &amp; drop your file here
              <br />
              or
              <br />
            </p>
            <button
              type="button"
              onClick={open}
              style={{
                border: '2px solid #A5A5A5',
                background: '#E9E9E9',
                fontFamily: 'Poppins',
              }}
            >
              Choose File
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

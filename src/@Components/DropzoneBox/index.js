import React from 'react';
import { Close, Delete } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import './dropzone.css';
import { IconDropzone } from '@Assets/Icons/CardIcons';
import clsx from 'clsx';
import { truncateFilenameString } from '@Helpers';
import useHook from './hook';

export default function Dropzone({
  files, setFiles, height, ...props
}) {
  const classes = useStyles();
  const { getRootProps, getInputProps, open } = useHook({ files, setFiles, ...props });
  const isScrollable = files.length > 0 ? { overflowY: 'scroll' } : { alignItems: 'center' };
  const isChildCustomCenter = files.length > 0 ? 'dropzone d-flex flex-column noData' : clsx('dropzone d-flex flex-column my-auto noData', classes.noData);
  const isCustomStyle = height ? { height } : {};

  return (
    <div
      style={{
        ...{
          border: '1px solid #ced4da',
          borderRadius: 10,
          height: 700,
          padding: 5,
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
                <div style={{ flex: 3, display: 'flex', flexDirection: 'row', marginLeft: 5 }}>
                  <p style={{ fontSize: '0.9em' }} className="flex-standard">
                    Name: {truncateFilenameString(file.name, 20)} <br />
                    Size: {file.size / 1000} kb <br />
                    Type: {file.type}
                  </p>
                  {/* <Close
                    className="cancel-button"
                    style={{ flex: 1 }}
                    onClick={() => setFiles(files.filter((xx, idx) => idx !== fileidx))}
                  /> */}
                </div>
                <div style={{ flex: 1 }} className="flex-standard">
                  <IconButton onClick={() => setFiles(files.filter((xx, idx) => idx !== fileidx))} style={{ flex: 1, backgroundColor: 'transparent' }}>
                    <Delete style={{ color: 'red' }} />
                  </IconButton>
                </div>
                <hr />
              </div>
            );
          })
        ) : (
          <>
            {' '}
            <div style={{ textAlign: 'center' }}>
              <IconDropzone width={127.804} height={89.463} />
            </div>
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
          </>
        )}
      </div>
    </div>
  );
}

const useStyles = makeStyles(() => ({
  noData: { margin: '100px 0px', top: '25%' },
}));

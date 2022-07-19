import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';
import './dropzone.css';
import { IconDropzone } from '@Assets/Icons/CardIcons';
import clsx from 'clsx';
import { formatBytes } from '@Helpers';
import useHook from './hook';

export default function Dropzone({
  files, setFiles, height: minHeight, hasButton = true, ...props
}) {
  const { getRootProps, getInputProps, open } = useHook({ files, setFiles, ...props });
  const height = !(files.length > 0) ? minHeight : val(`${minHeight}/2`).replace(/[/]/g, '');
  const isCustomStyle = minHeight ? { height: isNumber(height) ? Number(height) : height } : {};
  return (
    <div style={{ height: minHeight }}>
      <div
        style={{
          ...{
            border: '1px solid #ced4da',
            borderRadius: 10,
            height: 700,
            padding: 5,
            justifyContent: 'center',
            transition: 'all .3s',
          },
          ...isCustomStyle,
        }}
        className="d-flex flex-column"
      >
        <div
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <div onClick={open} className="py-4" style={{ cursor: 'pointer' }}>
            {' '}
            <div className="text-center">
              <IconDropzone width={127.804} height={89.463} />
            </div>
            <p className="text-center" style={{ color: '#ADB5BD' }}>
              Drag &amp; drop your file here
              <br />
              {hasButton ? 'or' : 'or Click here to upload'}
              <br />
            </p>
            {hasButton && (
              <div className="d-flex justify-content-center">
                <button
                  type="button"
                  onClick={open}
                  className="select-button"
                >
                  Choose File
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {files.length > 0 && (
        <div
          className="mt-2"
          style={{
            ...{
              height: 300,
              display: 'flex',
              flexDirection: 'column',
            },
            ...isCustomStyle,
          }}
        >
          <div className="container" style={{ padding: '10px 0 ' }}>
            <div className="row">
              <div className="col-5 text-header" style={{ marginLeft: '3%' }}>
                File Name
              </div>
              <div className="col-2 text-center text-header">
                Size
              </div>
              <div className="col-2 text-center text-header">
                Status
              </div>
              <div className="col-1 text-center text-header">
                Action
              </div>
            </div>
          </div>
          <div style={{
            overflowY: files.length > 0 ? 'scroll' : 'hidden',
            overflowX: 'hidden',
            height: '100%',
            color: '#0b2929',
            fontWeight: 550,
          }}
          >
            {files.map((file, fileidx) => {
              console.log('xxx file', file);
              return (
                <div className="container" style={{ padding: '10px 0 ' }}>
                  <div className="row">
                    <div className="col-5" style={{ marginLeft: '3%' }}>
                      {file.name}
                    </div>
                    <div className="col-2 text-center">
                      {formatBytes(file.size)}
                    </div>
                    <div className="col-2 text-center">
                      {!!files ? 'Checked' : 'File name not found'}
                    </div>
                    <div className="col-1 text-center">
                      <IconButton color="secondary" onClick={() => setFiles(files.filter((xx, idx) => idx !== fileidx))}>
                        <DeleteIcon style={{ color: 'red', fontSize: 24, marginTop: -4 }} />
                      </IconButton>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function val(str) {
  const calc = str.replace(/px|cm|vh|vw|em|rem|%|mm|in|pt|pc|ex|ch|Min|veal/gm, '');
  const unit = str.replace(/-|\+|\*|0|1|2|3|4|5|6|7|8|9\//gm, '');
  const value = antiString(calc).toString() + unit;
  return value;
}

function antiString(obj) {
  return Function(`"use strict";return (${ obj })`)();
}

const isNumber = (str) => /^\d+$/.test(str);

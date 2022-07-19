import { useState } from 'react';
import MainContentNavbar from '@Components/MainContentNavbar';
import { useParams } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import NoData from '@Assets/Images/Data-not-found3.png';

// 360 example = 'https://ofo.my/360/bukit-melawati/index.htm'

export default function IFrame({ projects = [], selected_project = 0, type = '' }) {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const asset = projects[selected_project]?.asset_files.find(e => e.id === parseInt(id));
  const onFrameLoad = () => setIsLoading(false);

  return (
    <div
      style={{
        position: 'fixed',
        top: '50px',
        bottom: '0px',
        right: '0px',
        left: '0px',
      }}
    >
      <div
        style={
          type === 'threeD'
            ? { position: 'absolute', top: '50px', zIndex: 999 }
            : { position: 'absolute', top: '20px', zIndex: 999 }
        }
      >
        <MainContentNavbar />
      </div>
      {isLoading && (
        <>
          <CircularProgress
            size={75}
            className="position-absolute"
            style={{
              top: '50%', left: '50%', marginTop: -80, marginLeft: -40, color: 'var(--primary-color)',
            }}
          />
          {type === '3d' && (
            <div
              className="position-absolute"
              style={{
                top: '59%', left: '50%', marginTop: -80, marginLeft: '-7rem', color: 'grey', fontSize: 18,
              }}
            >
              Loading 3D data. Please wait...
            </div>
          )}
        </>
      )}
      {!!asset ? (
        <iframe
          onLoad={onFrameLoad}
          src={asset.path}
          key={asset.path}
          title="type"
          frameBorder="0"
          style={{ width: '100%', height: '100%', zIndex: 998 }}
        />
      ) : (
        <div className="d-flex justify-content-center">
          <img src={NoData} style={{ width: '55vw' }} />
        </div>
      )}
    </div>
  );
}

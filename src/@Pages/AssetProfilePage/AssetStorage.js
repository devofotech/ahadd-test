/* eslint-disable complexity */
import React, { useEffect, useState } from 'react';
import CircularProgressBar from '@Components/CircularProgressBar';
import MainContentNavbar from '@Components/MainContentNavbar';
import { Button, Grid, IconButton } from '@material-ui/core';
import {
  AddOutlined, CheckBoxOutlined, CameraAlt,
} from '@material-ui/icons';
import { styled } from '@material-ui/core/styles';
import MultiColorProgressBar from '@Components/MultiColorProgressBar';
import { Link } from 'react-router-dom';
import { formatBytes, multiKeysFilter } from '@Helpers';
import {
  AssetFile, Icon360, Cube3D, ReportIcon,
} from '@Assets/Icons';
import CenteredLoadingContainer from '@Components/CenteredLoadingContainer';

const SeverityButton = styled(Button)(() => ({
  backgroundColor: 'transparent',
  color: 'var(--primary-color)',
  border: '1px solid var(--primary-color)',
  paddingBottom: '3px !important',
  width: '2rem',
}));

const filesLength = (arr, keys) => arr.filter(multiKeysFilter(keys)).length;

export default (h) => {
  const [orthoLength, setOrthoLength] = useState(0);
  const [threeDimensionLength, setThreeDimensionLength] = useState(0);
  const [inspectionPhotoLength, setInspectionPhotoLength] = useState(0);
  const [inspectionVideoLength, setInspectionVideoLength] = useState(0);
  const [reportLength, setReportLength] = useState(0);
  const [threesixtyLength, setThreesixtyLength] = useState(0);
  const usagePercentage = (h.totalSize / h.selectedStorage) * 100;

  useEffect(() => {
    if (h.asset?.InspectionFiles?.length) {
      const arrMedia = h.asset?.InspectionFiles;
      setInspectionPhotoLength(filesLength(arrMedia, { isVideo: 0 }));
      setInspectionVideoLength(filesLength(arrMedia, { isVideo: 1 }));
    }
    if (h.asset?.AssetFiles?.length) {
      const arr = h.asset?.AssetFiles;

      setOrthoLength(filesLength(arr, { media_type: 'orthophotos', is_external: false }));
      setThreeDimensionLength(
        filesLength(arr, { media_type: '3d', is_external: false })
        + filesLength(arr, { media_type: 'point-clouds', is_external: false })
        // + filesLength(arr, { media_type: 'potree', is_external: false }),
      );
      setReportLength(filesLength(arr, { media_type: 'site-reports', is_external: false }));
      setThreesixtyLength(filesLength(arr, { media_type: '360-models', is_external: false }));
    }
  }, [h.asset?.AssetFiles]);

  return (
    <Grid item xs={12} md={9}>
      <div style={{ padding: '10px 20px 0px 20px', height: '95%' }}>
        <div className="d-flex justify-content-between align-items-center">
          <MainContentNavbar to="/asset" text="Asset Storage Analysis" />
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="color-text-primary" style={{ fontSize: 14 }}>
            Learn More
          </a>
        </div>
        <Grid container xs={12} className="mt-2 p-4" style={{ borderRadius: '10px', backgroundColor: 'var(--light-color)', gap: 25 }}>
          <div className="mr-4">
            <CircularProgressBar scale={1.5} x={15} value={usagePercentage} />
          </div>
          <div className="d-flex flex-column ml-1">
            <Grid item>
              <p className="text-light">Total Asset Storage</p>
            </Grid>
            <Grid item>
              <h1 className="font-weight-bold">{formatBytes(h.asset?.asset_size, true, 2)}</h1>
            </Grid>
          </div>
        </Grid>
        <div className="my-4" style={{ borderRadius: '10px', backgroundColor: 'var(--light-color)', padding: '10px 3%' }}>
          <div className="d-flex flex-row justify-content-between align-items-center">
            <h1 className="color-primary">Asset Storage Usage</h1>
            {!!h.user?.can_view_asset_files && (
              <Link to={`/asset-file-list/${h.asset?.id}`}>
                <SeverityButton className="d-flex my-auto py-1 mr-2">
                  <AssetFile color="var(--primary-color)" height={20} width={20} />
                </SeverityButton>
              </Link>
            )}
          </div>
          <MultiColorProgressBar {...h} />
          <Grid container spacing={3} className="d-flex align-items-stretch my-3">
            {[
              {
                icon: <CameraAlt style={{ color: 'var(--light-color)' }} />,
                bg_color: '#5397FE',
                title: 'Inspection',
                image: inspectionPhotoLength,
                video: inspectionVideoLength,
                size: h.asset?.inspections_size,
              },
              {
                icon: <CheckBoxOutlined style={{ color: 'var(--light-color)' }} />,
                bg_color: '#F5533D',
                title: '2D',
                file: orthoLength,
                size: h.asset?.orthophotos_size,
                upload_button: true,
              },
              {
                icon: <Cube3D color="var(--light-color)" />,
                bg_color: '#35CC57',
                title: '3D',
                width: 20,
                file: threeDimensionLength,
                size: h.asset?.['3d_size'],
                upload_button: true,
              },
              {
                icon: <ReportIcon color="var(--light-color)" />,
                bg_color: '#FFBA0A',
                title: 'Report',
                file: reportLength,
                size: h.asset?.site_reports_size,
                upload_button: true,
              },
              {
                icon: <Icon360 style={{ color: 'var(--light-color)', padding: 0 }} />,
                bg_color: '#CC35A9',
                title: '360',
                file: threesixtyLength,
                size: h.asset?.['360_size'] ?? 0,
                upload_button: false,
              },
            ].map(data => (
              <Grid item xs={12} md={6}>
                <div className="bg-color-container p-4" style={{ height: '180px' }}>
                  <div style={{ maxHeight: '70px' }}>
                    <IconButton
                      style={{
                        backgroundColor: data.bg_color, borderRadius: 30, padding: 10, marginBottom: 5, width: 30, height: 30,
                      }}
                    >
                      {data.icon}
                    </IconButton>
                    <br />
                    <div className="d-flex justify-content-between">
                      <h3 className="color-primary font-weight-bold">{data.title} Data</h3>
                      <h3 className="color-primary font-weight-bold">{formatBytes(data.size, true, 2)} used</h3>
                    </div>
                    <br />
                    {(!!data.image || data.image == 0) && <FileUsage value={data.image} label="image(s)" />}
                    {(!!data.video || data.video == 0) && <FileUsage value={data.video} label="video(s)" />}
                    {(!!data.file || data.file == 0) && <FileUsage value={data.file} label="file(s)" />}
                  </div>
                  <br />
                  {!!data.upload_button && (
                    <div className="d-flex justify-content-end">
                      <div className="position-relative">
                        {h.isLoading ? <CenteredLoadingContainer height="10vh" size={25} /> : (
                          <Link to={`/asset/${h.asset?.id}/${data.title}`}>
                            <Button
                              variant="contained"
                              className="mt-5"
                              size="small"
                              style={{ color: '#FFFFFF', backgroundColor: h.isLoading ? '#808080a8' : 'var(--secondary-color)' }}
                              disabled={h.isLoading}
                            >
                              <AddOutlined style={{ width: 20 }} />
                              <p className="text-white">Upload {data.title} Data</p>
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </Grid>
  );
};

const FileUsage = ({ value, label }) => <p className="color-primary" style={{ fontSize: 14, marginBottom: 5, color: '#1F3566' }}>{value} {label}</p>;

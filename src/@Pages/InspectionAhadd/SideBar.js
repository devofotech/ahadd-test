import React from 'react';
import {
  Button, Grid, Tab, Tabs, Tooltip,
} from '@material-ui/core';
import { PlayCircleFilled } from '@material-ui/icons';
import TabPanel from '@Components/TabPanel/v1';
import FilterIcon from '@Assets/Icons/filter-solid.svg';
import { a11yProps } from '@Helpers';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ReactPlayer from 'react-player';
import './inspection.css';
import UploadInspectionPhoto from './UploadInspectionPhoto';
import PinLocation from './PinLocation';

export default function SideBar(props) {
  const MySwal = withReactContent(Swal);
  const tabsItems = [
    { label: 'Image', length: props.images?.length ?? 0, a11yProps: a11yProps(0), action: () => props.setTab(0) },
  ];
  if (props.inspectionType === 'image') {
    tabsItems.push({ label: 'Video', length: props.videos?.length ?? 0, a11yProps: a11yProps(1), action: () => props.setTab(1) })
  }
  return (
    <div className="paper shadow h-100" style={{ minWidth: '71vw', maxWidth: '100vw' }}>
      <Grid container>
        <Grid item xs={3}>
          <Tabs value={props.tab} onChange={(event, newValue) => props.setTab(newValue)} style={{ paddingLeft: 10 }}>
            {
              tabsItems.map((m, index) => (
                <Tab
                  label={m.label}
                  {...m.a11yProps}
                  style={{ minWidth: '115px' }}
                  component={() => (
                    <Button className="flex-standard px-4 py-2" style={{ width: '6rem' }} onClick={m.action}>
                      <p
                        className={`${'color-secondary'}`}
                        style={{ opacity: 0.9, fontWeight: props.tab == index && 650 }}
                      >
                        {m.label}&nbsp;
                      </p>
                      <div
                        className="bg-color-primary text-white flex-standard px-1"
                        style={{
                          width: 'auto', height: 15, borderRadius: 15, borderWidth: 0, fontSize: 10,
                        }}
                      >
                        {m.length}
                      </div>
                    </Button>
                  )}
                />
              ))
            }
          </Tabs>
        </Grid>
        <Grid item xs={9}>
          <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
            <Tooltip title="Filter (Coming Soon)">
              <img src={FilterIcon} style={{ padding: '15px 10px 10px 0px', cursor: 'pointer', width: '20px' }} />
            </Tooltip>
            {!props.mainImage.is_main && <PinLocation {...props} onSubmit={props.pinLocationOnMainImage} />}
            <UploadInspectionPhoto {...props} onSave={props.uploadPhoto} />
          </div>
        </Grid>
      </Grid>
      <div className="sidebar-container">
        <TabPanel value={props.tab} index={0}>
          <Grid container>
            <div className="wrapper-horizontal">
              {props.images.length > 0
                && props.images.map((image) => {
                  const isselected = image.id == props.mainImage?.id;
                  return (
                    <div className="mx-2">
                      <div
                        className={`d-flex justify-content-end img-container ${isselected ? 'inner-border-inspection' : ''}`}
                        style={{ backgroundImage: `url(${process.env.REACT_APP_S3}/${image.thumbnail ?? image.path})` }}
                        onClick={() => props.handleChangeMainImage(image.id)}
                      >
                        {!image.is_main && (
                          <h3
                            className="text-white mr-1 h-25"
                            style={{ fontSize: 16 }}
                            onClick={() => {
                              MySwal.fire({
                                title: image['Inspection.name'],
                                imageUrl: `${process.env.REACT_APP_S3}/${image.src}`,
                                imageHeight: 320,
                                imageAlt: 'Annotation Image',
                                showCancelButton: true,
                                showDenyButton: true,
                                showConfirmButton: false,
                                denyButtonText: 'Delete Image',
                                cancelButtonText: 'Do Nothing',
                              }).then((result) => {
                                /* Read more about isConfirmed, isDenied below */
                                if (result.isDenied) {
                                  props.deleteImage(image.id);
                                }
                              });
                            }}
                          >
                            • • •
                          </h3>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </Grid>
        </TabPanel>
        <TabPanel value={props.tab} index={1}>
          <Grid container className="my-1 mx-2">
            {props.videos.length > 0
              && props.videos.map((video) => {
                const isselected = video.id == props.mainVideo?.id;
                return (
                  <div
                    className="video-container wrapper-horizontal my-0 mx-1 h-100 pointer"
                    style={isselected ? { border: '2px solid var(--primary-color)', borderRadius: 7 } : {}}
                    onClick={() => props.setMainVideo(video)}
                  >
                    <Grid
                      item
                      container
                      justify="center"
                      alignItems="center"
                      className="video-img bg-secondary"
                      style={{
                        backgroundImage: `url(${process.env.REACT_APP_S3}/${video.imgSrc})`,
                        borderRadius: 5,
                      }}
                    >
                      <ReactPlayer
                        url={`${process.env.REACT_APP_S3}/${video?.vidSrc}`}
                        width="120px"
                        height="90px"
                      />
                      <PlayCircleFilled className="position-absolute" style={{ fontSize: 50 }} />
                    </Grid>
                    <h3
                      className="text-white float-right position-absolute"
                      style={{ fontSize: 16, marginLeft: 85 }}
                      onClick={() => {
                        MySwal.fire({
                          title: 'Are you sure want to delete this video?',
                          // imageUrl: `${process.env.REACT_APP_S3}/${video.imgSrc}`,
                          // imageUrl: video.imgSrc,
                          imageHeight: 320,
                          imageAlt: 'Annotation Video',
                          showCancelButton: true,
                          showDenyButton: true,
                          showConfirmButton: false,
                          denyButtonText: 'Delete Video',
                          cancelButtonText: 'Do Nothing',
                        }).then((result) => {
                          /* Read more about isConfirmed, isDenied below */
                          if (result.isDenied) {
                            props.deleteImage(video.id);
                          }
                        });
                      }}
                    >
                      • • •
                    </h3>
                  </div>
                );
              })}
          </Grid>
        </TabPanel>
      </div>
    </div>
  );
}

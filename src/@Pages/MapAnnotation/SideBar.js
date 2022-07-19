import React from 'react';
import {
  Button, Grid, Tab, Tabs, Tooltip,
} from '@material-ui/core';
import TabPanel from '@Components/TabPanel/v1';
import FilterIcon from '@Assets/Icons/filter-solid.svg';
import { a11yProps } from '@Helpers';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './inspection.css';
import TestImg from '@Assets/Images/map-test.jpeg';

export default function SideBar(props) {
  const MySwal = withReactContent(Swal);
  return (
    <div className="paper shadow h-100">
      <Grid container className="pb-1">
        <Grid item xs={3}>
          <Tabs value={props.tab} onChange={(event, newValue) => props.setTab(newValue)} style={{ paddingLeft: 10 }}>
            {
              [
                {
                  label: 'Map', length: props.images?.length ?? 0, a11yProps: a11yProps(0), action: () => props.setTab(0),
                },
              ].map((m, index) => (
                <Tab
                  label={m.label}
                  {...m.a11yProps}
                  style={{ minWidth: '115px' }}
                  component={() => (
                    <Button className="flex-standard px-4 py-2" style={{ width: '6rem' }} onClick={m.action}>
                      <p
                        className={`${props.tab == index ? 'color-primary' : 'color-secondary'}`}
                        style={{ opacity: 0.9, fontWeight: props.tab == index && 650 }}
                      >
                        {m.label}&nbsp;
                      </p>
                      <div
                        className="bg-color-primary text-white flex-standard px-1"
                        style={{
                          width: 'auto', height: 15, borderRadius: 5, borderWidth: 0, fontSize: 10,
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
          <div style={{ display: 'flex', justifyContent: 'end' }}>
            <Tooltip title="Filter (Coming Soon)">
              <img src={FilterIcon} style={{ padding: '15px 10px 10px 0px', cursor: 'pointer', width: '20px' }} />
            </Tooltip>
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
                        className={`d-flex justify-content-end img-container ${isselected ? 'inner-border' : ''}`}
                        style={{ backgroundImage: `url(${TestImg})` }}
                        onClick={() => props.handleChangeMainImage(image.id)}
                      >
                        <h3
                          className="text-white mr-1 h-25"
                          style={{ fontSize: 16 }}
                          onClick={() => {
                            MySwal.fire({
                              title: image['Inspection.name'],
                              imageUrl: TestImg,
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
                      </div>
                    </div>
                  );
                })}
            </div>
          </Grid>
        </TabPanel>
      </div>
    </div>
  );
}

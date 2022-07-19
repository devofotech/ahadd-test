// import { useState } from 'react';
// import { Link } from 'react-router-dom';
import { Grid, Box } from '@material-ui/core';
// import { styled } from '@material-ui/core/styles';
import MainContentContainer from '@Components/MainContentContainer';
import Dropdown from '@Components/Dropdown';
import Navbar from '@Components/Navbar';
import no_data from '@Assets/Images/no_data.png';
import Slider from './components/Slider';
// import InfoCard from './components/InfoCard';
// import DisplayInfo from './components/DisplayInfo';
import Detection from './Detection';

import Hook from './hook';

export default function Report(props) {
  const h = Hook(props);

  return (
    <MainContentContainer>
      <div className="d-flex justify-content-between">
        <Navbar
          to="/project/"
          text="CCTV"
          subtext={props.project?.name}
        />
      </div>
      {!!h.cctvs.length ? (
        <Grid item xs={12} style={{ padding: 20 }}>
          <Box className="d-flex" style={{ width: '40%', transform: 'scaleY(0.95)' }}>
            <Dropdown
              selectedItem={h.selected_cctv}
              setSelectedItem={h.set_selected_cctv}
              itemList={h.cctvs.map(e => e.name)}
              Hx="h6"
            />
          </Box>
          {!!h.footage.length ? (
            <>
              <Slider {...h} />
              {!!h.footage_detection.data?.length ? (
                <Box className="mt-2 relative">
                  <Detection {...h} />
                </Box>
              ) : (<NoData desc="detection" />)}
            </>
          ) : (<NoData desc="footage" />)}
        </Grid>
      ) : (<NoData desc="CCTV" />)}
    </MainContentContainer>
  );
}

const NoData = ({ desc }) => (
  <div className="mx-auto d-flex flex-column text-center">
    <img src={no_data} width="40%" className="mx-auto mt-5 mb-3" style={{ filter: 'opacity(0.5) drop-shadow(0 0 0 yellow)' }} />
    <p className="font-weight-bold" style={{ color: '#b5b585' }}>No {desc} available</p>
  </div>
);

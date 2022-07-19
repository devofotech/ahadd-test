import React, { useState } from 'react';
import CenteredTabs from '@Components/CenteredTabs';
import MainContentContainer from '@Components/MainContentContainer';
import CloudProcessing from './CloudProcessing';
import LayerProcessing from './LayerProcessing';
// import Navbar from '../components/Navbar';

export default function Mapping({ project }) {
  const [tabValue, setTabValue] = useState(0);
  const items = ['Cloud Processing', 'Layer Upload'];
  return (
    <MainContentContainer>
      <div style={{ marginBottom: 20 }}>
        {/* <Navbar to="/project/mapping" text="Mapping" subtext={items[tabValue]} /> */}
        <CenteredTabs value={tabValue} setValue={setTabValue} items={items} style={{ color: 'white' }} />
      </div>
      {tabValue ? <LayerProcessing project={project} /> : <CloudProcessing project={project} />}
    </MainContentContainer>
  );
}

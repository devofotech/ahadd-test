import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box } from '@material-ui/core';
import DialogCarousel from '@Components/DialogCarousel';
import useUrlQueries from '@Helpers/urlQueries';
import Workflows from './Workflows';
import Teams from './Teams';

import useHook from './hook';

const tabs = [
  { label: 'TEAMS', selector: 0 },
  { label: 'WORKFLOWS', selector: 1 },
];

const titleStyle = {
  fontWeight: 600,
  fontSize: 28,
  color: 'var(--primary-color)',
};

export default (props) => {
  const h = useHook();
  const history = useHistory();
  const { url_queries } = useUrlQueries();
  const { view } = url_queries;
  const [tab, setTab] = useState(0);
  const onHandleChangeTab = (selector) => {
    setTab(selector);
    if (!!view) history.push('/analysis-management');
  };
  return (
    <div className="p2" style={{ marginInline: '7.5rem' }}>
      <Box className="d-flex py-2 justify-content-between align-items-center">
        <div className="d-flex">
          <h1 className="my-auto mr-4" style={titleStyle}>Analysis Management</h1>
        </div>
        <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="color-text-primary" style={{ fontSize: 14 }}>
          Learn More
        </a>
      </Box>
      <TabButton tab={tab} setTab={onHandleChangeTab} />
      <Box className="py-3">
        {{
          0: <Teams {...h} />,
          1: <Workflows {...h} />,
        }[tab]}
      </Box>
    </div>
  );
};

const TabButton = ({ tab, setTab }) => {
  return (
    <div className="d-flex justify-content-between pt-2" style={{ gap: 15 }}>
      {tabs.map(m => (
        <div
          className="py-1 text-center"
          style={{
            borderRadius: 2,
            backgroundColor: tab === m.selector ? 'var(--primary-color)' : '#C8CBD3',
            flex: 1,
            color: tab === m.selector ? 'white' : 'var(--primary-color)',
            cursor: 'pointer',
            boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
            transition: 'all .5s',
            fontFamily: 'CeraProRegular',
            fontWeight: 600,
          }}
          onClick={() => setTab(m.selector)}
        >
          {m.label}
        </div>
      ))}
    </div>
  );
};

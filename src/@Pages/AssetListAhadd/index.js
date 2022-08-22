import { useState, useEffect } from 'react';
import MainContentContainer from '@Components/MainContentContainer';
import {
  Box, Button,
} from '@material-ui/core';
import DeleteDialog from '@Components/DeleteDialog';
import WarningDialog from '@Components/WarningDialog';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { AddOutlined } from '@material-ui/icons';
import NoData from '@Assets/Images/Data-not-found3.png';
import DialogCarousel from '@Components/DialogCarousel';
import RelativeDialog from '@Components/RelativeDialog';
import SearchBox from '@Components/SearchBox/v2';
import CenteredLoadingContainer from '@Components/CenteredLoadingContainer';
import Dropdown from './components/Dropdown';
import useHook from './hook';
import AssetListContent from './components/AssetListContent';
import SortDropdown from './components/SortDropdown';

const titleStyle = {
  fontWeight: 600,
  fontSize: 28,
  color: 'var(--primary-color)',
};

const regions = [
  {
    value: 0,
    label: 'North',
  },
  {
    value: 1,
    label: 'Central',
  },
  {
    value: 2,
    label: 'South',
  },
];

const networks = [
  {
    value: 0,
    label: 'BKE',
  },
  {
    value: 1,
    label: 'LPT2',
  },
];

const rankings = [
  {
    value: 0,
    label: 'North',
  },
  {
    value: 1,
    label: 'Central',
  },
  {
    value: 2,
    label: 'South',
  },
];

const sections = [
  {
    value: 0,
    label: 'N1',
  },
  {
    value: 1,
    label: 'N2',
  },
  {
    value: 2,
    label: 'N3',
  },
  {
    value: 3,
    label: 'N4',
  },
  {
    value: 4,
    label: 'N5',
  },
  {
    value: 5,
    label: 'N6',
  },
  {
    value: 6,
    label: 'N7',
  },
];

export default function AssetList({ user, closeTour }) {
  const history = useHistory();
  const location = useLocation();
  const h = useHook();
  const [network, setNetwork] = useState([]);
  const [region, setRegion] = useState([]);
  const [ranking, setRanking] = useState([]);
  const [section, setSection] = useState([]);

  useEffect(() => {
    if (location.pathname === '/asset') {
      closeTour();
    }
  }, [location.pathname]);

  return (
    <MainContentContainer style={{ height: '100vh' }}>
      <div style={{ minHeight: '40rem', width: '100%' }}>
        <div className="d-flex" style={{ justifyContent: 'space-between' }}>
          <h1
            className="my-auto pl-4 pb-2"
            style={titleStyle}
          >
            Asset List
          </h1>
          <Box className="my-2 d-flex justify-content-center align-items-center">
            <DialogCarousel
              title="How to Add Asset"
              name="asset_create"
            />
            <SearchBox onChange={(e) => h.handleSearch(e)} />
            <SortDropdown />
                <Button
                  variant="contained"
                  style={{
                    color: '#FFFFFF',
                    borderRadius: 30,
                    background: 'linear-gradient(var(--main-color), var(--primary-color))',
                    width: '10vw',
                  }}
                  onClick={() => history.push('/create-asset')}
                >
                  <AddOutlined />
                  <p className="text-white">Add Asset</p>
                </Button>
          </Box>
        </div>
        <div className="d-flex pl-4">
          <Dropdown selected={region} setSelected={setRegion} data={regions} title="Region" />
          <Dropdown selected={network} setSelected={setNetwork} data={networks} title="Network" />
          <Dropdown selected={section} setSelected={setSection} data={sections} title="Section" />
          <Dropdown selected={ranking} setSelected={setRanking} data={rankings} title="Ranking" />
        </div>
        <Box className="d-flex flex-wrap" style={{ margin: '20px -8px 0px' }}>
          <>
            {h.isLoading ? <CenteredLoadingContainer height="50vh" size={75} hasText text="assets" /> : (
              <>
                {!!h.projects?.length
                  ? <AssetListContent user={user} {...h} />
                  : (
                    <div className="d-flex justify-content-center w-100 m-4 p-5">
                      <img src={NoData} style={{ height: '55vh' }} />
                    </div>
                  )}
              </>
            )}
          </>
        </Box>
        <DeleteDialog
          open={h.open}
          setOpen={h.setOpen}
          selected={h.selectedAsset}
          setSelected={h.setSelectedAsset}
          deleteFunction={() => h.deleteAsset()}
        />
        <RelativeDialog {...h} user={user} />
      </div>
    </MainContentContainer>
  );
}

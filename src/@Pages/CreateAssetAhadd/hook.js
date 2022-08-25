/* eslint-disable max-lines */
import _ from 'lodash';
import { useEffect, useState } from 'react';
import Api, { endpoints } from '@Helpers/api';

export default () => {
  const [activeStep, setActiveStep] = useState(0);
  const [activeStepAssetType, setActiveStepAssetType] = useState(0);
  const [assetTypeList, setAssetTypeList] = useState([]);
  const [assetParameters, setAssetParameters] = useState([]);
  const [assetType, setAssetType] = useState('');
  const [lifeCycle, setLifeCycle] = useState('yes');
  const [selectedPhase, setSelectedPhase] = useState({});

  const [selectedAssetParameter, setSelectedAssetParameter] = useState({});
  const [name, setName] = useState('');
  const [network, setNetwork] = useState([]);
  const [region, setRegion] = useState([]);
  const [section, setSection] = useState([]);
  const [ranking, setRanking] = useState([]);
  const [marker, setMarker] = useState({ lat: 3.093783, lng: 101.655155 });
  const [files, setFiles] = useState([]);
  const [assetTag, setAssetTag] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingAssets, setIsLoadingAssets] = useState(false);
  const [polygon, setPolygon] = useState(null);
  const [networks, setNetworks] = useState([]);
  const [sections, setSections] = useState([]);
  const [regions, setRegions] = useState([]);
  const [rankings, setRankings] = useState([]);

  const handleNextStep = () => { setActiveStep((prev) => prev + 1); };
  const handleBackStep = () => { setActiveStep((prev) => prev - 1); };
  const handleNextStepAssetType = () => { setActiveStepAssetType((prev) => prev + 1); };
  const handleBackStepAssetType = () => { setActiveStepAssetType((prev) => prev - 1); };

  const createAsset = () => {
    const data = {
      name,
      AssetTypeId: assetType,
      NetworkId: network.value,
      RegionId: region.value,
      SectionId: section.value,
      RankingId: ranking.value,
      polygon,
      lat: marker.lat,
      lng: marker.lng,
    };
    if (!data.name) return;
    if (!data.NetworkId) return;
    setIsLoading(true);
    Api({
      endpoint: endpoints.newAssets(),
      data,
      files,
      onSuccess: () => {
        toast('success', 'Asset created');
        setIsLoading(false);
        setIsSuccess(true);
        handleNextStep();
      },
      onFail: () => {
        toast('error', 'Opss, something went wrong, please try again.');
        setIsLoading(false);
        setIsSuccess(false);
        handleNextStep();
      },
    });
  };

  const selectedTypeProfile = _.find(assetTypeList, { id: assetType });

  const getStaticData = () => {
    setIsLoadingAssets(true);
    Api({
      endpoint: endpoints.getStaticData(),
      onSuccess: ({ data }) => {
        setAssetTypeList(data.AssetType ?? []);
        setNetworks(data.Network.map(m => ({ label: m.name, value: m.id })));
        setRegions(data.Region.map(m => ({ label: m.name, value: m.id })));
        setSections(data.Section.map(m => ({ label: m.name, value: m.id })));
        setRankings(data.Ranking.map(m => ({ label: m.name, value: m.id })));
        setIsLoadingAssets(false);
      },
      onFail: () => console.log('error loading static data'),
    });
  };

  useEffect(() => {
    getStaticData();
  }, []);

  return {
    activeStep,
    setActiveStep,
    activeStepAssetType,
    setActiveStepAssetType,
    handleNextStep,
    handleBackStep,
    handleNextStepAssetType,
    handleBackStepAssetType,
    assetType,
    setAssetType,
    assetTypeList,
    selectedTypeProfile,
    assetParameters,
    lifeCycle,
    setLifeCycle,
    name,
    setName,
    marker,
    setMarker,
    files,
    setFiles,
    assetTag,
    setAssetTag,
    isSuccess,
    setIsSuccess,
    isLoading,
    createAsset,
    setAssetParameters,
    selectedPhase,
    setSelectedPhase,
    selectedAssetParameter,
    setSelectedAssetParameter,
    isLoadingAssets,
    network,
    setNetwork,
    region,
    setRegion,
    ranking,
    setRanking,
    section,
    setSection,
    polygon,
    setPolygon,
    networks,
    regions,
    sections,
    rankings,
  };
};

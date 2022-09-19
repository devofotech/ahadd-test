/* eslint-disable max-lines */
import _ from 'lodash';
import { useEffect, useState } from 'react';
import Api, { endpoints } from '@Helpers/api';
import { useParams } from 'react-router-dom';

export default () => {
  const { AssetId } = useParams();
  const [assetTypeList, setAssetTypeList] = useState([]);
  const [assetType, setAssetType] = useState('');
  const [asset, setAsset] = useState('');
  const [name, setName] = useState('');
  const [marker, setMarker] = useState(null);
  const [polygon, setPolygon] = useState(null);
  const [files, setFiles] = useState([]);
  const [region, setRegion] = useState(null);
  const [section, setSection] = useState(null);
  const [network, setNetwork] = useState([]);
  const [ranking, setRanking] = useState([]);
  const [regions, setRegions] = useState([]);
  const [sections, setSections] = useState([]);
  const [networks, setNetworks] = useState([]);
  const [rankings, setRankings] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getStaticData();
    Api({
      endpoint: endpoints.showAssets(AssetId),
      onSuccess: ({ data }) => {
        setAsset(data);
        setName(data.name);
        setMarker({ lat: data.lat, lng: data.lng });
        setNetwork(data.NetworkId);
        setRanking(data.RankingId);
        setSection(data.SectionId);
        setRegion(data.RegionId);
        setPolygon(JSON.parse(data.polygon));
        setAssetType(data.AssetTypeId);
        setIsLoading(false);
      },
      onFail: () => { toast('error', 'Failed to get asset data'); },
    });
  }, []);

  const updateAsset = () => {
    const input = {
      name,
      NetworkId: network,
      RankingId: ranking,
      polygon: JSON.stringify(polygon),
      lat: marker.lat,
      lng: marker.lng,
    };
    input.RegionId = region ?? null;
    input.SectionId = section ?? null;
    if (!input.name) return;
    if (!input.NetworkId) return;
    setIsLoading(true);
    Api({
      endpoint: endpoints.updateAssets(AssetId),
      data: { input },
      files,
      onSuccess: () => {
        toast('success', 'Asset updated');
        window.location.replace('/asset');
      },
      onFail: () => {
        toast('error', 'Opss, something went wrong, please try again.');
        window.location.replace('/asset');
      },
    });
  };

  const selectedTypeProfile = _.find(assetTypeList, { id: asset.AssetTypeId });

  const getStaticData = () => {
    Api({
      endpoint: endpoints.getStaticData(),
      onSuccess: ({ data }) => {
        setAssetTypeList(data.AssetType ?? []);
        setNetworks(data.Network.map(m => ({ label: m.name, value: m.id })));
        setRegions(data.Region.map(m => ({ label: m.name, value: m.id })));
        setSections(data.Section.map(m => ({ label: m.name, value: m.id })));
        setRankings(data.Ranking.map(m => ({ label: m.name, value: m.id })));
      },
      onFail: () => console.log('error loading static data'),
    });
  };

  return {
    assetType,
    setAssetType,
    assetTypeList,
    selectedTypeProfile,
    name,
    setName,
    marker,
    setMarker,
    polygon,
    setPolygon,
    files,
    setFiles,
    isSuccess,
    setIsSuccess,
    isLoading,
    updateAsset,
    asset,
    network,
    setNetwork,
    region,
    setRegion,
    section,
    setSection,
    ranking,
    setRanking,
    networks,
    regions,
    sections,
    rankings,
  };
};

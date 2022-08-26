/* eslint-disable max-lines */
import _ from 'lodash';
import { useEffect, useState } from 'react';
import Api, { endpoints } from '@Helpers/api';
import { getTrueInObject } from '@Helpers';
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
  const [location, setLocation] = useState('');
  const [region, setRegion] = useState('');
  const [section, setSection] = useState('');
  const [network, setNetwork] = useState('');
  const [ranking, setRanking] = useState('');
  const [assetTag, setAssetTag] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingAssets, setIsLoadingAssets] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getStaticData();
    Api({
      endpoint: endpoints.showAssets(AssetId),
      onSuccess: ({ data }) => {
        setAsset(data);
        setIsLoading(false);
      },
      onFail: () => { toast('error', 'Failed to get asset data'); },
    });
  }, []);

  const createAsset = () => {
    const data = {
      name,
      region,
      section,
      network,
      ranking,
      asset_type: assetTag,
      lat: marker.lat,
      lng: marker.lng,
      AssetTypeId: assetType,
      polygon,
    };
    if (!data.name) return;
    if (!data.lat) return;
    if (!data.lng) return;
    setIsLoading(true);
    Api({
      endpoint: endpoints.newAssets(),
      data,
      files,
      onSuccess: () => {
        toast('success', 'Asset created');
        setIsLoading(false);
        setIsSuccess(true);
      },
      onFail: () => {
        toast('error', 'Opss, something went wrong, please try again.');
        setIsLoading(false);
        setIsSuccess(false);
      },
    });
  };

  const selectedTypeProfile = _.find(assetTypeList, { id: asset.AssetTypeId });

  const getStaticData = () => {
    setIsLoadingAssets(true);
    Api({
      endpoint: endpoints.getStaticData(),
      onSuccess: ({ data }) => {
        setAssetTypeList(data.AssetType ?? []);
        setIsLoadingAssets(false);
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
    location,
    setLocation,
    assetTag,
    setAssetTag,
    isSuccess,
    setIsSuccess,
    isLoading,
    createAsset,
    isLoadingAssets,
    asset,
    network,
    setNetwork,
    region,
    setRegion,
    section,
    setSection,
    ranking,
    setRanking,
  };
};

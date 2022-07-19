import { sumBy } from '@Helpers';
import Api, { endpoints } from '@Helpers/api';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Hook({ user }) {
  const { AssetId } = useParams();
  const [asset, setAsset] = useState();
  const [usageStorage, setUsageStorage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPhases, setIsLoadingPhases] = useState(false);
  const [assetTypeList, setAssetTypeList] = useState([]);
  const [projectPhaseList, setProjectPhaseList] = useState([]);
  const [modules, setModules] = useState([]);

  const totalSize = sumBy(usageStorage, 'size');

  const getAsset = () => {
    setIsLoading(true);
    Api({
      endpoint: endpoints.showAssets(AssetId),
      onSuccess: response => {
        setAsset(response.data);
        getModules();
      },
      onFail: (err) => toast('error', err),
    });
  };

  const getModules = () => {
    Api({
      endpoint: endpoints.getModules(),
      onSuccess: ({ data }) => {
        setModules(data);
        setIsLoading(false);
      },
      onFail: () => toast('error', 'Error getting modules data. Please try again later.'),
    });
  };

  const getStatistic = () => {
    setIsLoadingPhases(true);
    Api({
      endpoint: endpoints.getStaticData(),
      onSuccess: ({ data: { AssetType, projectphase } }) => {
        setAssetTypeList(AssetType);
        setProjectPhaseList(projectphase);
        setIsLoadingPhases(false);
      },
      onFail: (err) => { toast('error', err); },
    });
  };

  useEffect(() => {
    getAsset();
    getStatistic();
  }, []);

  useEffect(() => {
    if (!asset?.id) return;
    const arrayStorage = [
      { name: 'Inspection Data', size: asset.inspections_size, color: '#5397FE' },
      { name: '2D Data', size: asset.orthophotos_size, color: '#F5533D' },
      { name: '3D Data', size: asset['3d_size'], color: '#35CC57' },
    ];
    setUsageStorage(_.orderBy(arrayStorage, ['size'], ['desc']));
  }, [asset]);

  const updateAsset = (input, files) => {
    if (!input.name) return;
    if (!input.lat) return;
    if (!input.lng) return;
    Api({
      endpoint: endpoints.updateAssets(AssetId),
      data: { input },
      files,
      onSuccess: () => {
        toast('success', 'Asset updated');
        getAsset();
      },
      onFail: () => { toast('error', 'Opss, something went wrong, please try again.'); },
    });
  };
  return {
    asset,
    data: usageStorage,
    selectedStorage: user?.['Organization.StoreStorage.value'] * 1.024 * (1024 ** 2),
    totalSize,
    isLoading,
    isLoadingPhases,
    updateAsset,
    assetTypeList,
    projectPhaseList,
    modules,
  };
}

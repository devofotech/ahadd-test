import { searchItems, sumBy } from '@Helpers';
import { useEffect, useState } from 'react';
import Api, { endpoints } from '@Helpers/api';
import _ from 'lodash';

export default ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [asset, setAsset] = useState();
  const [allAsset, setAllAsset] = useState();
  const [searchKey, setSearchKey] = useState('');
  const [totalAssetUsage, setTotalAssetUsage] = useState(0);
  const [unallocatedAssetUsage, setUnallocatedAssetUsage] = useState(0);
  const [assetTypeList, setAssetTypeList] = useState([]);
  const [subscriptionData, setSubscriptionData] = useState([]);
  const totalSize = user?.['Organization.StoreStorage.value'] * 1.024 * (1024 ** 2);

  useEffect(() => {
    if (!user) return;
    setIsLoading(true);
    getOrganization(user?.OrganizationId);
    getStatistic();
    refresh();
  }, [user]);

  const refresh = () => {
    setIsLoading(true);
    Api({
      endpoint: endpoints.getAssets(),
      onSuccess: ({ data }) => {
        const assetSize = sumBy(data, 'asset_size');
        setAsset(data);
        setAllAsset(data);
        setTotalAssetUsage(assetSize);
        setUnallocatedAssetUsage(totalSize - assetSize);
        setIsLoading(false);
      },
      onFail: (err) => { toast('error', err); },
    });
  };

  const getStatistic = () => {
    Api({
      endpoint: endpoints.getStaticData(),
      onSuccess: ({ data: { AssetType } }) => setAssetTypeList(AssetType),
      onFail: (err) => { toast('error', err); },
    });
  };

  const getOrganization = (id) => {
    if (!id) return;
    Api({
      endpoint: endpoints.getOrganization(id),
      onSuccess: ({ data: { subscription } }) => setSubscriptionData(subscription),
      onFail: (err) => { toast('error', err); },
    });
  };

  useEffect(() => {
    const keys = ['name'];
    const values = [searchKey];
    const result = searchItems(allAsset, keys, values);
    // console.log('mmm search', result, keys, values);
    setAsset(result);
  }, [searchKey]);

  return {
    user,
    totalSize,
    asset,
    assetTypeList,
    searchKey,
    setSearchKey,
    totalAssetUsage,
    subscriptionData,
    data: _.orderBy([
      { name: 'Total Usage', size: totalAssetUsage, color: 'var(--secondary-color)' },
      { name: 'Unallocated storage', size: unallocatedAssetUsage, color: 'var(--tertiary-color)' },
    ], ['size'], ['desc']),
    isLoading,
  };
};

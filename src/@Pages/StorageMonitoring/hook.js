import _ from 'lodash';
import moment from 'moment';
import { useEffect, useState } from 'react';
import Api, { endpoints } from '@Helpers/api';
import { sumBy } from '@Helpers';

export default ({ user }) => {
  const [storageMonitoringTab, setStorageMonitoringTab] = useState(0);
  const [storageUsageGraphTab, setStorageUsageGraphTab] = useState('month');
  const [dataCountGraphTab, setDataCountGraphTab] = useState('month');
  const [storageUsageData, setStorageUsageData] = useState({});
  const [dataCountData, setDataCountData] = useState({});
  const [isRefresh, setIsRefresh] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSidebar, setIsLoadingSidebar] = useState(false);
  const [isLoadingAlert, setIsLoadingAlert] = useState(false);
  const [totalAssetUsage, setTotalAssetUsage] = useState(0);
  const [storageAlertList, setStorageAlertList] = useState([]);
  const [dataCount, setDataCount] = useState({});
  const tabslist = [
    { label: 'SUMMARY', value: 0 },
    { label: 'STORAGE ALERT', value: 1 },
  ];
  const storageMonitorGraphTabList = [
    { label: 'Daily', value: 'day', duration: 24 },
    { label: 'Week', value: 'week', duration: 7 },
    { label: 'Month', value: 'month', duration: 31 },
  ];
  const storageUsageGraphDay = _.find(storageMonitorGraphTabList, { value: storageUsageGraphTab }).duration;
  const dataCountGraphDay = _.find(storageMonitorGraphTabList, { value: dataCountGraphTab }).duration;
  const timeformat = (duration) => {
    let format = '';
    switch (duration) {
      case 'day': format = 'YYYY-MM-DD hh:00 a'; break;
      default: format = 'YYYY-MM-DD'; break;
    }
    return format;
  };

  const emptyObj = {
    asset_size: 0, inspections_size: 0, orthophotos_size: 0, site_reports_size: 0, '3d_size': 0,
  };

  useEffect(() => {
    getData(storageUsageGraphTab, storageUsageGraphDay, setStorageUsageData);
    getData(dataCountGraphTab, dataCountGraphDay, setDataCountData);
  }, [storageUsageGraphTab, dataCountGraphTab, isRefresh]);

  useEffect(() => {
    setIsLoadingSidebar(true);
    Api({
      endpoint: endpoints.getAssets(),
      onSuccess: ({ data }) => {
        setTotalAssetUsage(sumBy(data, 'asset_size'));
        setIsLoadingSidebar(false);
      },
      onFail: (err) => { toast('error', err); },
    });
  }, []);

  useEffect(() => {
    if (!user) return;
    refreshStorageAlert(user?.OrganizationId);
  }, [user]);

  const refreshStorageAlert = (id) => {
    setIsLoadingAlert(true);
    Api({
      endpoint: endpoints.getStorageAlert(id),
      onSuccess: ({ data }) => { setStorageAlertList(data); setIsLoadingAlert(false); },
      onFail: (err) => { toast('error', err); },
    });
  };

  const deleteStorageAlert = (id) => {
    Api({
      endpoint: endpoints.deleteStorageAlert(id),
      onSuccess: () => {
        toast('success', 'Storage Alert deleted');
        refreshStorageAlert(user?.OrganizationId);
      },
      onFail: (err) => { toast('error', err); },
    });
  };

  const getData = (type, duration, setData) => {
    setIsLoading(true);
    Api({
      endpoint: endpoints.getStorage(type),
      data: { duration: type },
      onSuccess: ({ data }) => {
        const ans = _(data)
          .groupBy(x => moment(x.createdAt).format(timeformat(type)))
          .map((x, id) => {
            const latest = _(x).groupBy(y => y.AssetId).map((y) => _.orderBy(y, ['createdAt'], ['desc'])[0]).value();
            return {
              tick: id,
              ...emptyObj,
              asset_size: _.sumBy(latest, 'asset_size'),
              inspections_size: _.sumBy(latest, 'inspections_size'),
              orthophotos_size: _.sumBy(latest, 'orthophotos_size'),
              site_reports_size: _.sumBy(latest, 'site_reports_size'),
              '3d_size': _.sumBy(latest, '3d_size'),
            };
          })
          .value();
        const dataByDuration = [];
        for (let hour = 0; hour < duration; hour++) {
          const now = moment();
          const tick = now.subtract(hour, ['day'].includes(type) ? 'h' : 'd').format(timeformat(type));
          const dummy = {
            tick,
            ...emptyObj,
          };
          const hasData = ans.find(x => x.tick === tick);
          if (hasData) {
            dataByDuration.push(hasData);
          } else {
            dataByDuration.push(dummy);
          }
        }
        setData(dataByDuration);
        if (_.isEmpty(dataCount)) setDataCount(dataByDuration[dataByDuration.length - 1]);
        setIsLoading(false);
      },
      onFail: (err) => {
        toast('error', err);
        setIsLoading(false);
      },
    });
  };

  const getRandomGraphData = () => {
    const data = [];
    for (let x = 0; x < storageUsageGraphDay; x++) {
      data.push({
        x: x + 1, y: Math.floor((Math.random() * 10) + 1), date: moment().subtract(x, 'days').format(storageUsageGraphDay <= 30 ? 'DD/MM' : 'MMM YY'),
      });
    }
    return data;
  };
  return {
    tabslist,
    storageMonitoringTab,
    setStorageMonitoringTab,
    storageUsageGraphTab,
    setStorageUsageGraphTab,
    storageMonitorGraphTabList,
    storageUsageGraphDay,
    graphData: getRandomGraphData(),
    dataCountGraphTab,
    setDataCountGraphTab,
    dataCountGraphDay,
    storageUsageData,
    dataCountData,
    isRefresh,
    setIsRefresh,
    isLoading,
    isLoadingSidebar,
    totalSize: user?.['Organization.StoreStorage.value'] * 1.024 * (1024 ** 2),
    totalAssetUsage,
    isLoadingAlert,
    storageAlertList,
    refreshStorageAlert,
    deleteStorageAlert,
    dataCount,
  };
};

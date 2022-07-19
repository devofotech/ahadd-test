/* eslint-disable max-len */
import Api, { endpoints } from '@Helpers/api';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default () => {
  const [open, setOpen] = useState(false);
  const [DemoGroupList, setDemoGroupList] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  

  useEffect(() => {
    setIsLoadingData(true);
    Api({
      endpoint: endpoints.getStaticData(),
      onSuccess: ({ data }) => {
        setDemoGroupList(data.Demo ?? []);
        setIsLoadingData(false);
      },
      onFail: (error) => toast('error', error),
    });
  }, []);

  const createDemoAccount = (type, demoId) => {
    let data = {};
    if (type === 'add') data = { demoId };
    if (type === 'clear') data = { clear: 1 };
    setIsLoadingData(true);
    Api({
      endpoint: endpoints.createDemoAsset(),
      data,
      onSuccess: () => {
        setIsLoadingData(false);
        setOpen(false);
        window.location.reload();
      },
      onFail: (error) => toast('error', error),
    });
  };

  return {
    DemoGroupList,
    isLoadingData,
    open,
    setOpen,
    createDemoAccount,
  };
};

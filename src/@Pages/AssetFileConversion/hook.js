import { useEffect, useState } from 'react';
import Api, { endpoints } from '@Helpers/api';

export default function Hook() {
  const [layers, setLayers] = useState([]);
  const [show, setShow] = useState(false);
  const [uploadPercentages, setUploadPercentages] = useState([0]);
  const [uploadedfiles, setuploadedfiles] = useState(0);
  const refresh = () => {
    Api({
      endpoint: endpoints.getAssetFileConversion(),
      onSuccess: ({ data }) => {
        setLayers(data);
      },
      onFail: (err) => {
        setLayers([]);
        toast('error', err);
      },
    });
  };
  const needMoreFiles = (id) => {
    Api({
      endpoint: endpoints.uploadAssetFileConversion(id),
      data: {
        status: 2,
      },
      onSuccess: () => {
        toast('success', 'Layer Processing Initiated');
        refresh();
      },
      onFail: () => {
        toast('error', 'Error occurred. Please try again later.');
      },
    });
  };

  const uploadFile = (id, files) => {
    files.forEach((file, idx) => {
      Api({
        endpoint: endpoints.uploadAssetFileConversion(id),
        files,
        uploadPercent: (p) => updatePercentage(idx, p),
        onSuccess: () => {
          toast('success', 'File accepted, please wait a few moment for uploading file done.');
          updatePercentage(idx, 'done');
          setuploadedfiles(v => v + 1);
          refresh();
        },
        onFail: () => {
          toast('error', 'Error occurred. Please try again later.');
        },
      });
    });
  };
  const updatePercentage = (i, p) => {
    if (p === 100) p = 99;
    if (p === 'done') p = 100;
    setUploadPercentages(arr => { arr[i] = p; return [...arr]; });
  };
  useEffect(() => {
    refresh();
  }, []);

  return {
    uploadPercentages,
    setUploadPercentages,
    uploadedfiles,
    setuploadedfiles,
    layers,
    setLayers,
    uploadFile,
    needMoreFiles,
    show,
    setShow,
  };
}

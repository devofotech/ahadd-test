/* eslint-disable max-lines */
import { useEffect, useState } from 'react';
import moment from 'moment';
import Api, { endpoints } from '@Helpers/api';
import { uuid } from 'uuidv4';
import queryString from 'query-string';
import mapping_2d_v2 from '@Assets/Images/2D_Variant02.png';
import mapping_3d_v2 from '@Assets/Images/3D_Variant02.png';
import mapping_3dar_v2 from '@Assets/Images/BannerAR.png';

export default ({ user }) => {
  const isOrgUnlimited = !!user?.['Organization.StoreStorage.is_token_unlimited'];
  const tabslist = [
    { label: '2D MAP', value: '0' },
    { label: '3D MAP', value: '1' },
    { label: '3D AR (Coming Soon)', value: '2', disabled: true },
  ];
  const radio_options = [
    {
      tab: 0, img: mapping_2d_v2, title: 'Generate a geometrically accurate orthomosaic.', label: '2D - RGB', value: 1,
    },
    {
      tab: 0, img: mapping_2d_v2, title: 'Generate a geometrically accurate orthomosaic.', label: '2D - Elevation', value: 2,
    },
    {
      tab: 1, img: mapping_3d_v2, title: 'Generate a 3D mesh and point cloud for mapping applications.', label: '3D Mesh', value: 3,
    },
    {
      tab: 1, img: mapping_3d_v2, title: 'Generate a 3D mesh and point cloud for mapping applications.', label: 'Point Cloud', value: 4,
    },
    {
      tab: 2, img: mapping_3dar_v2, title: 'Generate a 3D AR for view in mobile applications.', label: '3D AR', value: 5,
    },
  ];
  const { payment_id, payment_intent, payment_processed } = queryString.parse(window.location.search);
  const [payment_id_override, setpayment_id_override] = useState(payment_id ?? null);
  const [paymentGatewayReady, setPaymentGatewayReady] = useState(false);
  const [intents, setIntents] = useState();
  // const [cloudPayment, setCloudPayment] = useState();
  const [activeStep, setActiveStep] = useState(0);
  const [assets, setAssets] = useState([]);
  const [assetId, setAssetId] = useState(null);
  const [imageryName, setImageryName] = useState('');
  const [dateProgress, setDateProgress] = useState(moment().format('YYYY-MM-DD'));
  const [files, setFiles] = useState([]);
  const [mega_pixel, setMP] = useState([]);
  const [image_type_tab, set_image_type_tab] = useState('0');
  const [outputType, setOutputType] = useState();
  const [output, setOutput] = useState([]);
  const [outputName, setOutputName] = useState({});
  const [uploadPercentages, setUploadPercentages] = useState([0]);
  const [uploadedfiles, setuploadedfiles] = useState(0);
  const [category, setCategory] = useState();
  const [phases, setPhases] = useState([]);
  const [filteredPhases, setFilteredPhases] = useState([]);
  const [securepayReady, setSecurepayReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);

  const handleNextStep = () => { setActiveStep((prev) => prev + 1); };
  const handleBackStep = () => { setActiveStep((prev) => prev - 1); };

  const getAssetList = () => {
    setIsLoading(true);
    Api({
      endpoint: endpoints.getAssets(),
      onSuccess: ({ data }) => {
        setAssets(data);
        setIsLoading(false);
      },
      onFail: () => toast('error', 'Error getting assets data. Please try again later.'),
    });
  };
  const getStaticData = () => {
    setIsLoading(true);
    Api({
      endpoint: endpoints.getStaticData(),
      onSuccess: ({ data }) => {
        setPhases(data.projectphase);
        setIsLoading(false);
        getAssetList();
      },
      onFail: (err) => toast('error', err),
    });
  };
  const paymentCallback = (paymentModel) => {
    console.log('MMM', { PaymentId: paymentModel.id });
    setPaymentGatewayReady(true);
  };
  const createCloudProcessing = (pid) => {
    Api({
      endpoint: endpoints.newCloudProcessing(assetId),
      data: {
        // layername: imageryName,
        // CloudProcessingTypeId: Number(outputType),
        ProjectPhaseId: Number(category),
        output: output.map(eachOutput => ({ layername: outputName[Number(eachOutput)] ?? '', CloudProcessingTypeId: Number(eachOutput) })),
        PaymentId: isOrgUnlimited ? null : pid,
        dateProgress,
      },
      // seperate file uploads from cloud processing creating since want progress
      // files,
      // uploadPercent: setUploadPercentages
      onSuccess: (res) => {
        console.log('vvv generated cloud processing', res.data);
        UploadFilesNow(res.data);
      },
      onFail: () => failResponse(),
    });
  };
  const validatePayment = (pid, interval) => {
    Api({
      endpoint: endpoints.getPayment(pid),
      data: { type: 'rcoin' },
      onSuccess: ({ payment_process }) => {
        console.log('vvv validate payment', payment_process);
        if (['succeeded', 'failed'].includes(payment_process.status)) {
          clearInterval(interval);
          setIsPaymentLoading(false);
          setIntents({ status: payment_process.status });
          if (payment_process.status === 'succeeded') createCloudProcessing(pid);
        }
      },
      onFail: () => console.log('lol'),
    });
  };

  const UploadFilesNow = (cpid) => {
    if (!files.length) return;
    // turn off tracker
    setUploadPercentages([...Array(files.length)].map(() => 0));
    // turn off tracker
    const batchuploaduuid = uuid();
    files.forEach((file, idx) => {
      Api({
        endpoint: endpoints.uploadCloudProcessingBySession(cpid, batchuploaduuid),
        files: [file],
        uploadPercent: (p) => updatePercentage(idx, p),
        onSuccess: () => {
          // turn off tracker
          toast('success', `${file.name} uploaded`);
          updatePercentage(idx, 'done');
          setuploadedfiles(v => v + 1);
          // turn off tracker
        },
        onFail: () => {
          toast('error', 'Something went wrong, please try again.');
          failResponse();
        },
      });
    });
  };
  const failResponse = () => {
    setIntents({ status: 'requires_source' });
    setActiveStep(4);
  };

  const updatePercentage = (i, p) => {
    if (p === 100) p = 99;
    if (p === 'done') p = 100;
    setUploadPercentages(arr => { arr[i] = p; return [...arr]; });
  };

  useEffect(() => {
    setuploadedfiles(0);
    // turn off tracker
    setUploadPercentages([...Array(files.length)].map(() => 0));
    // turn off tracker
  }, [files]);

  useEffect(() => {
    if (!!payment_id) return;
    if (!uploadedfiles) return;
    if (uploadedfiles === files.length) {
      // setIntents({ status: 'succeeded' });
      setActiveStep(4);
    }
  }, [uploadedfiles]);

  useEffect(async () => {
    if (!files.length) return;
    let mp = [];
    // aggregate
    const { width, height } = await files[0].resolution();
    if (width && height) mp = files.map(f => (width * height) / 1000000);
    // to do: loading wait actual all image resolution
    // for (let fidx = 0; fidx < files.length; fidx++) {
    //   const f = files[fidx];
    //   const { width, height } = { width: 100, height: 100 }; // await f.resolution();
    //   mp.push(!!(width && height) ? (width * height) / 1000000 : 0);
    // }
    setMP(mp);
  }, [files]);
  useEffect(() => {
    getStaticData();
  }, []);
  useEffect(() => {
    if (!assetId) return;
    setFilteredPhases(phases.filter(p => assets.find(a => a.id === assetId).selectedPhase.split(',').map(x => Number(x)).includes(p.id)));
  }, [assetId]);

  useEffect(() => {
    if (!payment_id_override) return;
    console.log('vvv set interval registered once', payment_id_override);
    const interval = setInterval(() => {
      validatePayment(payment_id_override, interval);
    }, 3000);
    return () => clearInterval(interval);
  }, [payment_id_override]);
  // useEffect(() => {
  //   if (cloudPayment?.id) {
  //     Api({
  //       endpoint: endpoints.getCloudProcessingPayment(cloudPayment.id),
  //       onSuccess: (res) => {
  //         console.log('bb cp', res);
  //         // to show receipt at the end
  //       },
  //       onFail: (response) => console.log('lol'),
  //     });
  //   }
  // }, [cloudPayment]);
  console.log('vvv mega_pixel',mega_pixel)
  return {
    isLoading,
    setIsLoading,
    isPaymentLoading,
    setIsPaymentLoading,
    user,
    tabslist,
    radio_options,
    activeStep,
    setActiveStep,
    handleNextStep,
    handleBackStep,
    imageryName,
    setImageryName,
    dateProgress,
    setDateProgress,
    uploadedfiles,
    setuploadedfiles,
    UploadFilesNow,
    files,
    setFiles,
    mega_pixel,
    image_type_tab,
    set_image_type_tab,
    assets,
    assetId,
    setAssetId,
    outputType,
    setOutputType,
    uploadPercentages,
    intents,
    paymentCallback,
    category,
    setCategory,
    phases,
    setPhases,
    filteredPhases,
    securepayReady,
    setSecurepayReady,
    output,
    setOutput,
    outputName,
    setOutputName,
    isOrgUnlimited,
    setpayment_id_override,
    paymentGatewayReady,
    setPaymentGatewayReady,
  };
};

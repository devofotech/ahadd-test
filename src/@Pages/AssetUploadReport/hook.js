import { useEffect, useState } from 'react';
import moment from 'moment';
import Api, { endpoints } from '@Helpers/api';
import queryString from 'query-string';
import { useParams, useHistory } from 'react-router-dom';

export default () => {
  const history = useHistory();
  const { AssetId } = useParams();
  const [asset, setAsset] = useState();
  const [phases, setPhases] = useState([]);
  const [filteredPhases, setFilteredPhases] = useState([]);
  const [category, setCategory] = useState();
  const { payment_intent, payment_processed } = queryString.parse(window.location.search);
  const [intents, setIntents] = useState();
  const [cloudPayment, setCloudPayment] = useState();
  const [activeStep, setActiveStep] = useState(0);
  const [imageryName, setImageryName] = useState('');
  const [dateProgress, setDateProgress] = useState(moment().format('YYYY-MM-DD'));
  const [files, setFiles] = useState([]);
  const [image_type_tab, set_image_type_tab] = useState('0');
  const [outputType, setOutputType] = useState();
  const [uploadPercentages, setUploadPercentages] = useState([0]);
  const [uploadFiles, setUploadFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleNextStep = () => { setActiveStep((prev) => prev + 1); };
  const handleBackStep = () => { setActiveStep((prev) => prev - 1); };

  // const paymentCallback = (paymentModel) => {
  //   Api({
  //     endpoint: endpoints.newCloudProcessing(id),
  //     data: {
  //       layername: imageryName,
  //       CloudProcessingTypeId: Number(outputType),
  //       PaymentId: paymentModel.id,
  //       dateProgress,
  //     },
  //     // seperate file uploads from cloud processing creating since want progress
  //     // files,
  //     // uploadPercent: setUploadPercentages
  //     onSuccess: (res) => {
  //       UploadFiles(res.data.id);
  //     },
  //     onFail: (response) => console.log('lol'),
  //   });
  // };
  const paymentCallback = (paymentModel) => {
    UploadFiles(AssetId);
  };
  const UploadFiles = (cpid) => {
    if (!files.length) return;
    setUploadPercentages([...Array(files.length)].map(() => 0));
    files.forEach((file, idx) => {
      const xhr = Api({
        endpoint: endpoints.newAssetFile(),
        data: {
          label: imageryName,
          name: imageryName,
          AssetId,
          type: 'site-reports',
          media_type: 'site-reports',
          ProjectPhaseId: category,
        },
        files: [file],
        uploadPercent: (p) => updatePercentage(idx, p),
        onSuccess: () => {
          toast('success', `${file.name} uploaded`);
          updatePercentage(idx, 'done');
          // redirect immediately when no payment happend
          history.push(`/asset/${AssetId}`);
          // window.location.reload(true);
        },
        onFail: () => {
          toast('error', 'Something went wrong, please try again.');
        },
      });
      setUploadFiles(prev => [...prev, xhr]);
    });
  };

  const updatePercentage = (i, p) => {
    if (p === 100) p = 99;
    if (p === 'done') p = 100;
    setUploadPercentages(arr => { arr[i] = p; return [...arr]; });
  };

  useEffect(() => {
    setUploadPercentages([...Array(files.length)].map(() => 0));
  }, [files]);
  const getAssetPhase = (id) => {
    setIsLoading(true);
    Api({
      endpoint: endpoints.showAssets(id),
      onSuccess: ({ data }) => setAsset(data),
      onFail: () => toast('error', 'Error getting assets data. Please try again later.'),
    });
    Api({
      endpoint: endpoints.getStaticData(),
      onSuccess: ({ data }) => {
        setPhases(data.projectphase);
      },
      onFail: (err) => toast('error', err),
    });
  };
  useEffect(() => {
    getAssetPhase(AssetId);
  }, [AssetId]);
  useEffect(() => {
    if (!asset?.id) return;
    if (!phases.length) return;
    setFilteredPhases(phases.filter(p => asset.selectedPhase.split(',').map(x => Number(x)).includes(p.id)));
    setIsLoading(false);
  }, [asset, phases]);

  // useEffect(() => {
  //   if (payment_processed) {
  //     Api({
  //       endpoint: endpoints.getPayment(payment_intent),
  //       onSuccess: ({ paymentIntent, payment_process }) => {
  //         setIntents(paymentIntent);
  //         setActiveStep(4);
  //         setCloudPayment(payment_process);
  //       },
  //       onFail: (response) => console.log('lol'),
  //     });
  //   }
  // }, []);

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

  return {
    AssetId,
    filteredPhases,
    category,
    setCategory,
    activeStep,
    setActiveStep,
    handleNextStep,
    handleBackStep,
    imageryName,
    setImageryName,
    dateProgress,
    setDateProgress,
    files,
    setFiles,
    image_type_tab,
    set_image_type_tab,
    outputType,
    setOutputType,
    uploadPercentages,
    intents,
    paymentCallback,
    uploadFiles,
    isLoading,
  };
};

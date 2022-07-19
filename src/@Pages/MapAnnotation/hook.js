import { useEffect, useState } from 'react';
import Api, { endpoints } from '@Helpers/api';
import moment from 'moment';

const delay = ms => new Promise(res => setTimeout(res, ms));
export default function Hook(props) {
  const [tab, setTab] = useState(0);
  const [asset_details, set_asset_details] = useState({});
  const [inspections, setInspections] = useState([]);
  const [severity, setSeverity] = useState([]);
  const [images, setImages] = useState([]);
  const [mainImage, setMainImage] = useState({});
  const [mainImageActiveLayers, setMainImageActiveLayers] = useState([]);
  const [mainImageAnnotations, setMainImageAnnotations] = useState([]);
  const [mainAnnotationId, setMainAnnotationId] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [ignoreChanges, setIgnoreChanges] = useState(false);
  const [uploadPercentages, setUploadPercentages] = useState([0]);
  const [needRefresh, setNeedRefresh] = useState(0);
  const [inspection_module, set_inspection_module] = useState([]);
  const refresh = () => {
    console.log('MAPDEBUG: Refreshing');
    let inspectionsIds = {};
    if (props.InspectionId) inspectionsIds = { InspectionId: props.InspectionId };
    Api({
      endpoint: endpoints.getSeverity(),
      data: { InspectionId: props.InspectionId },
      onSuccess: (response) => setSeverity(response.data),
    });
    Api({
      endpoint: endpoints.getInspectionDetails(props.InspectionId),
      onSuccess: ({ data }) => {
        set_asset_details(data.Asset);
        set_inspection_module(data.Module);
      },
    });
    Api({
      endpoint: endpoints.getInspectionFile(),
      data: { ...inspectionsIds },
      onSuccess: (response) => setInspections(response.data),
    });
  };
  useEffect(refresh, [props.InspectionId, needRefresh]);
  useEffect(() => {
    if (inspections.length > 0) {
      setImages(inspections.filter(f => !f.isVideo)
        .map(m => ({ ...m, src: m.path, metaData: [] })));
    }
  }, [inspections]);

  const saveImage = () => {
    const input = [];
    console.log('save click', mainImageAnnotations);
    for (let idx = 0; idx < mainImageAnnotations.length; idx++) {
      console.log(mainImageAnnotations[idx]);
      const { points: strpoints, ...therest } = mainImageAnnotations[idx];
      const points = JSON.parse(strpoints);
      const input_annotation = { points, ...therest };
      input.push(input_annotation);
    }
    console.log('save click input', input);
    Api({
      endpoint: endpoints.updateInspectionFileAnnotate(),
      data: {
        InspectionFileId: mainImage.id,
        input,
        activeLayers: mainImageActiveLayers.join(','),
      },
      onSuccess: () => {
        toast('success', 'Annotation saved');
        setNeedRefresh(prev => prev += 1);
      },
      onFail: () => {
        toast('error', 'Opss, something went wrong, please try again.');
        setNeedRefresh(prev => prev += 1);
      },
    });
  };

  const handleChangeMainImage = async (id) => {
    const image = images.find(i => i.id == id);
    if (!image) return;
    setIsLoading(true);
    // if(hasChanges && !ignoreChanges) prompt there some changes in to annotation,?
    console.log('image change', mainImageAnnotations);
    setMainImage({ ...image, asset_files: asset_details.AssetFiles });
    setMainImageActiveLayers(image.activeLayers ? image.activeLayers.split(',').map(actvLyrId => Number(actvLyrId)) : []);
    setMainImageAnnotations(image.annotations);
    if (image.annotations.length) setMainAnnotationId(image.annotations[0].id);
    await delay(2000);
    setHasChanges(false);
  };
  useEffect(() => {
    if (images.length > 0) handleChangeMainImage(mainImage?.id ?? images[0].id);
  }, [images]);
  const generateReport = () => {
    const InspectionId = Number(props.InspectionId);
    Api({
      endpoint: endpoints.uploadInspectionFile('undefined'),
      data: {
        InspectionId,
        wait: true,
        isMap: 1,
        files: [
          { originalname: `InspectionFile-${InspectionId}-${moment().format('DD-MM-YYYY')}.map` },
        ],
      },
      onSuccess: () => {
        toast('success', 'Report generated');
        refresh();
      },
      onFail: () => {
        toast('error', 'Opss, something went wrong, please try again.');
        refresh();
      },
    });
  };

  const deleteImage = (id) => {
    Api({
      endpoint: endpoints.deleteInspectionFile(id),
      onSuccess: () => {
        toast('success', 'File Deleted');
        refresh();
      },
      onFail: () => {
        toast('error', 'Opss, something went wrong, please try again.');
        refresh();
      },
    });
  };

  return {
    user: props.user,
    setIsLoading,
    isLoading,
    hasChanges,
    ignoreChanges,
    asset_details,
    inspections,
    images,
    mainImage,
    setMainImage,
    mainImageActiveLayers,
    setMainImageActiveLayers,
    tab,
    setTab,
    handleChangeMainImage,
    saveImage,
    mainImageAnnotations,
    setMainImageAnnotations,
    mainAnnotationId,
    setMainAnnotationId,
    generateReport,
    uploadPercentages,
    setUploadPercentages,
    severity,
    deleteImage,
    inspection_module,
  };
}

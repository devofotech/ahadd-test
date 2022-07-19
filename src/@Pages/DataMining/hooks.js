import { useEffect, useState } from 'react';
import Api, { endpoints } from '@Helpers/api';
import _ from 'lodash';

const delay = ms => new Promise(res => setTimeout(res, ms));
export default function Hook(props) {
  const [tab, setTab] = useState(0);
  const [inspections, setInspections] = useState([]);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [mainImage, setMainImage] = useState({});
  const [mainImageAnnotations, setMainImageAnnotations] = useState([]);
  const [mainAnnotationId, setMainAnnotationId] = useState();
  const [mainVideo, setMainVideo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [ignoreChanges, setIgnoreChanges] = useState(false);

  // const refresh = () => {
  //   let inspectionsIds = {};
  //   if (props.InspectionId) inspectionsIds = { InspectionId: props.InspectionId };
  //   Api({
  //     endpoint: endpoints.getInspectionFile(),
  //     data: { ...inspectionsIds },
  //     onSuccess: (response) => setInspections(response.data),
  //   });
  // };
  // useEffect(refresh, [props.InspectionId]);
  // useEffect(() => {
  //   if (inspections.length > 0) {
  //     setImages(inspections.filter(f => !f.isVideo)
  //       .map(m => ({ ...m, src: m.path, metaData: [] })));
  //     setVideos(inspections.filter(f => f.isVideo)
  //       .map((m, i) => ({
  //         ...m, imgSrc: props.building.image, vidSrc: m.path, asset: props.building.name, title: `Video ${i + 1}`,
  //       })));
  //   }
  // }, [inspections]);

  // const saveImage = () => {
  //   const input = [];
  //   console.log('save click', mainImageAnnotations);
  //   for (let idx = 0; idx < mainImageAnnotations.length; idx++) {
  //     console.log(mainImageAnnotations[idx]);
  //     const { points: strpoints, ...therest } = mainImageAnnotations[idx];
  //     const points = JSON.parse(strpoints);
  //     const input_annotation = { points, ...therest };
  //     input.push(input_annotation);
  //   }
  //   console.log('save click input', input);
  //   Api({
  //     endpoint: endpoints.updateInspectionFileAnnotate(),
  //     data: {
  //       InspectionFileId: mainImage.id,
  //       input,
  //     },
  //     onSuccess: () => {
  //       toast('success', 'Report saved');
  //       refresh();
  //     },
  //     onFail: () => {
  //       toast('error', 'Opss, something went wrong, please try again.');
  //       refresh();
  //     },
  //   });
  // };

  // const handleChangeMainImage = async (id) => {
  //   const image = images.find(i => i.id == id);
  //   if (!image) return;
  //   setIsLoading(true);
  //   // if(hasChanges && !ignoreChanges) prompt there some changes in to annotation,?
  //   console.log('image change', mainImageAnnotations);
  //   setMainImage(image);
  //   setMainImageAnnotations(image.annotations);
  //   if (image.annotations.length) setMainAnnotationId(image.annotations[0].id);
  //   await delay(2000);
  //   setHasChanges(false);
  // };
  // useEffect(() => {
  //   if (images.length > 0) handleChangeMainImage(mainImage?.id ?? images[0].id);
  //   if (videos.length > 0) setMainVideo(videos[0]);
  // }, [images, videos]);

  const tableData = [
    { text: 'Lorem', value: 10 },
    { text: 'ipsum', value: 50 },
    { text: 'dolor', value: 100 },
    { text: 'sit', value: 500 },
    { text: 'ame ', value: 1000 },
  ];
  const tableDataSorted = _.orderBy(tableData, ['value'], ['desc']);
  const graphData = [
    { x: 'Lorem', y: 100 }, { x: 'ipsum', y: 90 }, { x: 'dolor', y: 80 }, { x: 'sit', y: 70 },
    { x: 'ame1 ', y: 60 }, { x: 'ame2 ', y: 50 }, { x: 'Lorem3', y: 40 }, { x: 'ipsum4', y: 30 },
  ];
  const wordcloudData = [
    {
      words: [
        { text: 'Lorem', value: 1000 }, { text: 'ipsum', value: 1000 }, { text: 'dolor', value: 1000 }, { text: 'sit', value: 1000 },
        { text: 'ame ', value: 1000 }, { text: 'ame ', value: 1000 }, { text: 'Lorem', value: 1000 }, { text: 'ipsum', value: 1000 },
        { text: 'dolor', value: 1000 }, { text: 'sit', value: 1000 }, { text: 'ame ', value: 1000 }, { text: 'ame ', value: 1000 },
      ],
      title: '',
    },
  ];
  const image_number = 1234;
  const annotation_number = 1234;
  return {
    graphData,
    tableDataSorted,
    wordcloudData,
    image_number,
    annotation_number,
    setIsLoading,
    isLoading,
    hasChanges,
    ignoreChanges,
    inspections,
    images,
    videos,
    mainImage,
    setMainImage,
    mainVideo,
    setMainVideo,
    tab,
    setTab,
    // handleChangeMainImage,
    // saveImage,
    mainImageAnnotations,
    setMainImageAnnotations,
    mainAnnotationId,
    setMainAnnotationId,
  };
}

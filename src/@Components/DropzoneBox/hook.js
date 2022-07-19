import { checkExtension } from '@Helpers';
import { useDropzone } from 'react-dropzone';

const getDimension = async (f) => {
  const image = new Image();
  const extra_data = {};
  image.src = URL.createObjectURL(f);
  await image.decode();
  extra_data.width = image.width;
  extra_data.height = image.height;
  return extra_data;
};
export default function Hook({
  files, setFiles, type = 'image', maxSize = null, maxFiles = 0, canAppend = false,
}) {
  const acceptType = {
    excel: '.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    image: 'image/jpeg, image/png',
    imageVideo: 'image/jpeg, image/png, .mp4, .mkv, .avi',
    doc: '.pdf, .docx, .doc, .excel, .csv',
    compress: '.zip, .rar',
    potree: '.zip',
    las: '.las',
    vector: '.kml, .geojson, .shape',
    vectornraster: '.kml, .geojson, .shape, .zip',
    raster: '.zip',
    pdfreport: '.pdf',
    docImg: '.pdf, .docx, .doc, .excel, .csv, image/jpeg, image/png',
  };
  // const fileValidator = (file) => {
  //   if (checkExtension(acceptType.vector.split(', '), file.name) && file.size > 4000000) {
  //     return {
  //       code: 'vector-too-large',
  //       message: 'File size is larger than 4MB',
  //     };
  //   }
  // };
  const { getRootProps, getInputProps, open } = useDropzone({
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
    accept: acceptType[type],
    maxSize,
    maxFiles,
    // validator: fileValidator,
    onDropRejected: (rejectedFiles) => rejectedFiles.forEach(({ errors, file }) => {
      errors.forEach(({ message }) => toast('error', `${file.name}: ${message}`));
    }),
    onDrop: (acceptedFiles) => {
      let fileArr = [];
      if (!!maxFiles && !!canAppend && (files.length + acceptedFiles.length) > maxFiles) return toast('error', 'Too many files');
      const AcceptedFiles = acceptedFiles.map((file) => {
        const etc = {};
        if (file.type.includes('image')) {
          etc.resolution = () => getDimension(file);
        }
        return Object.assign(file, {
          preview: type === 'image' ? URL.createObjectURL(file) : `${process.env.REACT_APP_S3}/static/icons/file.png`,
          ...etc,
        });
      });
      if (!!canAppend) fileArr = [...files, ...AcceptedFiles];
      if (!canAppend) fileArr = AcceptedFiles;
      setFiles(fileArr);
    },
  });

  return { getRootProps, getInputProps, open };
}

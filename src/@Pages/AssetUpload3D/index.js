import MainContentNavbar from '@Components/MainContentNavbar';
import UploadProgress from '@Components/UploadProgress';
import MainContentContainer from '@Components/MainContentContainer';
import Step from './Step';
import ImageUpload from './ImageUpload';
import Payment from './Payment';
import PaymentAfter from './PaymentAfter';
import useHook from './hook';
import DataFormat from './DataFormat';
import Details from './Details';

export default ({ user }) => {
  const h = useHook({ user });
  return (
    <MainContentContainer>
      <MainContentNavbar text="Upload 3D Data" />
      <Step {...h} />
      {{
        0: <Details {...h} />,
        1: <DataFormat {...h} />,
        2: <ImageUpload {...h} />,
        3: <Payment {...h} />,
        4: <PaymentAfter {...h} />,
      }[h.activeStep]}
      {[3].includes(h.activeStep) && (
        <UploadProgress
          title={h.imageryName}
          files={h.files}
          setFiles={h.setFiles}
          percentages={h.uploadPercentages}
          uploadFiles={h.uploadFiles}
        />
      )}
    </MainContentContainer>
  );
};

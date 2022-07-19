import MainContentNavbar from '@Components/MainContentNavbar';
import UploadProgress from '@Components/UploadProgress';
import MainContentContainer from '@Components/MainContentContainer';
import Step from './Step';
import ImageUpload from './ImageUpload';
import Payment from './Payment';
import PaymentAfter from './PaymentAfter';
import useHook from './hook';
import Details from './Details';

export default () => {
  const h = useHook();
  return (
    <MainContentContainer>
      <MainContentNavbar text="Upload Report Data" />
      <Step {...h} />
      {{
        0: <Details {...h} />,
        1: <ImageUpload {...h} />,
        2: <Payment {...h} />,
        3: <PaymentAfter {...h} />,
      }[h.activeStep]}
      {[2].includes(h.activeStep) && (
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

import MainContentNavbar from '@Components/MainContentNavbar';
import MainContentContainer from '@Components/MainContentContainer';
import UploadProgress from '@Components/UploadProgress';
import Step from './Step';
import ProcessingCreation from './ProcessingCreation';
import ImageUpload from './ImageUpload';
import ProcessingOutput from './ProcessingOutput';
import Payment from './Payment';
import PaymentAfter from './PaymentAfter';
import useHook from './hook';

export default (props) => {
  const h = useHook(props);
  return (
    <MainContentContainer>
      <MainContentNavbar text="New processing" />
      <Step {...h} />
      {{
        0: <ProcessingCreation {...h} />,
        1: <ImageUpload {...h} />,
        2: <ProcessingOutput {...h} />,
        3: <Payment {...h} />,
        4: <PaymentAfter {...h} />,
      }[h.activeStep]}
      {/* turn off tracker */}
      {[3].includes(h.activeStep) && (
        <UploadProgress
          title={h.imageryName}
          files={h.files}
          percentages={h.uploadPercentages}
        />
      )}
      {/* turn off tracker */}
    </MainContentContainer>
  );
};

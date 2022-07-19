import Button from '@Components/Button';
import FileDropZone from '@Components/DropzoneBox';

export default (h) => {
  return (
    <div style={{ minHeight: '60vh' }}>
      <FileDropZone files={h.files} setFiles={h.setFiles} height={400} maxFiles={1000} canAppend />

      <div className="mt-5 d-flex justify-content-between">
        <p><span className="color-disabled">Total images to uploads:</span> {h.files.length.toLocaleString()}</p>
        <div className="d-flex" style={{ gap: 10 }}>
          <Button variant="text" onClick={h.handleBackStep}>
            PREVIOUS
          </Button>
          <Button onClick={h.handleNextStep} disabled={!h.files.length}>
            NEXT
          </Button>
        </div>
      </div>
    </div>
  );
};

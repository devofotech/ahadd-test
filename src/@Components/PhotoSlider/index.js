import React from 'react';
import { AutoRotatingCarousel, Slide } from 'material-auto-rotating-carousel';
import { makeStyles } from '@material-ui/core/styles';
import Card from './Card';

const useStylesCarousel = makeStyles(() => ({
  content: {
    width: '100% !important',
    minWidth: '1000px !important',
    maxWidth: '1200px!important',
    height: '600px !important',
  },
  footer: {
    visibility: 'hidden',
  },
  slide: {
    backgroundColor: 'white',
  },
}));

const useStylesSlide = makeStyles(() => ({
  root: {
    backgroundColor: 'white !important',
  },
  text: {
    paddingTop: '0 !important',
  },
}));

export default function AutoRotatingCarouselModal({
  handleOpen, setHandleOpen, image, handleClose, files, setFiles, onUpload = () => null, currentUser, ...h
}) {
  const classesCarousel = useStylesCarousel();
  const classesSlide = useStylesSlide();
  const sortedImage = [...image.slice(handleOpen?.idx), ...image.slice(0, handleOpen?.idx)];
  return (
    !!handleOpen.open && (
      <AutoRotatingCarousel
        open={handleOpen.open}
        onClose={() => (handleClose ? handleClose() : setHandleOpen({ open: false }))}
        onStart={() => setHandleOpen({ open: false })}
        onChange={() => setFiles([])}
        autoplay={false}
        style={{ position: 'absolute' }}
        classes={classesCarousel}
        ButtonProps={{ size: 'small' }}
      >
        {sortedImage?.map((item) => (
          <Slide
            mediaBackgroundStyle={{ height: '100%' }}
            classes={classesSlide}
            media={(
              <Card
                {...item}
                handleClose={handleClose}
                files={files}
                setFiles={setFiles}
                onUpload={onUpload}
                isLoading={h.isLoading}
                issues={h.selectedIssues}
                getTeam={h.getTeam}
                team={h.team}
                currentUser={currentUser}
              />
            )}
          />
        ))}
      </AutoRotatingCarousel>
    )
  );
}

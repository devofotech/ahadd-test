import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import Button from '@Components/Button';
import { Link } from 'react-router-dom';
import AssetCreatedImg from '@Assets/Images/AssetCreated.svg';

export default (h) => {
  const container = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require('@Assets/Icons/failed-lottie.json'),
    });
  }, [h.isLoading]);

  return (
    <div className="flex-standard flex-column">
      {h.isSuccess ? (<img src={AssetCreatedImg} height="500" width="700" style={{ height: '450px', width: '700px', objectFit: 'cover' }} />) : (
        <div className="text-center mt-5">
          <h1 className="text-dark">Create Failed !</h1>
          <div ref={container} style={{ height: 500, marginTop: -50, marginBottom: -50 }} />
          <h2 className="text-dark">Failed to create asset, please retry in a moment !!!</h2>
        </div>
      )}
      <Link to="/asset">
        <Button className={`${h.isSuccess ? 'mb-3 mt-1' : 'mt-4 mb-3'}`}>
          RETURN TO ASSET LIST
        </Button>
      </Link>
    </div>
  );
};

import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

export default function WelcomeAnimation() {
  const container = useRef(null);
  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require('@Assets/Icons/72342-welcome.json'),
    });
  }, []);
  return (
    <div className="container" ref={container} style={{ height: '55%', width: '55%' }} />
  );
}

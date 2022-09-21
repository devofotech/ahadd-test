import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import { Grid } from '@material-ui/core';
import './text.css';

export default function CenteredLoading({ hasText = false, ...props }) {
  const container = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require('@Assets/Lottie/loading.json'),
    });
  }, []);
  const text = props.text || '';
  const fontSize = props.fontSize || '14px';
  return (
    <Grid container justify="center" alignItems="center" className="d-flex flex-column" {...props}>
      <div className="flex-standard" ref={container} style={{ height: 350 }} />
      {hasText && (
        <div
          className="loading-text text-main"
          style={{
            fontSize, fontWeight: 600, fontFamily: 'CeraProRegular', marginTop: -120,
          }}
        >
          Loading {text}
        </div>
      )}
    </Grid>
  );
}

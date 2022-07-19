import React from 'react';
import useHook from './hook';
import LandingPageGalaxy from './LandingPageGalaxy';
import LandingPageSupervision from './LandingPageSupervision';

export default function AuthPage(props) {
  const h = useHook(props);
  return (
    <>
      {{
        galaxy: <LandingPageGalaxy {...props} {...h} />,
        supervision: <LandingPageSupervision {...props} {...h} />,
      }[process.env.REACT_APP_BRANCH]}
    </>
  );
}

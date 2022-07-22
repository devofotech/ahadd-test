import React from 'react';
import useHook from './hook';
import LandingPageAhadd from './LandingPageAhadd';
import LandingPageGalaxy from './LandingPageGalaxy';
import LandingPageSupervision from './LandingPageSupervision';

export default function AuthPage(props) {
  const h = useHook(props);
  return (
    <>
      {{
        galaxy: <LandingPageGalaxy {...props} {...h} />,
        supervision: <LandingPageSupervision {...props} {...h} />,
        ahadd: <LandingPageAhadd {...props} {...h} />,
      }[process.env.REACT_APP_BRANCH]}
    </>
  );
}

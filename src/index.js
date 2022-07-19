import './global';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { TourProvider, components } from '@reactour/tour';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import '@Assets/css/index.css';
import '@Assets/fonts/Cera-Pro/Cera Pro Regular.otf';
import Button from '@Components/Button';
import App from './App';
import reportWebVitals from './reportWebVitals';
import steps from './steps';

function removeConsole() { }

if (!isDev) { // eslint-disable-line no-undef
  console.log = removeConsole;
  console.warn = removeConsole;
  console.error = removeConsole;
}

const contentTitle = [
  'Map View',
  'Dashboard', 
  'Asset List',
  'Geo Processsing',
  'geoRÄISE Token',
  'Notifications',
  'Manage Your Account',
  'Manage Your Account',
  'Add Demo Assets']

function Arrow(a) {
  return (
    <div style={{ width: 100, height: 30 }}>
      {a.inverted ? (
        a.disabled ? (
          <Button disabled>
            Next
          </Button>
        ) : (
          <Button>
            Next
          </Button>
        )
      ) : (
        a.disabled ? (
          <Button disabled>
            Previous
          </Button>
        ) : (
          <Button>
            Previous
          </Button>
        )
      )}
    </div>
  );
}

function Content(c) {
  return (
    <>
      <h3 style={{ color: 'black', textAlign: 'center' }}>{contentTitle[c.currentStep]}</h3>
      <hr />
      {c.content}
    </>
  );
}

const disableBody = (target) => disableBodyScroll(target);
const enableBody = (target) => enableBodyScroll(target);
ReactDOM.render(
  <React.StrictMode>
    <TourProvider
      steps={steps}
      afterOpen={disableBody}
      afterClose={enableBody}
      showBadge={false}
      showCloseButton={false}
      components={{ Arrow, Content }}
      styles={{
        dot: (base, { current }) => ({
          ...base,
          background: current ? '#464f4d' : 'white',
          border: current ? '0' : '1px solid #464f4d',
        }),
        color: 'black',
        background: 'black',
        popover: base => ({ ...base, minWidth: 400 }),
      }}
    >
      <App />
      <ToastContainer />
    </TourProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

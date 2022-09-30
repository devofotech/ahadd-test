import './global';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import '@Assets/css/index.css';
import '@Assets/fonts/Cera-Pro/Cera Pro Regular.otf';
import App from './App';
import reportWebVitals from './reportWebVitals';
import steps from './steps';

function removeConsole() { }

if (!isDev) { // eslint-disable-line no-undef
  console.log = removeConsole;
  console.warn = removeConsole;
  console.error = removeConsole;
}

ReactDOM.render(
  <React.StrictMode>
    <App />
    <ToastContainer />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import { toast } from 'react-toastify';

global.isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

const toastConfig = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};
global.toast = (type, message) => {
  if (type && message) toast[type](message, toastConfig);
};

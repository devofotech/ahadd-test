import { useEffect, useState } from 'react';
import Api, { endpoints } from '@Helpers/api';

export default function Hook() {
  const [layers, setLayers] = useState([]);
  const [show, setShow] = useState(false);

  const refresh = () => {
    Api({
      endpoint: endpoints.getMapping(),
      onSuccess: (response) => setLayers(response.data),
      onFail: setLayers([]),
    });
  };

  const startProcessing = (id) => {
    Api({
      endpoint: endpoints.updateMapping(id),
      data: {
        status: 1,
      },
      onSuccess: () => {
        toast('success', 'Layer Processing Initiated');
        refresh();
      },
      onFail: () => {
        toast('error', 'Error occurred. Please try again later.');
      },
    });
  };

  useEffect(() => {
    refresh();
  }, []);

  return {
    layers,
    setLayers,
    startProcessing,
    show,
    setShow,
  };
}

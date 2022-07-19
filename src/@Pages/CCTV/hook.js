import { useEffect, useState } from 'react';
import Api, { endpoints } from '@Helpers/api';

export default function Hook(props) {
  // if project change / tab change
  const [cctvs, set_cctvs] = useState([]);
  const [selected_cctv, set_selected_cctv] = useState(0);

  // after change / toggle cctv dropdown / initial dropdown
  const [footage, set_footage] = useState([]);
  const [footage_detection, set_footage_detection] = useState([]);

  const getNextPageFootage = (CctvId, page) => {
    Api({
      endpoint: endpoints.getCCTVFootage(),
      data: {
        CctvId, detection: 1, page: page ?? 1, sortby: 'id,DESC',
      },
      onSuccess: (resp) => set_footage_detection(resp),
      onFail: (err) => toast('error', err),
    });
  };
  const getCCTVFootage = (CctvId) => {
    Api({
      endpoint: endpoints.getCCTVFootage(),
      data: { CctvId, disablePagination: 1 },
      onSuccess: ({ data }) => set_footage(data.length ? data : []),
      onFail: (err) => toast('error', err),
    });
    getNextPageFootage(CctvId, 1);
  };

  useEffect(() => {
    if (!props.projects.length) return;
    // todo: if (!props.project.has_cctv) redirect
    set_selected_cctv(0);
    const param = {
      AssetId: props.project.id,
    };
    Api({
      endpoint: endpoints.getCCTV(),
      data: param,
      onSuccess: ({ data }) => {
        if (data.length) {
          set_cctvs(data);
          getCCTVFootage(data[0].id);
        } else {
          set_cctvs([]);
          set_footage([]);
          set_footage_detection([]);
        }
      },
      onFail: (err) => toast('error', err),
    });
  }, [props.project]);

  useEffect(() => {
    if (!!cctvs.length) getCCTVFootage(cctvs[selected_cctv].id);
  }, [selected_cctv]);

  return {
    cctvs,
    selected_cctv,
    set_selected_cctv,
    footage,
    footage_detection,
    getNextPageFootage,
  };
}

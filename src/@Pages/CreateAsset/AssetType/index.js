import Card from './Card';
import Module from './Module';
import Parameter from './Parameter';
import Phase from './Phase';

export default (h) => {
  return (
    <>
      {{
        0: <Card {...h} />,
        1: <Phase {...h} />,
        2: <Module {...h} />,
        3: <Parameter {...h} />,
      }[h.activeStepAssetType]}
    </>
  );
};

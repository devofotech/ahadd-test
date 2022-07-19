import React from 'react';
import { Link } from 'react-router-dom';

const assetsParent = require('./marker-assets-parent.png');
const subAssets = require('./marker-subassets.png');
const assets = require('./marker-assets.png');

export default (props) => {
  let image = assets;
  if (props.type === 'assetsParent') image = assetsParent;
  if (props.type === 'subAssets') image = subAssets;
  console.log(props.name);
  return (
    <div title={props.name} style={{ marginTop: -40, marginLeft: -20 }}>
      <Link to={`/asset/${props.id}`}>
        <img src={image} alt="Asset Location" />
      </Link>
    </div>
  );
};

import React from 'react';

export default [
  {
    selector: '[data-tut="map_view"]',
    content: 'All your added asset will be displayed here on map with summary of the asset on the left panel',
    disableActions: false,
    stepInteraction: false,
  },
  {
    selector: '[data-tut="dashboard"]',
    content: 'You may view your assets analysis on Dashboard page',
    disableActions: false,
    stepInteraction: false,
  },
  {
    selector: '[data-tut="asset_list"]',
    content: 'Manage, add new asset or delete existing asset here',
    disableActions: false,
    stepInteraction: false,
  },
  {
    selector: '[data-tut="geo_processing"]',
    content: 'You may process and view status of your data here',
    disableActions: false,
    stepInteraction: false,
  },
  {
    selector: '[data-tut="token"]',
    content: 'Your geoRÄISE Token amount should be displayed here',
    disableActions: false,
    stepInteraction: false,
  },
  {
    selector: '[data-tut="notification"]',
    content: 'Important notice for you will be displayed here',
    disableActions: false,
    stepInteraction: false,
  },
  {
    selector: '[data-tut="dropdown_icon"]',
    content: 'Click on the dropdown icon to view list of pages you can go',
    disableActions: true,
    stepInteraction: true,
  },
  {
    selector: '[data-tut="dropdown_topbar"]',
    content: 'You may find more pages to manage your profile, assets, storage or organization here',
    disableActions: false,
    stepInteraction: false,
  },
  {
    selector: '[data-tut="demo_asset"]',
    content: 'Simply click this button to add Demo assets for you to explore our features',
    disableActions: true,
    stepInteraction: true,
  },
];

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { init, retrieveLaunchParams } from '@telegram-apps/sdk';
import { useLaunchParams } from '@telegram-apps/sdk-react';

init();
// console.log(retrieveLaunchParams());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

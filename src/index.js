import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { init } from '@telegram-apps/sdk';

init();
// console.log(retrieveLaunchParams());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { InfoProvider } from './Hooks/UseInfo';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <InfoProvider>
      <App />
    </InfoProvider>
  </React.StrictMode>
);


import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import { Auth } from './components/Auth/Auth';
import 'bootstrap-icons/font/bootstrap-icons.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth>
        <App />
      </Auth>
    </BrowserRouter>
  </React.StrictMode>,
);
reportWebVitals();

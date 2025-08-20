import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

// External CSS import
import './index.css';
import './css/myStyle.scss';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'

// Library import
import '../node_modules/aos/dist/aos.css';
import '../node_modules/aos/dist/aos.js';
import '../node_modules/react-loading-skeleton/dist/skeleton.css';

// Different states handling
import UserState from './context/UserState';
import ResturantState from './context/ResturantState';
import AdminState from './context/AdminState';
import MainState from './context/MainState';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AdminState>
      <MainState>
        <ResturantState>
          <UserState>
            <App />
          </UserState>
        </ResturantState>
      </MainState>
    </AdminState>
  </React.StrictMode>
);

reportWebVitals();
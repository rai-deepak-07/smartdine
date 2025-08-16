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
    <MainState>
      <AdminState>
        <ResturantState>
          <UserState>
            <App />
          </UserState>
        </ResturantState>
      </AdminState>
    </MainState>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
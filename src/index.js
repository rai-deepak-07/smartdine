import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

// External CSS import
// import './index.scss';
// import './css/myStyle.scss';
// import './css/myStyle.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'

// Library import
import '../node_modules/aos/dist/aos.css';
import '../node_modules/aos/dist/aos.js';
import '../node_modules/react-loading-skeleton/dist/skeleton.css';


import MyStates from './context/MyStates.jsx';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MyStates>
      <App />
    </MyStates>
  </React.StrictMode>
);

reportWebVitals();
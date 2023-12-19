import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from "react-router-dom";
import "./common/app/axios.js";
import "./assets/css/index.css";
import { Settings } from 'luxon';
import "react-datepicker/dist/react-datepicker.css";
import 'leaflet/dist/leaflet.css';
import 'react-loading-skeleton/dist/skeleton.css';

Settings.defaultZone = "Asia/Bangkok";

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  // </React.StrictMode>,
)

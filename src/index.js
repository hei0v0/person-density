import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import axios from 'axios'
axios.default.baseURI = 'http://localhost:5000'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);


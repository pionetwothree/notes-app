import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import swDev from './swDev.js';
//import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

ReactDOM.render(
  <React.StrictMode>
    <App />
   
  </React.StrictMode>,
  document.getElementById('root'));

swDev();
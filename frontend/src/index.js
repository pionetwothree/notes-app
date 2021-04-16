import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import swDev from './swDev'
//import { ApolloClient, InMemoryCache, gql } from '@apollo/client';


/** 
client.query({query: gql`
      query {notes{id,name}} `
  })
  .then(result => console.log(result));
*/


ReactDOM.render(
  <React.StrictMode>
    <App />,
  </React.StrictMode>,
  document.getElementById('root'));

swDev();
//import React, { useState, useEffect } from 'react'
//import {Table} from 'react-bootstrap'
//import Realm from "realm"
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from '@apollo/client';


export default function News() {

  const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache()
  });

  function ExchangeRates() {
    const { loading, error, data } = useQuery(gql`query {notes{id,name}} `);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
  
    return data.notes.map(({ id, name }) => (
      <div key={id}>
        <p>
          {id}: {name}
        </p>
      </div>
    ));
    }


return (
      <div className='container'>
      <ApolloProvider client={client}>
          <div class='center'>
            <h1 class='center'>My first Apollo app 🚀</h1>
            <ExchangeRates />
          </div>
      </ApolloProvider>
      
      </div>
    );
  }


//render(<News />, document.getElementById("root"));  


        /** 
        if (!navigator.serviceWorker){
            return console.error("Service Worker not supported")
        }
    
        navigator.serviceWorker.ready
        .then(registration => registration.sync.register('syncAttendees'))
        .then(() => console.log("Registered background sync"))
        .catch(err => console.error("Error registering background sync", err))
        */


    /**     
    fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: `
        query {
            notes{id,name}
          }` 
        }),
    })
    .then(res => res.json())
    .then(res => console.log(res.data));

    */

/** mode==='offline'? 
                    <div class="alert alert-warning" role="alert">
                        You are in offline mode or some issue with connection
                    </div>
                    :null

                    <button onClick={registerBackgroundSync} className="btn btn-lg btn-info">Background Sync</button>

  */
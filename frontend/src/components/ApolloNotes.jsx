//import React, { useState, useEffect } from 'react'
//import {Table} from 'react-bootstrap'
//import Realm from "realm"
//import { NetworkStatus } from '@apollo/client';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery, useMutation } from '@apollo/client';
//import {createNetworkStatusNotifier} from 'react-apollo-network-status';

export default function ApolloNotes() {

  function Online () {
    if (navigator.onLine) {
      console.log('online');
      return <p style={{backgroundColor:'green', color: "white"}}>Online</p>;
    } else {
      console.log('offline');
      return <p style={{backgroundColor:'red', color: "white"}}>Offline</p>;
    }
    }

  //window.addEventListener('offline', function(e) { console.log('offline');});

  //window.addEventListener('online', function(e) { console.log('online'); });



  const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
    connectToDevTools: true
  });

  const ADD_NOTE = gql`
  mutation addNote($name: String!, $content: String!) {addNote(name: $name, content: $content) {
    id
    name
    content}}`;


  function NotesQuery() {
    const { loading, error, data } = useQuery(gql`query {allnotes{name,content}} `);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>; 
  
    return data.allnotes.map(({ name, content }) => (
      <div key={name}>
        <p>
          {name}: {content}
        </p>
      </div>
    ));
    }

    function AddNote() {
      let input1;
      let input2;
      const [addNote] = useMutation(ADD_NOTE, {
        update(cache, { data: { addNote } }) {
          cache.modify({
            fields: {
              todos(existingNotes = []) {
                const newNoteRef = cache.writeFragment({
                  data: addNote,
                  fragment: gql`
                    fragment NewNote on Note {
                      id
                      name
                      content
                    }
                  `
                })
                  return [...existingNotes, newNoteRef];
              }
            }
           });
        }
      }); 

      return (
        <div>
          <form
           onSubmit={e => {
            e.preventDefault();
            addNote({ variables: { name: input1.value, content: input2.value } });
            input1.value = ''; input2.value = '';
          }}>
            <input name="title" autoComplete="off" className='from-control' placeholder="title"
              ref={node => {input1 = node}}/>
            <input name="content" autoComplete="off" className='from-control' placeholder="content"
              ref={node => {input2 = node}}/>
            <button type="submit" value="OK">Add Note</button>
          </form>

        </div>
      );
    }

/**
 * <form
            onSubmit={e => {
              e.preventDefault();
              addNote({ variables: { name: input.title } });
              input.title = '';}}>
            <input
              ref={node => {input.title = node}}/>
            
            <button type="submit">Add Note</button>
          </form>
 * 
 * 
 * 
 * <div className='form-group'>
                <input onChange={handleChange} name="title" value={input.title} autoComplete="off" className='from-control' placeholder="note title"></input>
            </div>

            <div className='form-group'>
                <textarea onChange={handleChange} name="content" value={input.content} autoComplete="off" className='from-control' placeholder="note content"></textarea>
            </div>
 * 
 * 
 */


return (
    <div className='container'>
      <ApolloProvider client={client}>
          <div class='center'>
            <h1 class='center'>My first Apollo app 🚀</h1>
            <br></br>
              <div className='text'>
              <Online> </Online>
              </div>
            <AddNote />
            <br></br>
            <NotesQuery />
            <br></br>
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

/** {
      mode ==='offline'?
      <div class="alert alert-warning" role="alert">You are in offline mode or some issue with connection</div>
      :null
    }
*/
    
    

 /**   
    <button onClick={registerBackgroundSync} className="btn btn-lg btn-info">Background Sync</button>

  */
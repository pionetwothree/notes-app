import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Notes from './components/Notes';
import CreateNote from './components/CreateNote';
import ApolloNotes from './components/ApolloNotes';
import Footer from './components/Footer';
import StockNews from './components/StockNews';

//import useOnlineStatus from '@rehooks/online-status';

/** 
function MyComponent() {
  const onlineStatus = useOnlineStatus();
  return (
    <div>
      <h1>You are {onlineStatus ? "Online" : "Offline"}</h1>
    </div>
  );
}
*/


function App() {
//Navbar
return (

  <Router>
    <Navbar />

    <Route path="/" exact>
      <Home />
    </Route>

    <Route path="/notes">
    <Notes />
    </Route>

    <Route path="/apollonotes">
      <ApolloNotes />
      
    </Route>

    <Route path="/create">
    <CreateNote />
    </Route>

    <Route path="/stocknews">
    <StockNews />
    </Route>

    

  <Footer> 
    
  </Footer>

  </Router>
)}

export default App;


/**
    <ApolloProvider client={client}>
          <div class='center'>
            <h2 class='center'>My first Apollo app 🚀</h2>
            <ExchangeRates />
          </div>
        </ApolloProvider>
 
 
 */

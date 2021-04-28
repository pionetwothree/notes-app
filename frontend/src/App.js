import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Notes1 from './components/Notes1';
import Notes2 from './components/Notes2';
import CreateNote from './components/CreateNote';
import ApolloNotes from './components/ApolloNotes';
import Footer from './components/Footer';
import StockNews from './components/StockNews';
import VirtualDOM from './components/VirtualDOM';
//import useOnlineStatus from '@rehooks/online-status';


function App() {
//Navbar
return (

  <Router>
    <Navbar />

    <Route path="/home" exact>
      <Home />
    </Route>

    <Route path="/notes1" exact>
      <Notes1 />
    </Route>

    <Route path="/notes2">
      <Notes2 />
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

    <Route path="/virtualdom">
    <VirtualDOM />
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

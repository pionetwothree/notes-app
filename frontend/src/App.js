import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Notes from './components/Notes';
import CreateNote from './components/CreateNote';
import News from './components/News';
import Footer from './components/Footer';
import StockNews from './components/StockNews';

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

    <Route path="/news">
    <News />
    </Route>

    <Route path="/create">
    <CreateNote />
    </Route>

    <Route path="/stocknews">
    <StockNews />
    </Route>

  <Footer />
  </Router>
)}

export default App;

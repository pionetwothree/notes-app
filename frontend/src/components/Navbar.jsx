import React from 'react';
import {Link} from 'react-router-dom';

function Navbar() {
    return <nav className='navbar bg-dark container'>
        <h4><Link className="Link" to="/home">Home</Link></h4>
        <h4><Link className="Link" to="/notes1">Notes1</Link></h4>
        <h4><Link className="Link" to="/notes2">Notes2</Link></h4>
        <h4><Link className="Link" to="/create">CreateNotes</Link></h4>
        <h4><Link className="Link" to="/apollonotes">ApolloNotes</Link></h4>
        <h4><Link className="Link" to="/stocknews">StockNews</Link></h4>
        <h4><Link className="Link" to="/virtualdom">VirtualDOM</Link></h4>
    </nav>

}

export default Navbar;
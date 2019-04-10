import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import DetailedContact from './DetailedContact';
import Contacts from './Contacts';

class App extends Component {
  render() {
    return (
        <Router>
            <Route path="/" exact component={ Contacts } />
            <Route path="/contact/:id" component={ DetailedContact } />
        </Router>
    );
  }
}

export default App;

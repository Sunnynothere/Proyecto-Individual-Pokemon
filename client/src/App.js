import './App.css';
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Form from './components/Form';
import Home from './components/Home';
import Details from './components/Details';
import axios from 'axios';
axios.defaults.baseURL = 'pokemon-production-f907.up.railway.app';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route path='/home' exact component={Home} />
        <Route path='/pokemon' exact component={Form} />
        <Route path='/home/:id' component={Details} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

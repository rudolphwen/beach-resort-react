import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';

import Home from './pages/Home';
import Rooms from './pages/Rooms';
import SingleRoom from './pages/SingleRoom';
import Error from './pages/Error';
import Navbar from './components/Navbar';

function App() {
  return (
    <Fragment>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} /> 
        <Route path="/rooms" exact component={Rooms} /> 
        <Route path="/rooms/:slug" component={SingleRoom} /> 
        <Route component={Error} />
      </Switch> 
    </Fragment>
  );
}

export default App;

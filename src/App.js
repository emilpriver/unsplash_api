import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import TransitionSwitch from 'react-router-dom-transition';

//pages
import Home from './components/home'
import Collection from './components/collection'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <TransitionSwitch duration={600}>
          <Route path="/" component={Home} exact />
          <Route path="/collection/:id" component={Collection} exact />
        </TransitionSwitch>
      </BrowserRouter>
    );
  }
}

export default App;

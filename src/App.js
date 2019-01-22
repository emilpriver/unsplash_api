import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


//pages
import Home from './components/home'
import Collection from './components/collection'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/collection/:id" component={Collection} exact />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

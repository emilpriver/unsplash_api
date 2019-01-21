import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


//pages
import Home from './components/home'
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} exact />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

import React, { Component } from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom'

import Login from './pages/Login';
import Gallery from './pages/Gallery';
import Detail from './pages/Detail';

import './font/iconfont.css'
import './styles/reset.css'

class App extends Component {
  render() {
    return (
      <Router>
        <>
          <Switch>
            <Route path="/" exact component={Detail}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/gallery" component={Gallery}></Route>
            <Route path="/detail/:id" component={Detail}></Route>
            {/* <Route path="/" component={NotFound}></Route> */}
          </Switch>
        </>
      </Router>
    );
  }
}

export default App;

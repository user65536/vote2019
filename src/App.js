import React, { Component } from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom'

import Login from './pages/Login';
import Gallery from './pages/Gallery';
import Detail from './pages/Detail';
import Alert from './components/Alert.js'

import './font/iconfont.css'
import './styles/reset.css'
import './styles/global.styl'

class App extends Component {
  render() {
    return (
      <Router>
          <>
            <Alert></Alert>
            <Switch>
              <Route path="/" exact component={Login}></Route>
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

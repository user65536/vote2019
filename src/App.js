import React, { Component } from 'react';

import LazyLoad from './components/LazyLoad'


import './index.styl'
class App extends Component {
  render() {
    return (
      <>
        <div className="app">react app</div>
        <div style={{width: "280px", height: "200px"}}>
          <LazyLoad 
          src="http://192.168.8.15:8000" 
          alt="test" 
          loadingSrc="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3257716873,281158601&fm=27&gp=0.jpg" 
          >
          </LazyLoad>
        </div>
        <img style={{width: "280px", height: "200px"}} src="http://192.168.8.15:8000" alt=""/>
      </>
    );
  }
}

export default App;

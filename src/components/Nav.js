import React, { Component } from 'react';

import '../styles/nav.styl'

class Nav extends Component {

  render () {
    return (
      <>
      <div className="wrapper-nav">
        <div className="logo"></div>
        <div className="slot">{
          this.props.children
        }</div>
        <div className="right">
          <div className="ticker">
            <span className="iconfont icon-toupiao"></span>
            <span className="num">5</span>
          </div>
          <div className="user">2017210550</div>
          <div className="quit">
            <span className="iconfont icon-dengchu"></span>
          </div>
          
        </div>
      </div>
      <div className="black"></div>
      </>
    )
  }

}

export default Nav;
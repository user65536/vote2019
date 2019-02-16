/**
 * @version 0.0.1
 * @description 登录页面
 * @author trage
 * @
 */
import React, { Component } from 'react';

import '../styles/login.styl'
import logo from '../static/logo.png'

class Login extends Component {
  state = {
    clientHeight: window.innerHeight + 'px',
    warnText: '用户名或密码不正确'
  }
  componentDidMount() {
    window.addEventListener('orientationchange',
    () => {this.setState({clientHeight: window.innerHeight + 'px'})},false);
  }
  render () {
    return (
      <div className="wrapper" style={{height: this.state.clientHeight}}>
        <div className="nav">
          <img src={logo} alt="北邮WIN" className="logo"/>
          <span className="title">第{"二"}届大创展</span>
        </div>
        <div className="login-wrap">
         <div className="login-inner">
          <div className="input-bar-wrap user">
            <span className="iconfont icon-yonghu1 icon-user"></span>
            <input type="text" className="user-input" placeholder="请输入用户名"/>
          </div>
          <div className="input-bar-wrap pass">
            <span className="iconfont icon-mima icon-pass"></span>
            <input type="text" className="pass-input" placeholder="请输入密码"/>
            <div className="warn" style={{display: this.state.warnText ? "block" : "none" }}>
              <span className="iconfont icon-xianshi_jinggao icon-warn"></span>
              <span className="warn-text">{this.state.warnText}</span>
            </div>
          </div>
          <div className="btn btn-radius btn-login">登录</div>
          <div className="skip"><a href="/gallery">先去看看</a></div>
         </div>
        </div>
      </div>
    )
  }

}

export default Login;
/**
 * @version 0.0.1
 * @description 登录页面
 * @author trage
 * @
 */
import React, { Component } from 'react';

import '../styles/login.styl'

class Login extends Component {

  componentDidMount() {

  }
  render () {
    return (
      <div className="wrapper">
        <div className="login-wrap">
         <div className="login-inner">
          <div className="input-bar-wrap user">
            <span className="iconfont icon-yonghu1 icon-user"></span>
            <input type="text" className="user-input" placeholder="请输入用户名"/>
          </div>
          <div className="input-bar-wrap pass">
            <span className="iconfont icon-mima icon-pass"></span>
            <input type="text" className="pass-input" placeholder="请输入密码"/>
          </div>
          <div className="btn btn-radius btn-login">登录</div>
          <div className="skip">先去看看</div>
         </div>
        </div>
      </div>
    )
  }

}

export default Login;
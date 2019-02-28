/**
 * @version 0.0.1
 * @description 登录页面
 * @author trage
 * @
 */
import React, { Component } from 'react';

import Validator from '../utils/validator'
import page from '../utils/page'

import '../styles/login.styl'
import logo from '../static/logo.png'



class Login extends Component {
  userInp = React.createRef()
  passInp = React.createRef()

  state = {
    clientHeight: window.innerHeight + 'px',
    warnText: '',
    loading: false
  }
  /**
   * js获取视口高度,避免键盘谈起影响背景图,同时监听旋转事件更新高度值
   */
  componentDidMount() {
    window.addEventListener('orientationchange',
    () => setTimeout( () => this.setState({clientHeight: window.innerHeight + 'px'} ), 300),false)
  }

  render () {
    return (
      <div className="wrapper-login" style={{height: this.state.clientHeight}}>
        <div className="nav">
          <img src={logo} alt="北邮WIN" className="logo"/>
          <span className="title">第{"十一"}届大创展</span>
        </div>
        <div className="login-wrap">
         <div className="login-inner">
          <div className="input-bar-wrap user">
            <span className="iconfont icon-yonghu1 icon-user"></span>
            <input type="text" className="user-input" placeholder="请输入用户名" ref={this.userInp} onInput={this.input} />
          </div>
          <div className="input-bar-wrap pass">
            <span className="iconfont icon-mima icon-pass"></span>
            <input type="password" className="pass-input" placeholder="请输入密码" ref={this.passInp} onInput={this.input} />
            <div className="warn" style={{display: this.state.warnText ? "block" : "none" }}>
              <span className="iconfont icon-xianshi_jinggao icon-warn"></span>
              <span className="warn-text">{this.state.warnText}</span>
            </div>
          </div>
          <div className="btn btn-radius btn-login" onClick={this.login} >{this.state.loading ? '登录中...' : '登录'}</div>
          <div className="skip"><a href="/#/gallery">先去看看</a></div>
         </div>
        </div>
      </div>
    )
  }

  login = () => {
    let {loading} = this.state
    let validator = new Validator()
    let username = this.userInp.current.value
    let password = this.passInp.current.value
    let validateResult = ''

    if (loading) {
      return false
    }

    validator.add(username, 'isNone', '用户名不能为空')
    validator.add(password, 'isNone', '密码不能为空')
    validateResult = validator.start()

    page.showAlert('登录成功')
    if(validateResult) {
      this.setState({
        warnText: validateResult
      })
    } else {
      this.setState({
        loading: true
      })
      // vote.login({username, password}).then()
    }
  }


  input = () => {
    this.state.warnText &&
    this.setState({
      warnText: ''
    })
  }

}

export default Login;
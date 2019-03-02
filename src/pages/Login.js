/**
 * @version 0.0.1
 * @description 登录页面
 * @author trage
 * @
 */
import React, { Component } from 'react';
import {Link} from 'react-router-dom'

import Validator from '../utils/validator'
import page from '../utils/page'
import vote from '../utils/vote'

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
  
  componentDidMount() {
    window.addEventListener('orientationchange',
    () => setTimeout( () => this.setState({clientHeight: window.innerHeight + 'px'} ), 300),false)
    vote.checkLogin().then( ({state}) => {
      if(state) {
        page.showAlert("您已登录")
        this.props.history.replace('gallery')
      }
    }).catch(() => {
      page.showAlert("网络错误")
    })
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
          <div className="skip"><Link to="/gallery" >先去看看</Link></div>
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
    if(validateResult) {
      this.showWarnText(validateResult)
    } else {
      this.btnLock('lock')
      vote.login({username, password})
          .then((response) => {
            const info = {
              "wrong password": "用户名或密码错误",
              "no such username": "用户名或密码错误"
            }
            if(response.state) {
              page.showAlert("登录成功")
              this.props.history.push('gallery')
            } else {
              this.btnLock('unlock')
              this.showWarnText(info[response.msg] ? info[response.msg] : '登录失败')
            }
          })
          .catch((response) => {
            this.btnLock('unlock')
            page.showAlert("网络错误")
          })
    }
  }

  showWarnText(text) {
    this.setState({
      warnText: text
    })
  }

  btnLock(operation) {
    this.setState({
      loading: operation === 'lock'
    })
  }

  input = () => {
    this.state.warnText &&
    this.setState({
      warnText: ''
    })
  }

}

export default Login;
import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'

import vote from '../utils/vote'
import page from '../utils/page'

import '../styles/nav.styl'


class Nav extends Component {
  state = {
    loginState: false,
    userID: '',
    ticketLeft: ''
  }

  componentDidMount () {
    vote.checkLogin().then( ({state, id}) => {
      if(state) {
        this.setState({loginState: true, userID: id})
        return vote.getVoteLeft()
      } else {
        this.setState({
          loginState: false
        })
      }
    }).then((num) => {
      this.setState({
        ticketLeft: num
      })
    }).catch(page.showAlert)
  }

  render () {
    return (
      <>
      <div className="wrapper-nav">
        <div className="logo"></div>
        <div className="slot">{
          this.props.children
        }</div>
        <div className="right">
          {
            this.state.loginState ? (
              <>
                <div className="ticker">
                  <span className="iconfont icon-toupiao"></span>
                  <span className="num">{this.state.ticketLeft}</span>
                </div>
                <div className="user">{this.state.userID}</div>
                <div onClick={this.logout} className="quit">
                  <span className="iconfont icon-dengchu"></span>
                </div>
              </>
            ) : (
              <button onClick={this.navigateToLogin} className="login">登录</button>
            )
          }
        </div>
      </div>
      <div className="black"></div>
      </>
    )
  }
  navigateToLogin = () => {
    this.props.history.push("login?from=0")
  }
  logout = () => {
    vote.logout().then((res) => {
      this.setState({
        loginState: false
      })
    }).catch(page.showAlert)
  }

}

export default withRouter(Nav);
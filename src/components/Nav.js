import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import store from '../store/store'

import vote from '../utils/vote'
import page from '../utils/page'

import '../styles/nav.styl'


class Nav extends Component {
  state = {
    loginState: false,
    userID: '',
    ticketLeft: store.getState().voteLeft
  }

  componentDidMount () {
    store.subscribe(() => {
      if(store.getState().voteLeft >= 0) {
        this.setState({
          ticketLeft: store.getState().voteLeft
        })
      }
    })
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
      let action = {
        type: 'RENEW_VOTE_NUM',
        value: num
      }
      store.dispatch(action)
    }).catch(page.showAlert)
  }

  render () {
    return (
      <>
      <div className={`wrapper-nav ${this.props.blur}`}>
        <div onClick={this.backHome} className="logo"></div>
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
      <div className="blank"></div>
      </>
    )
  }
  navigateToLogin = () => {
    this.props.history.push("/login")
  }
  logout = () => {
    vote.logout().then((res) => {
      this.setState({
        loginState: false
      })
    }).catch(page.showAlert)
  }
  backHome = () => {
    console.log('a')
    this.props.history.push('/gallery')
  }
}

export default withRouter(Nav);
import React, { Component } from 'react';
import store from '../store/store'

import '../styles/toast.styl'
import vote from '../utils/vote';
import page from '../utils/page'

class Toast extends Component {
  codeInput = React.createRef()
  state = {
    warnText: '投票后不可撤销或更改',
    code: null,
    submitLock: false
  }
  componentDidMount () {
    this.renderCode()
  }
  render () {
    return (
      <>
        <div className="wrapper-toast">
          <div className="title">确认投票</div>
          <div className="input-wrap">
            <div className="input">
              <input onKeyDown={this.testEnter} ref={this.codeInput} type="text"/>
            </div>
            <img className="code" src={this.state.code} alt="验证码"/>
          </div>
          <div className="warn-wrap">
            <div className="left">
              {this.state.warnText ? <span className="iconfont icon-jinggao"></span> : ''}
              <span className="warn-text">{this.state.warnText}</span>
            </div>
            <div className="right">
              <span onClick={this.renderCode} className="change">换一个</span>
            </div>
          </div>
          <div className="btn-wrap">
            <div className="btn cancel" onClick={this.props.onHide} >取消</div>
            <div className={`btn submit ${this.state.submitLock ? 'lock' : ''}`} onClick={this.submitCode}>{this.state.submitLock ? '提交中' : '提交'}</div>
          </div>
        </div>
      </>
    )
  }
  submitCode = () => {
    if(this.state.submitLock) {
      return false
    } else {
      this.submitLock("lock")
    }
    const value = this.codeInput.current.value
    const id = this.props.id
    vote.voteNow({captcha: value, id})
    .then(res => {
      let action = {
        type: 'RENEW_VOTE_NUM',
        value: store.getState().voteLeft - 1
      }
      store.dispatch(action)
      page.showAlert("投票成功")
      this.submitLock("unlock")
      this.props.onHide()
    })
    .catch(err => {
      this.submitLock("unlock")
      this.codeInput.current.value = ''
      this.renderCode()
      page.showAlert(err)
    })
  }
  renderCode = () => {
    vote.getCaptcha().then(res => {
      this.setState({
        code: res
      })
    }).catch(page.showAlert)
  }
  submitLock = (operate) => {
    this.setState({
      submitLock: operate === 'lock'
    })
  }
  testEnter = (e) => {
    if(e.which === 13) {
      this.submitCode()
    }
  }
}

export default Toast;
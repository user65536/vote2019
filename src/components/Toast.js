import React, { Component } from 'react';

import '../styles/toast.styl'
import vote from '../utils/vote';
import page from '../utils/page'

class Toast extends Component {
  codeInput = React.createRef()
  state = {
    warnText: '投票后不可撤销或更改',
    code: null
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
              <input ref={this.codeInput} type="text"/>
            </div>
            <img className="code" src={this.state.code} alt="验证码"/>
          </div>
          <div className="warn-wrap">
            <span className="iconfont icon-xianshi_jinggao"></span>
            <span className="warn-text">{this.state.warnText}</span>
          </div>
          <div className="btn-wrap">
            <div className="btn cancel" onClick={this.props.onHide} >取消</div>
            <div className="btn submit" onClick={this.submitCode}>提交</div>
          </div>
        </div>
      </>
    )
  }
  submitCode = () => {
    const value = this.codeInput.current.value
    const id = this.props.id
    vote.voteNow({captcha: value, id})
    .then(res => {
      page.showAlert("投票成功")
      this.props.onHide()
    })
    .catch(err => {
      if(err === "验证码错误") {
        this.setState({
          code: null
        })
        this.codeInput.current.value = ''
        this.renderCode()
      }
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
}

export default Toast;
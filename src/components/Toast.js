import React, { Component } from 'react';

import '../styles/toast.styl'
import code from '../static/code.png'

class Toast extends Component {
 state = {
  warnText: '投票后不可撤销或更改',
  code: code
 }
  render () {
    return (
      <>
        <div className="wrapper-toast">
          <div className="title">确认投票</div>
          <div className="input-wrap">
            <div className="input">
              <input type="text"/>
            </div>
            <img className="code" src={this.state.code} alt="验证码"/>
          </div>
          <div className="warn-wrap">
            <span className="iconfont icon-xianshi_jinggao"></span>
            <span className="warn-text">{this.state.warnText}</span>
          </div>
          <div className="btn-wrap">
            <div className="btn cancel">取消</div>
            <div className="btn submit">提交</div>
          </div>
        </div>
      </>
    )
  }

}

export default Toast;
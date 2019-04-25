import React, { Component } from 'react';


import '../styles/card.styl'
import iconCard from "../static/shuaka.png"
import vote from '../utils/vote';

class Card extends Component {
  state = {
    error: -1, // -1 waiting 0 suc 1 error 2 pending
    successInfo: {
      name: '',
      number: ''
    },
    waitingTimer: null
  }
  oInput = React.createRef();
  componentDidMount() {
    this.oInput.current.focus()
  }
  CodeInput = (e) => {
    if(e.which === 13) {
      let value = (this.oInput.current.value)
      this.activate(value)
      this.oInput.current.value = ''
    }
  }
  activate = (value) => {
    clearTimeout(this.waitingTimer)
    this.setState({
      error: 2
    })
    vote.activate(value).then(info => {
      this.setTimer(2000)
      this.setState({
        successInfo: {
          name: info.name,
          number: info.id
        },
        error: 0
      })
    }).catch(code => {
      this.setTimer(2000)
      this.setState({
        error: 1
      })
    })
  }
  setTimer = (time) => {
    this.waitingTimer = setTimeout(() => {
      this.setState({
        error: -1
      })
    }, time)
  }
  render () {
    return (
      <div className="wrapper-card">
        <input type="text" onBlur={() => {this.oInput.current.focus()}} onKeyPress={this.CodeInput} ref={this.oInput}/>
        <div className="card-box">
          <div className="title">
            <div className="icon">
              <img src={iconCard} alt=""/>
            </div>
            <div className="name text-normal">刷卡激活</div>
          </div>
          <div className="content">
            {
              this.state.error ===  1 && (
                <div className="error-wrap">
                  <div className="iconfont icon-cuowu"></div>
                  <div className="error-info">请重试</div>
                </div>
              )
            }
            {
              this.state.error === 0 && (
                <div className="success-wrap">
                  <div className="name text-normal">欢迎: {this.state.successInfo.name}</div>
                  <div className="number text-normal">{this.state.successInfo.number}</div>
                  <div className="success-info">刷卡成功</div>
                </div>
              )
            }
            {
              this.state.error === -1 && (
                <div className="waiting-wrap">
                  <div className="waiting">等待刷卡...</div>
                </div>
              )
            }
            {
              this.state.error === 2 && (
                <div className="pending-wrap">
                  <div className="pending">识别中...</div>
                </div>
              )
            }
          </div>
        </div>
      </div>
    )
  }

}

export default Card;
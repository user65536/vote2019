import React, { Component } from 'react';

import Nav from '../components/Nav';

import vote from '../utils/vote'
import page from '../utils/page'

import '../styles/lottery.styl'

const random = (Math.random()*2-1)*30;

const angle = {
  '-2': -1800,
  '-1': -1800,
  '0': 144 + random,
  '1': 72 + random,
  '2': random,
  '3': -72 + random,
  '4': -144 + random
}


class Lottery extends Component {

  nameInput = React.createRef();
  phoneInput = React.createRef();
  addressInput = React.createRef();

  state = {
    lotteryLock: false,
    prize: '-1', // -2未投票 -1已投票未抽奖 0 谢谢 1-4 奖
    showForm: false
  }

  componentDidMount() {
    vote.checkRoll().then(prize => {
      this.setState({
        prize
      })
    }).catch((msg) => {
      if(msg === 0) {
        page.showAlert('请登录或重试')
      } else {

      }
    })
  }
  render () {
    return (
      <>
        <Nav></Nav>
        <div className="lottery-wrapper">
          <div className="turntable-wrap">
            <div className="pointer"></div>
            <div 
            style={{transform: `rotate(${angle[this.state.prize] + 1800}deg)`}} 
            className="turntable">
            </div>
          </div>
          {/* 按钮 */}
          {
            // eslint-disable-next-line
            this.state.prize == '-1' ? (
              <div 
              onClick={this.start} 
              className={`start ${this.state.lotteryLock ? 'disable' : ''}`}>
              {this.state.lotteryLock  ? '摇奖中...' : '开始抽奖' }
              </div> 
            )
            : (
              <div 
              className={`start disable`}>
                {
                  // eslint-disable-next-line
                  this.state.prize == '-2' ? '请先投票' : ' 已抽奖'
                }
              </div> 
            )
          }
          <div className="info">如获奖请前往咨询台领奖</div>
          {
            this.state.showForm ? (
              <div className="form-wrap">
                <div className="info">请前往咨询台领奖</div>
                <ul className="form">
                  <li className="form-item">
                    <label className="item-name">姓名</label>
                    <input ref={this.nameInput} type="text" className="input"/>
                  </li>
                  <li className="form-item">
                    <label className="item-name">手机号</label>
                    <input ref={this.phoneInput} type="text" className="input"/>
                  </li>
                  <li className="form-item">
                    <label className="item-name">地址</label>
                    <input ref={this.addressInput} type="text" className="input"/>
                  </li>
                </ul>
                <div onClick={this.submitForm} className="submit">提交</div>
              </div>
            ) : ''
          }
          
        </div>
      </>
    )
  }

  submitForm = () => {
    const data = {
      name: this.nameInput.current.value,
      mobile: this.phoneInput.current.value,
      address: this.addressInput.current.value,
    }
    vote.fillForm(data).then(() => {
      page.showAlert('提交成功')
      this.setState({
        showForm: false
      })
    }).catch(() => {
      page.showAlert('请重试')
    })
  }

  start = () => {
    if(this.state.lotteryLock) {
      return false
    }
    this.setState({
      lotteryLock: true
    })
    vote.drawLottery().then(prize => {
      this.setState({
        prize
      })
    }).catch( state => {
      if(state === 0) { //没登录
        page.showAlert('请登录或重试')
      } else {
        page.showAlert('请再试一次')
      }
      this.setState({
        lotteryLock: false
      })
    })
  }
}

export default Lottery;
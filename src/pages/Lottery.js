import React, { Component } from 'react';

import '../styles/lottery.styl'

class Lottery extends Component {

  render () {
    return (
      <div className="lottery-wrapper">
        <div className="info"></div>
        <div className="turntable-wrap">
          <div className="pointer"></div>
          <div className="turntable">
            
          </div>
        </div>
        <div className="start">开始抽奖</div>
      </div>
    )
  }

}

export default Lottery;
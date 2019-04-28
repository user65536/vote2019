import React, { Component } from 'react';

import '../styles/board.styl'

class ScoreBoard extends Component {
  render () {
    return (
      <div className="wrapper-board">
        {/* <div className="text">共</div> */}
        {
          this.props.number.map((number, index) => {
            return (
              <div key={index + 'id'} className="unit">
                <ul style={{transform: `translateY(-${40*number}px)`}} className="number-wrap">
                  <li className="item">0</li>
                  <li className="item">1</li>
                  <li className="item">2</li>
                  <li className="item">3</li>
                  <li className="item">4</li>
                  <li className="item">5</li>
                  <li className="item">6</li>
                  <li className="item">7</li>
                  <li className="item">8</li>
                  <li className="item">9</li>
                </ul>
              </div>
            )
          })
        }
        {/* <div className="text">票</div> */}
      </div>
    )
  }

}

export default ScoreBoard;
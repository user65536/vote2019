import React, { Component } from 'react';
import alertStore from '../store/alert'

class Alert extends Component {
  state = {
    text: alertStore.getState().text,
    show: false
  }
  componentDidMount() {
    alertStore.subscribe(this.showAlert)
  }
  render () {
    return (
      <div onAnimationEnd={this.animationEnd} className={`alert ${this.state.show ? 'show' : ''}`}>{this.state.text}</div>
    )
  }
  showAlert = () => {
    this.setState({
      show: true,
      text: alertStore.getState().text
    })
  }
  animationEnd = () => {
    this.setState({
      show: false
    })
  }
}

export default Alert;
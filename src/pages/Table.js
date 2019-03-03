import React, { Component } from 'react';

import '../styles/table.styl'

class Table extends Component {
  state = {
    scroll: false
  }
  componentDidMount () {
    setInterval(() => {
      this.change()
    }, 4000)
  }
  render () {
    return (
      <div className="wrapper-table">
        <div className="header"></div>
        <div className="content">
          <div className="current-wrap">
            <div className={`item item-1 ${this.state.scroll? "previous" : "current"}`}></div>
            <div className={`item item-2 ${this.state.scroll? "previous" : "current"}`}></div>
            <div className={`item item-3 ${this.state.scroll? "previous" : "current"}`}></div>
            <div className={`item item-4 ${this.state.scroll? "previous" : "current"}`}></div>
            <div className={`item item-5 ${this.state.scroll? "previous" : "current"}`}></div>
            <div className={`item item-6 ${this.state.scroll? "previous" : "current"}`}></div>
            <div className={`item item-right item-1 ${this.state.scroll? "previous" : "current"}`}></div>
            <div className={`item item-right item-2 ${this.state.scroll? "previous" : "current"}`}></div>
            <div className={`item item-right item-3 ${this.state.scroll? "previous" : "current"}`}></div>
            <div className={`item item-right item-4 ${this.state.scroll? "previous" : "current"}`}></div>
            <div className={`item item-right item-5 ${this.state.scroll? "previous" : "current"}`}></div>
            <div className={`item item-right item-6 ${this.state.scroll? "previous" : "current"}`}></div>
          </div>
          <div>
            <div className={`item item-1 ${this.state.scroll ? "current current-withTransition" : "next"}`}></div>
            <div className={`item item-2 ${this.state.scroll ? "current current-withTransition" : "next"}`}></div>
            <div className={`item item-3 ${this.state.scroll ? "current current-withTransition" : "next"}`}></div>
            <div className={`item item-4 ${this.state.scroll ? "current current-withTransition" : "next"}`}></div>
            <div className={`item item-5 ${this.state.scroll ? "current current-withTransition" : "next"}`}></div>
            <div className={`item item-6 ${this.state.scroll ? "current current-withTransition" : "next"}`}></div>
            <div className={`item item-right item-1 ${this.state.scroll ? "current current-withTransition" : "next"}`}></div>
            <div className={`item item-right item-2 ${this.state.scroll ? "current current-withTransition" : "next"}`}></div>
            <div className={`item item-right item-3 ${this.state.scroll ? "current current-withTransition" : "next"}`}></div>
            <div className={`item item-right item-4 ${this.state.scroll ? "current current-withTransition" : "next"}`}></div>
            <div className={`item item-right item-5 ${this.state.scroll ? "current current-withTransition" : "next"}`}></div>
            <div onTransitionEnd={this.backToStart} className={`item item-right item-6 ${this.state.scroll ? "current current-withTransition" : "next"}`}></div>
          </div>
        </div>
      </div>
    )
  }
  change = () => {
    this.setState({
      scroll: true
    })
  }
  backToStart = () => {
    this.setState({
      scroll: false
    })
  }
}

export default Table;
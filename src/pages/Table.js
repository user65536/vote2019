import React, { Component } from 'react';

import '../styles/table.styl'

class Table extends Component {
  state = {
    list: [{"id":0,"name":"test项目0","voteNumber":20},{"id":1,"name":"test项目1","voteNumber":18},{"id":2,"name":"test项目2","voteNumber":11},{"id":3,"name":"test项目3","voteNumber":6},{"id":4,"name":"test项目4","voteNumber":5},{"id":5,"name":"test项目5","voteNumber":4},{"id":6,"name":"test项目6","voteNumber":11},{"id":7,"name":"test项目7","voteNumber":19},{"id":8,"name":"test项目8","voteNumber":15},{"id":9,"name":"test项目9","voteNumber":16},{"id":10,"name":"test项目10","voteNumber":17},{"id":11,"name":"test项目11","voteNumber":7},{"id":12,"name":"test项目12","voteNumber":11},{"id":13,"name":"test项目13","voteNumber":15},{"id":14,"name":"test项目14","voteNumber":4},{"id":15,"name":"test项目15","voteNumber":3},{"id":16,"name":"test项目16","voteNumber":7},{"id":17,"name":"test项目17","voteNumber":15},{"id":18,"name":"test项目18","voteNumber":15},{"id":19,"name":"test项目19","voteNumber":2},{"id":20,"name":"test项目20","voteNumber":15},{"id":21,"name":"test项目21","voteNumber":18},{"id":22,"name":"test项目22","voteNumber":11},{"id":23,"name":"test项目23","voteNumber":7},{"id":24,"name":"test项目24","voteNumber":4},{"id":25,"name":"test项目25","voteNumber":11},{"id":26,"name":"test项目26","voteNumber":12},{"id":27,"name":"test项目27","voteNumber":1},{"id":28,"name":"test项目28","voteNumber":16},{"id":29,"name":"test项目29","voteNumber":17},{"id":30,"name":"test项目30","voteNumber":10},{"id":31,"name":"test项目31","voteNumber":15},{"id":32,"name":"test项目32","voteNumber":16},{"id":33,"name":"test项目33","voteNumber":13},{"id":34,"name":"test项目34","voteNumber":13},{"id":35,"name":"test项目35","voteNumber":9},{"id":36,"name":"test项目36","voteNumber":5},{"id":37,"name":"test项目37","voteNumber":11},{"id":38,"name":"test项目38","voteNumber":0},{"id":39,"name":"test项目39","voteNumber":10},{"id":40,"name":"test项目40","voteNumber":2},{"id":41,"name":"test项目41","voteNumber":8}],
    currentGroup: 0,
    currentList: [],
    nextList: [],
    scroll: false
  }
  componentDidMount () {
    this.setState({
      currentList: this.state.list.slice(0, 12),
      nextList: this.state.list.slice(12, 24)
    })
    setInterval(() => {
      // this.change()
    }, 4000)
  }
  render () {
    return (
      <div className="wrapper-table">
        <div className="header"></div>
        <div className="content">
          <div className="current-wrap">
            <div className={`item item-1 ${this.state.scroll ? "previous" : "current"}`}>
              <div className="rank">1</div>
              <div className="title">基于纳米尺度亚波长光基于纳米尺度亚波长光</div>
              <div className="voteNumber">10000票</div>
            </div>
            <div className={`item item-2 ${this.state.scroll ? "previous" : "current"}`}></div>
            <div className={`item item-3 ${this.state.scroll ? "previous" : "current"}`}></div>
            <div className={`item item-4 ${this.state.scroll ? "previous" : "current"}`}></div>
            <div className={`item item-5 ${this.state.scroll ? "previous" : "current"}`}></div>
            <div className={`item item-6 ${this.state.scroll ? "previous" : "current"}`}></div>
            <div className={`item item-right item-1 ${this.state.scroll ? "previous" : "current"}`}></div>
            <div className={`item item-right item-2 ${this.state.scroll ? "previous" : "current"}`}></div>
            <div className={`item item-right item-3 ${this.state.scroll ? "previous" : "current"}`}></div>
            <div className={`item item-right item-4 ${this.state.scroll ? "previous" : "current"}`}></div>
            <div className={`item item-right item-5 ${this.state.scroll ? "previous" : "current"}`}></div>
            <div className={`item item-right item-6 ${this.state.scroll ? "previous" : "current"}`}></div>
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
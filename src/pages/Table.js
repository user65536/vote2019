
import React, { Component } from 'react';

import '../styles/table.styl'
import logo from '../static/logo2.png'

import vote from '../utils/vote'

class Table extends Component {
  state = {
    list: '',
    currentGroup: 0,
    currentList: [],
    nextList: [],
    scroll: false
  }
  componentDidMount () {
    this.addFnToWindow()
    vote.getVoteRecord().then(list => {
      this.setState({
        list: list,
        currentList: list.slice(0, 12),
        nextList: list.slice(12, 24)
      })
    }).catch(() => {

    })
    window.vote.timer = setInterval(() => {
      this.change()
    }, 5000)
  }
  render () {
    return (
      <>
        <div className="warn">屏幕宽度过窄</div>
        <div className="wrapper-table">
          <div className="header">
            <div className="left">
              <div className="logo">
                <img src={logo} alt="第十一届大创展"/>
              </div>
              {/* <div className="title">
                <div className="zh">北京邮电大学</div>
                <div className="en">第十一届大创展</div>
                <div className="en">实时得票统计</div>
              </div> */}
            </div>
            <div className="center">
              <span className="text">共</span>
              <span className="number">19999</span>
              <span className="text">票</span>
            </div>
            <div className="right">
              <div className="time">18<span className="point">:</span>30<span className="point">:</span>22</div>
              <div className="date">星期六 3-2-2019</div>
            </div>
          </div>
          <div className="content">
            <div className="current-wrap">
              {
                this.state.currentList.map((project, index) => {
                  return (
                    <div key={project.id+project.name} className={`item item-${index % 6 + 1} ${index > 5 ? 'item-right' : ''} ${this.state.scroll ? "previous" : "current"}`}>
                      <div className="rank">{project.rank}</div>
                      <div className={`title`}>
                        <span>{project.name}</span>
                      </div>
                      <div className="voteNumber">{project.voteNumber}票</div>
                    </div>
                  )
                })
              }
              {/* <div className={`item item-2 ${this.state.scroll ? "previous" : "current"}`}></div>
              <div className={`item item-3 ${this.state.scroll ? "previous" : "current"}`}></div>
              <div className={`item item-4 ${this.state.scroll ? "previous" : "current"}`}></div>
              <div className={`item item-5 ${this.state.scroll ? "previous" : "current"}`}></div>
              <div className={`item item-6 ${this.state.scroll ? "previous" : "current"}`}></div>
              <div className={`item item-right item-1 ${this.state.scroll ? "previous" : "current"}`}></div>
              <div className={`item item-right item-2 ${this.state.scroll ? "previous" : "current"}`}></div>
              <div className={`item item-right item-3 ${this.state.scroll ? "previous" : "current"}`}></div>
              <div className={`item item-right item-4 ${this.state.scroll ? "previous" : "current"}`}></div>
              <div className={`item item-right item-5 ${this.state.scroll ? "previous" : "current"}`}></div>
              <div className={`item item-right item-6 ${this.state.scroll ? "previous" : "current"}`}></div> */}
            </div>
            <div>
              {
                this.state.nextList.map((project, index) => {
                  return (
                    <div 
                    onTransitionEnd={(this.state.nextList.length > 6 ? 
                    (index === 5 ? this.backToStart : null ) : 
                    index === this.state.nextList.length - 1 ? this.backToStart : null) } 
                    key={project.id + project.name + 'next'} 
                    className={`item item-${index % 6 + 1} ${index > 5 ? 'item-right' : ''}  ${this.state.scroll ? "current current-withTransition" : "next"}`}>
                      <div className="rank">{project.rank}</div>
                      <div className={`title`}>
                        <span>{project.name}</span>
                      </div>
                      <div className="voteNumber">{project.voteNumber}票</div>
                    </div>
                  )
                })
              }
              {/* <div className={`item item-1 ${this.state.scroll ? "current current-withTransition" : "next"}`}></div>
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
              <div onTransitionEnd={this.backToStart} className={`item item-right item-6 ${this.state.scroll ? "current current-withTransition" : "next"}`}></div> */}
            </div>
          </div>
        </div>
      </>
    )
  }
  change = () => {
    this.setState({
      scroll: true
    })
  }
  backToStart = () => {
    let groupLength = Math.ceil(this.state.list.length / 12)
    let currentGroup = (this.state.currentGroup + 1) % groupLength
    let nextGroup = (this.state.currentGroup + 2) % groupLength
    if(nextGroup === groupLength - 1) {
      vote.getVoteRecord().then(list => {
        this.setState({
          list: list
        })
      })
    }
    this.setState({
      scroll: false,
      currentGroup: currentGroup,
      currentList: this.state.list.slice(currentGroup * 12, currentGroup * 12 + 12),
      nextList: this.state.list.slice(nextGroup * 12, nextGroup * 12 + 12)
    })
  }
  addFnToWindow = () => {
    window.vote = {}
    window.vote.timer = null
    window.vote.stopScroll = () => {
      clearInterval(window.vote.timer)
    }
    window.vote.startScroll = (time) => {
      clearInterval(window.vote.timer)
      window.vote.timer = setInterval(() => {
        this.change()
      }, time)
    }
  }
}

export default Table;

import React, { Component } from 'react';

import ScoreBoard from '../components/ScoreBoard'

import '../styles/table.styl'
import logo from '../static/logo2.png'

import vote from '../utils/vote'

class Table extends Component {
  state = {
    list: '',
    currentGroup: 0,
    currentList: [],
    nextList: [],
    scroll: false,
    voteNumber: '00000',
    time: {
      hour: '0',
      minute: '00',
      second: '00',
      month: '0',
      date: '0',
      day: 'SUN',
      year: '0000'
    }
  }
  componentDidMount () {
    this.addFnToWindow()
    this.autoGetVoteNumber()
    this.autoFreshTime()
    vote.getVoteRecord().then(list => {
      this.setState({
        list: list,
        currentList: list.slice(0, 12),
        nextList: list.slice(12, 24)
      })
    }).catch((e) => {
      console.log(e)
    })
    window.vote.scrollTimer = setInterval(() => {
      this.change()
    }, 10000)
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
              {/* <div className="title-g">
                <div className="zh">北京邮电大学</div>
                <div className="en">第十一届大创展</div>
                <div className="en">实时得票统计</div>
              </div> */}
            </div>
            <div className="center">
              <ScoreBoard number={this.state.voteNumber.split("")} ></ScoreBoard>
            </div>
            <div className="right">
              <div className="time">{this.state.time.hour}<span className="point">:</span>{this.state.time.minute}<span className="point">:</span>{this.state.time.second}</div>
              <div className="date">{this.state.time.day} {`${this.state.time.month}-${this.state.time.date}-${this.state.time.year}`}</div>
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
                    className={`item item-${index % 6 + 1} ${index > 5 ? 'item-right' : ''} ${this.state.scroll ? "current current-withTransition" : "next"}`}>
                      <div className="rank">{project.rank}</div>
                      <div className={`title`}>
                        <span>{project.name}</span>
                      </div>
                      <div className="voteNumber">{project.voteNumber}票</div>
                    </div>
                  )
                })
              }
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
    window.vote.scrollTimer = null
    window.vote.stopScroll = () => {
      clearInterval(window.vote.scrollTimer)
    }
    window.vote.startScroll = (time) => {
      clearInterval(window.vote.scrollTimer)
      window.vote.scrollTimer = setInterval(() => {
        this.change()
      }, time)
    }
  }
  autoGetVoteNumber = () => {
    vote.getTotalVote().then(number => {
      this.setState({
        voteNumber: number
      })
    }).catch((e) => {
      console.log(e)
    })
    window.vote.refreshTotalTimer = setInterval(() => {
      vote.getTotalVote().then(number => {
        this.setState({
          voteNumber: number
        })
      }).catch((e) => {
        console.log(e)
      })
    }, 15000)
  }
  autoFreshTime = () => {
    window.vote.dateTimer = setInterval(() => {
      let daySet = ['SUN','MON','TUE','WED','THU','FRI','SAT']
      let date = new Date()
      this.setState({
        time: {
          hour: date.getHours(),
          minute: date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(),
          second: date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds(),
          day: daySet[date.getDay()],
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          date: date.getDate()
        }
      })
    }, 1000)
  }
}

export default Table;
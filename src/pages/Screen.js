import React, { Component } from 'react';

import vote from '../utils/vote'

import ScoreBoard from '../components/ScoreBoard'


import '../styles/screen.styl'

class Screen extends Component {
  state = {
    list: '',
    currentGroup: 0,
    currentList: [],
    nextList: [],
    scroll: false,
    voteNumber: '00000',
    top5List: []
  }
  componentDidMount () {
    this.addFnToWindow()
    this.autoGetVoteNumber()
    document.onkeypress= (e) => {
      if(e.which === 13) {
        this.change()
      }
    }
    window.vote.scrollTimer = setInterval(() => {
      this.change()
    }, 3000)
    vote.getVoteRecord().then(list => {
      this.setState({
        list: list,
        currentList: list.slice(0, 6),
        nextList: list.slice(6, 12)
      })
    }).catch((e) => {
      console.log(e)
    })
    // window.vote.scrollTimer = setInterval(() => {
    //   this.change()
    // }, 10000)
  }
  render () {
    return (
      <div className="wrapper-screen">
        <div className="left-box">
          <div className="name-title">
            <div className="text mini-title">北京邮电大学</div>
            <div className="text title">第十一届大创展</div>
          </div>
          <div className="top5-wrap">
            <div className="text title">TOP5</div>
            <ul className="top5-list">
              {
                this.state.top5List.map((project, index) => {
                  return (
                    <li key={index} className="top5-item">
                      <div className="circle-area">
                        <div className="circle"></div>
                      </div>
                      <div className="text item-title">{project.name}</div>
                      <div className="text vote-num">{project.voteNumber}</div>
                    </li>
                  )
                })
              }
              {/* <li className="top5-item">
                <div className="circle-area">
                  <div className="circle"></div>
                </div>
                <div className="text item-title">艺考美术生社群--艺伴</div>
                <div className="text vote-num">1834</div>
              </li>
              <li className="top5-item">
                <div className="circle-area">
                  <div className="circle"></div>
                </div>
                <div className="text item-title">潜在行为模式下的连续兴趣点推荐算法研究</div>
                <div className="text vote-num">1834</div>
              </li>
              <li className="top5-item">
                <div className="circle-area">
                  <div className="circle"></div>
                </div>
                <div className="text item-title">基于Android的平面学习媒体增强系统</div>
                <div className="text vote-num">1834</div>
              </li>
              <li className="top5-item">
                <div className="circle-area">
                  <div className="circle"></div>
                </div>
                <div className="text item-title">分布式可视化计算平台</div>
                <div className="text vote-num">1834</div>
              </li>
              <li className="top5-item">
                <div className="circle-area">
                  <div className="circle"></div>
                </div>
                <div className="text item-title">基于纳米尺度亚波长光栅的硅基高速、大功率、低功耗混合集成光探测器制备及其研究</div>
                <div className="text vote-num">1834</div>
              </li> */}
            </ul>
          </div>
        </div>
        <div className="right-box">
          <div className="header">
            <div className="left">
              <div className="text main-title">票数统计</div>
            </div>
            <div className="right">
              <div className="total-vote-board">
                <div className="text board-name">总票数</div>
                <ScoreBoard number={this.state.voteNumber.split("")} ></ScoreBoard>
              </div>
            </div>
          </div>
          <div className="table">
            <div className="table-head">
              <div className="text rank">排名</div>
              <div className="text project-title">项目标题</div>
              <div className="text leader">负责人</div>
              <div className="text vote-num">票数</div>
            </div>
            <div className="list-wrap">
              <ul className="project-list">
                <div>
                {
                  this.state.currentList.map((item, index) => {
                    return (
                      <li key={`current-${item.id}`} className={`project-item item-${index} ${this.state.scroll ? "previous" : "current"}`}>
                      <div className="text text-rank rank">{item.rank}</div>
                      <div className="text wrap-2 text-project-item project-title">{item.name}</div>
                      <div className="text text-leader leader">{item.leader}</div>
                      <div className="text text-vote-num vote-num">{item.voteNumber}</div>
                    </li>
                    )
                  })
                }
                </div>
                <div>
                {
                  this.state.nextList.map((item, index) => {
                    return (
                      <li 
                      onTransitionEnd={(this.state.nextList.length > 6 ? 
                      (index === 5 ? this.backToStart : null ) : 
                      index === this.state.nextList.length - 1 ? this.backToStart : null) } 
                      key={`next-${item.id}`} 
                      className={`project-item item-${index} ${this.state.scroll ? "current current-withTransition" : "next"}`}>
                        <div className="text text-rank rank">{item.rank}</div>
                        <div className="text wrap-2 text-project-item project-title">{item.name}</div>
                        <div className="text text-leader leader">{item.leader}</div>
                        <div className="text text-vote-num vote-num">{item.voteNumber}</div>
                      </li>
                    )
                  })
                }
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
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
  backToStart = () => {
    let groupLength = Math.ceil(this.state.list.length / 6)
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
      currentList: this.state.list.slice(currentGroup * 6, currentGroup * 6 + 6),
      nextList: this.state.list.slice(nextGroup * 6, nextGroup * 6 + 6)
    })
  }
  change = () => {
    this.setState({
      scroll: true
    })
  }
  autoGetVoteNumber = () => {
    vote.getTotalVote().then(number => {
      this.setState({
        voteNumber: number
      })
    }).catch((e) => {
      console.log(e)
    })
    vote.getTop5().then(list => {
      this.setState({
        top5List: list
      })
    }).catch(e => {

    })
    window.vote.refreshTotalTimer = setInterval(() => {
      vote.getTotalVote().then(number => {
        this.setState({
          voteNumber: number
        })
      }).catch((e) => {
        console.log(e)
      })
      vote.getTop5().then(list => {
        this.setState({
          top5List: list
        })
      }).catch(e => {
  
      })
    }, 5000)
  }
}

export default Screen;
import React, { Component } from 'react';

import Nav from '../components/Nav';
import LazyLoad from '../components/LazyLoad';
import Toast from '../components/Toast'

import loadImg from '../static/load.png'

import vote from '../utils/vote'
import page from '../utils/page'

import '../styles/detail.styl'

class Detail extends Component {
  state = {
    showToast: false,
    info: {}
  }
  componentDidMount() {
    const id = this.props.match.params.id
    vote.getProjectDetail(id).then(res => {
      this.setState({
        info: res
      })
    }).catch((reason) => {
      if(reason === '404') {
        this.props.history.replace('/404')
      } else {
        page.showAlert("网络错误")
      }
    })
  }

  render () {
    return (
      <>
        <div className="wrapper-detail">
          <Nav blur={this.state.showToast ? 'blur' : ''}></Nav>
          <div className="content-mobile">
            <div className={`blur-wrap ${this.state.showToast ? 'blur' : ''}`}>
              <div className="picture">
                <LazyLoad src={this.state.info.imgSrc} loadingSrc={loadImg} alt={this.state.info.name}></LazyLoad>
              </div>
              <div className="text">
                <div className="title">{this.state.info.name}</div>
                <div className="about">
                  <div className="item vote">
                    <span className="iconfont icon-toupiao"></span>
                    <span className="value vote-num">{this.state.info.voteNumber}</span>
                  </div>
                  <div className="item leader">
                    <span className="iconfont icon-yonghu"></span>
                    <span className="value">{this.state.info.leader}</span>
                  </div>
                  <div className="item teacher">
                    <span className="iconfont icon-12"></span>
                    <span className="value">{this.state.info.teacher}</span>
                  </div>
                  <div className="item team">
                    <span className="iconfont icon-chengyuan"></span>
                    <span className="value">{this.state.info.member}</span>
                  </div>
                  {/* <div className="item view">
                    <span className="iconfont icon-liulan"></span>
                    <span className="value view-num">{this.state.info.view}</span>
                  </div> */}
                </div>
                <div className="intro">{this.state.info.intro} </div>
              </div>
            </div>
            <div className={`vote-now ${this.state.showToast ? 'blur' : ''}`} onClick={this.vote}>
              <span className="iconfont icon-toupiao"></span>
            </div>
          </div>
          <div className="content-pc">
            <div className={`blur-wrap ${this.state.showToast ? 'blur' : ''}`}>
              <div className="top">
                <div className="picture">
                  <LazyLoad src={this.state.info.imgSrc} loadingSrc={loadImg} alt={this.state.info.name}></LazyLoad>
                  <div className="title">
                    <span className="title-content">
                      {this.state.info.name}
                    </span>
                  </div>
                </div>
                <div className="right">
                  <div className="about">
                    <div className="info">
                      <span className="name ">得票</span>
                      <span className="iconfont icon-toupiao"></span>
                      <span className="value">{this.state.info.voteNumber}</span>
                    </div>
                    <div className="info">
                      <span className="name ">浏览</span>
                      <span className="iconfont icon-liulan"></span>
                      <span className="value">{this.state.info.view}</span>
                    </div>
                    <div className="info">
                      <span className="name ">负责人</span>
                      <span className="iconfont icon-12"></span>
                      <span className="value">{this.state.info.leader}</span>
                    </div>
                    <div className="info">
                      <span className="name ">指导教师</span>
                      <span className="iconfont icon-yonghu"></span>
                      <span className="value">{this.state.info.teacher}</span>
                    </div>
                    <div className="info">
                      <span className="name ">成员</span>
                      <span className="iconfont icon-chengyuan"></span>
                      <span className="value">{this.state.info.member}</span>
                    </div>
                  </div>
                  <button className="vote-now" onClick={this.vote} >立即投票</button>
                </div>
              </div>
              <div className="intro-title">项目简介</div>
              <div className="intro">{this.state.info.intro}</div>
            </div>
          </div>
          {this.state.showToast ? <Toast id={this.props.match.params.id} onHide={this.hideVote} ></Toast> : ''}
        </div>
      </>
    )
  }

  vote = () => {
    vote.checkLogin().then(({state}) => {
      // if(!state) {
      //   page.showAlert("请先登录")
      //   this.props.history.push(`/login?from=/detail/${this.props.match.params.id}`)
      // } else {
      //   this.setState({
      //     showToast: true
      //   })
      // }
      this.setState({
        showToast: true
      })
    }).catch(page.showAlert)
  }

  hideVote = () => {
    this.setState({
      showToast: false
    })
  }

}

export default Detail;
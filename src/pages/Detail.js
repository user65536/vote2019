import React, { Component } from 'react';

import Nav from '../components/Nav';
import LazyLoad from '../components/LazyLoad';

import loadImg from '../static/load.png'

import '../styles/detail.styl'

class Detail extends Component {
  state = {
    info: {
      "category":1,
      "id":"DZ01",
      "img": "https://www.meansky.cn/picture/bupt2.jpg",
      "intro":"随着智慧城市建设日新月异的发展，被称为城市超级大动脉的地下综合管廊的建设也不断增多。目前，我国的城市地下综合管廊已在31个省、直辖市和自治区的167个城市中建设或投入运行。但是，单纯依靠技术人员难以实现对地下综合管廊的高效、高精度及低成本的巡检。因此，我国不断增加的地下综合管廊亟需精准高效的智能巡检设备。本文将研制智能巡检机器人，实现地下综合管廊场景的3D重建及认知，完成地下综合管廊的精准高效巡检。随着智慧城市建设日新月异的发展，被称为城市超级大动脉的地下综合管廊的建设也不断增多。目前，我国的城市地下综合管廊已在31个省、直辖市和自治区的167个城市中建设或投入运行。但是，单纯依靠技术人员难以实现对地下综合管廊的高效、高精度及低成本的巡检。因此，我国不断增加的地下综合管廊亟需精准高效的智能巡检设备。本文将研制智能巡检机器人，实现地下综合管廊场景的3D重建及认知，完成地下综合管廊的精准高效巡检。随着智慧城市建设日新月异的发展，被称为城市超级大动脉的地下综合管廊的建设也不断增多。目前，我国的城市地下综合管廊已在31个省、直辖市和自治区的167个城市中建设或投入运行。但是，单纯依靠技术人员难以实现对地下综合管廊的高效、高精度及低成本的巡检。因此，我国不断增加的地下综合管廊亟需精准高效的智能巡检设备。本文将研制智能巡检机器人，实现地下综合管廊场景的3D重建及认知，完成地下综合管廊的精准高效巡检。",
      "leader":"苑立彬",
      "member":"王翰华 刘炜伦 莫耀凯 袁华宇",
      "name":"基于多传感器融合的地下综合管廊智能巡检机",
      "school":"电子工程学院",
      "teacher":"焦继超",
      "type":"研究生创新创业项目",
      "view":3,
      "voteNumber":1
    }
  }

  render () {
    console.log(this.props)
    return (
      <>
        <div className="wrapper-detail">
          <div className=" blur-wrap">
            <Nav></Nav>
            <div className="content-mobile">
              <div className="picture">
                <LazyLoad src={this.state.info.img} loadingSrc={loadImg} alt={this.state.info.name}></LazyLoad>
              </div>
              <div className="text">
                <div className="title">{this.state.info.name}</div>
                <div className="about">
                  <div className="item vote">
                    <span className="iconfont icon-toupiao"></span>
                    <span className="value vote-num">{this.state.info.voteNumber}</span>
                  </div>
                  <div className="item view">
                    <span className="iconfont icon-liulan"></span>
                    <span className="value view-num">{this.state.info.view}</span>
                  </div>
                </div>
                <div className="intro">{this.state.info.intro} </div>
              </div>
              <div className="vote-now">
                <span className="iconfont icon-toupiao"></span>
              </div>
            </div>
            <div className="content-pc">
              <div className="top">
                <div className="picture">
                  <LazyLoad src={this.state.info.img} loadingSrc={loadImg} alt={this.state.info.name}></LazyLoad>
                  <div className="title">
                  <span className="justify">
                    {this.state.info.name}
                  </span>
                  </div>
                </div>
                <div className="right">
                  <div className="about">
                    <div className="info">
                      <span className="name"></span>
                      <span className="iconfont"></span>
                      <span className="value">{this.state.info.voteNumber}</span>
                    </div>
                    <div className="info">
                      <span className="name"></span>
                      <span className="iconfont"></span>
                      <span className="value">{this.state.info.view}</span>
                    </div>
                    <div className="info">
                      <span className="name"></span>
                      <span className="iconfont"></span>
                      <span className="value">{this.state.info.leader}</span>
                    </div>
                    <div className="info">
                      <span className="name"></span>
                      <span className="iconfont"></span>
                      <span className="value">{this.state.info.teacher}</span>
                    </div>
                    <div className="info">
                      <span className="name"></span>
                      <span className="iconfont"></span>
                      <span className="value">{this.state.info.member}</span>
                    </div>
                  </div>
                  <button className="vote-now">立即投票</button>
                </div>
              </div>
              <div className="intro-title">项目简介</div>
              <div className="intro">{this.state.info.intro}</div>
            </div>
          </div>
        </div>
      </>
    )
  }

}

export default Detail;
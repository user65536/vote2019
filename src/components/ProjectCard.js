import React, { Component } from 'react';

import LazyLoad from "./LazyLoad"

import loadingSrc from '../static/load.png'
import '../styles/ProjectCard.styl'

class ProjectCard extends Component {

  
  render () {
    let {img, name, vote, view} = this.props.info
    return (
      <div className="card">
        <div className="img-wrap">
          <div className="img">
            <LazyLoad src={img[0]} alt={name} loadingSrc={loadingSrc}></LazyLoad>
          </div>
        </div>
        <div className="project-info">
          <div className="title">{name}</div>
          <div className="number-wrap">
            <div className="number number-vote">
              <span className="iconfont icon-toupiao"></span>
              <span className="value">{vote}</span>
            </div>
            <div className="number number-view">
              <span className="iconfont icon-liulan"></span>
              <span className="value">{view}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default ProjectCard;
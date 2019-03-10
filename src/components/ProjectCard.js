import React, { Component } from 'react';

import LazyLoad from "./LazyLoad"

import loadingSrc from '../static/load.png'
import '../styles/ProjectCard.styl'

import page from '../utils/page'

class ProjectCard extends Component {

  
  render () {
    let {imgSrc, name, voteNumber, view} = this.props.info
    return (
      <div className="card">
        <div className="img-wrap">
          <div className="img">
            <LazyLoad src={imgSrc} alt={name} loadingSrc={loadingSrc}></LazyLoad>
          </div>
        </div>
        <div className="project-info">
          <div className="title">{page.getStrLength(name) > 20 ? name.slice(0, 19) + '...' : name}</div>
          <div className="number-wrap">
            <div className="number number-vote">
              <span className="iconfont icon-toupiao"></span>
              <span className="value">{voteNumber}</span>
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
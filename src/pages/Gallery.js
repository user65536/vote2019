import React, { Component } from 'react';

import ProjectCard from '../components/ProjectCard'
import Nav from '../components/Nav'

import '../styles/gallery.styl'
import vote from '../utils/vote';
import page from '../utils/page'

class Gallery extends Component {

 state = {
   projects: []
 }

 componentDidMount() {
   vote.getProjectList('all').then((projects) => {
    this.setState({
      projects
    })
   }).catch(page.showAlert)
 }

  render () {
    return (
      <div className="wrapper-gallery">
        <Nav 
          withBar
          onGroupChange={(id) => {console.log(id)}}
          onSearch={(value) => {console.log(value)}}
        >
          <>
            {/* <div className="group">
              <span className="group-name">全部分组</span>
              <span className="iconfont icon-optio3"></span>
            </div> */}
          </>
        </Nav>
        <div className="content">
          {
            this.state.projects.map((ele, index) => {
              return (
                <div key={ele.id + ele.name} className="card-wrap" onClick={() => {this.navigateToDetail(ele.id)}} >
                  <ProjectCard info={ele}></ProjectCard>
                </div>
              )
            })
          }
        </div>
        {/* <div className="footer">
          <span className="line-left">---------------------</span>
          <span className="bottom">见底了</span>
          <span className="line-right">---------------------</span>
        </div> */}
      </div>
    )
  }
  navigateToDetail(id) {
    this.props.history.push(`/detail/${id}`)
  }
}

export default Gallery;
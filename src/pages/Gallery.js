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
   vote.getProjectList('0').then((projects) => {
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
          onGroupChange={this.changeGroup}
          onSearch={this.search}
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
  changeGroup = id => {
    this.setState({
      projects: []
    })
    vote.getProjectList(id).then((projects) => {
      this.setState({
        projects
      })
    }).catch(page.showAlert)
  }
  search = word => {
    console.log(word)
    this.setState({
      projects: []
    })
    if(word.trim()) {
      vote.search(word).then(list => {
        if(list.length === 0) {
          page.showAlert("无结果")
        } else {
          this.setState({
            projects: list
          })
        }
      }).catch((warn) => {
        page.showAlert(warn)
      })
    } else {
      this.changeGroup('0')
    }
  }
}

export default Gallery;
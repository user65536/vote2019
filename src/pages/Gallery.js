import React, { Component } from 'react';

import ProjectCard from '../components/ProjectCard'
import Nav from '../components/Nav'

import '../styles/gallery.styl'
import vote from '../utils/vote';
import page from '../utils/page'
import storage from '../utils/storage'

class Gallery extends Component {

 state = {
   projects: [],
   searchValue: '',
   group: '0'
 }

 componentDidMount() {
  let previousList = storage.getProjectList();
  if(previousList) {
    this.setState({
      projects: previousList.list
    })
  } else {
    this.listRefreshProxy.changeGroup('0').then(projects => {
      this.setState({
        projects,
        searchValue: '',
        group: '0'
      })
    }).catch(page.showAlert)
  }
 }

  render () {
    return (
      <div className="wrapper-gallery">
        <Nav 
          withBar
          onGroupChange={this.changeGroup}
          onSearch={this.search}
          searchValue={this.state.searchValue}
          group={this.state.group}
        >
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
  listRefreshProxy = {
    changeGroup (id) {
      return new Promise((resolve, reject) => {
        vote.getProjectList(id).then((projects) => {
          storage.setProjectList({
            list: projects,
            group: id,
            searchValue: ''
          })
          resolve(projects)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    search (word) {
      return new Promise((resolve, reject) => {
        if(word.trim()) {
          vote.search(word).then(list => {
            if(list.length === 0) {
              reject("无结果")
            } else {
              storage.setProjectList({
                list,
                searchValue: word,
                group: '0'
              })
              resolve(list)
            }
          }).catch((warn) => {
            reject(warn)
          })
        } else {
          
        }
      })
    }
  }
  navigateToDetail(id) {
    this.props.history.push(`/detail/${id}`)
  }
  changeGroup = id => {
    this.setState({
      projects: []
    })
    // vote.getProjectList(id).then((projects) => {
    //   this.setState({
    //     projects
    //   })
    // }).catch(page.showAlert)
    this.listRefreshProxy.changeGroup(id).then(projects => {
      this.setState({
        projects
      })
    }).catch(() => {

    })
  }
  search = word => {
    // console.log(word)
    this.setState({
      projects: []
    })
    // if(word.trim()) {
    //   vote.search(word).then(list => {
    //     if(list.length === 0) {
    //       page.showAlert("无结果")
    //     } else {
    //       this.setState({
    //         projects: list
    //       })
    //     }
    //   }).catch((warn) => {
    //     page.showAlert(warn)
    //   })
    // } else {
    //   this.changeGroup('0')
    // }
    this.listRefreshProxy.search(word).then(projects => {
      this.setState({
        projects
      })
    }).catch(page.showAlert)
  }
}

export default Gallery;
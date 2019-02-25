import React, { Component } from 'react';

import ProjectCard from '../components/ProjectCard'
import Nav from '../components/Nav'

import '../styles/gallery.styl'

class Gallery extends Component {

  state = {
    projects: [{
        "id": "1",
        "name": "基于视频流的运动物体检测与追踪基于视频流的",
        "img": [
          "http://img4.imgtn.bdimg.com/it/u=3888742839,2332987673&fm=26&gp=0.jpg",
          "2313"
        ],
        "vote": 1000,
        "view": 900
      },
      {
        "id": "2",
        "name": "基于视频流的运动物",
        "img": [
          "http://img0.imgtn.bdimg.com/it/u=1664316807,3401349985&fm=26&gp=0.jpg",
          "213123"
        ],
        "vote": 10,
        "view": 900
      },
      {
        "id": "3",
        "name": "基于视频流的运动物",
        "img": [
          "http://img0.imgtn.bdimg.com/it/u=1664316807,3401349985&fm=26&gp=0.jpg",
          "213123"
        ],
        "vote": 10,
        "view": 900
      },
      {
        "id": "3",
        "name": "基于视频流的运动物",
        "img": [
          "http://img0.imgtn.bdimg.com/it/u=1664316807,3401349985&fm=26&gp=0.jpg",
          "213123"
        ],
        "vote": 10,
        "view": 900
      },
      {
        "id": "3",
        "name": "基于视频流的运动物",
        "img": [
          "http://img0.imgtn.bdimg.com/it/u=1664316807,3401349985&fm=26&gp=0.jpg",
          "213123"
        ],
        "vote": 10,
        "view": 900
      },{
        "id": "3",
        "name": "基于视频流的运动物",
        "img": [
          "http://img0.imgtn.bdimg.com/it/u=1664316807,3401349985&fm=26&gp=0.jpg",
          "213123"
        ],
        "vote": 10,
        "view": 900
      },
      {
        "id": "3",
        "name": "基于视频流的运动物",
        "img": [
          "http://img0.imgtn.bdimg.com/it/u=1664316807,3401349985&fm=26&gp=0.jpg",
          "213123"
        ],
        "vote": 10,
        "view": 900
      }
    ]
  }

  render () {
    return (
      <div className="wrapper-gallery">
        <Nav>
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
                <div key={ele.id} className="card-wrap">
                  <ProjectCard info={ele}></ProjectCard>
                </div>
              )
            })
          }
        </div>
        
      </div>
    )
  }

}

export default Gallery;
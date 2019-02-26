import React, { Component } from 'react';

import ProjectCard from '../components/ProjectCard'
import Nav from '../components/Nav'

import '../styles/gallery.styl'

class Gallery extends Component {

  state = {
    projects: [{
        "id": "1",
        "name": "基于视频流的运动物体检测与追踪基于视频流",
        "img": [
          "https://www.meansky.cn/picture/bupt1.jpg",
          "2313"
        ],
        "vote": 1000,
        "view": 900
      },
      {
        "id": "2",
        "name": "基于视频流的运动物",
        "img": [
          "https://www.meansky.cn/picture/bupt2.jpg",
          "213123"
        ],
        "vote": 10,
        "view": 900
      },
      {
        "id": "3",
        "name": "基于视频流的运动物",
        "img": [
          "https://www.meansky.cn/picture/bupt3.jpg",
          "213123"
        ],
        "vote": 10,
        "view": 900
      },
      {
        "id": "4",
        "name": "基于视频流的运动物",
        "img": [
          "https://www.meansky.cn/picture/bupt4.jpg",
          "213123"
        ],
        "vote": 10,
        "view": 900
      },
      {
        "id": "5",
        "name": "基于视频流的运动物",
        "img": [
          "https://www.meansky.cn/picture/bupt5.jpg",
          "213123"
        ],
        "vote": 10,
        "view": 900
      },{
        "id": "6",
        "name": "基于视频流的运动物",
        "img": [
          "https://www.meansky.cn/picture/bupt1.jpg",
          "213123"
        ],
        "vote": 10,
        "view": 900
      },
      {
        "id": "7",
        "name": "基于视频流的运动物",
        "img": [
          "https://www.meansky.cn/picture/bupt2.jpg",
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
        <div className="footer">
          <span className="line-left">---------------------</span>
          <span className="bottom">见底了</span>
          <span className="line-right">---------------------</span>
        </div>
      </div>
    )
  }

}

export default Gallery;
/**
 * @version 1.0.0
 * @author trage
 * @description 图片预加载效果 组件返回一个宽高100%的img标签
 * @param src 图片地址
 * @param alt 图片描述
 * @param loadingSrc 加载时显示的图片地址
 */

import React, { Component } from 'react';

class LazyLoad extends Component {
  state = {
    load: false,
  }
  componentDidMount () {
    let img = new Image();
    if(this.props.src) {
      img.src = this.props.src;
      img.onload = () => {
        this.setState({
          load: true
        })
      }
    }
  }
  shouldComponentUpdate (nextProps, nextState) {
    let propsChange = JSON.stringify(this.props) !== JSON.stringify(nextProps)
    let img = new Image();
    if(nextProps.src && propsChange) {
      img.src = nextProps.src;
      img.onload = () => {
        this.setState({
          load: true
        })
      }
    }
    return true
  }
  render () {
    let {src, alt} = this.props;
    return (
      <>
        {
          this.state.load ? 
          <img style={{height: "100%", width: "100%"}} alt={alt} src={src} ></img> : 
          <img style={{height: "100%", width: "100%"}} alt="加载中" src={this.props.loadingSrc}></img> 
        }
      </>
    )
  }
  
}
export default LazyLoad;


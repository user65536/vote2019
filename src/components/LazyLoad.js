import React, { Component } from 'react';

class LazyLoad extends Component {
  state = {
    load: false,
  }
  componentDidMount () {
    let img = new Image();
    img.src = this.props.src;
    img.onload = () => {
      this.setState({
        load: true
      })
    }
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


import React, { Component } from 'react';

import Toast from '../components/Toast'

class Temp extends Component {

  render () {
    return (
      <>
        <Toast onFinish={() => {console.log("submit")}}></Toast>
      </>
    )
  }

}

export default Temp;
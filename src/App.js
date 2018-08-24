import React, { Component } from 'react';
import MainContainer from  './container/mainContainer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }
  render(){
    return(
  <MainContainer/>
    )
  }
}

export default App;

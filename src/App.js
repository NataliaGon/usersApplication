import React, { Component } from 'react';

import './App.css';


import MainContainer from  './mainContainer';

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

import React, { Component } from "react";
import {usersParamHeader} from'../variable.js';
import makeid from "../service/makeID.js";

class HeaderTab extends Component{

 
  makeListFromData=(usersParamHeader)=>{
    return usersParamHeader.map(each => {
    const idForHeader=makeid();
      return (
        <li key={idForHeader} className="user-info">{each}</li>
      );
    });
  }
  render() {
    const listForHeader=this.makeListFromData(usersParamHeader);
  return (
  
    <header id="header" className="bg-info">
      <ul>
        {listForHeader}
      </ul>
    </header>
  );
} 
}

export default HeaderTab;

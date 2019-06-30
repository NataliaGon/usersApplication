import React, { Component } from "react";
import {usersParamHeader} from'../variable.js';
import makeid from "../service/makeID.js";

function HeaderTab(){

 
  const makeListFromData=(usersParamHeader)=>{
    return usersParamHeader.map(each => {
    const idForHeader=makeid();
      return (
        <li key={idForHeader} className="user-info">{each}</li>
      );
    });
  }

   
  return (

    <header id="header" className="bg-info">
      <ul>
        {makeListFromData(usersParamHeader)}
      </ul>
    </header>
  );
} 


export default HeaderTab;

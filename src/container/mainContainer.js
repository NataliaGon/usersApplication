import React, { useState, useEffect  } from "react";
import HeaderTab from "../component/headerTab.js";
import Form from "./form.js";
import User from "./user.js";
import makeid from "../service/makeID.js";
import { firebaseDatabaseUsersRef } from "../configs/firebase.js";
import * as firebase from "firebase";

function MainContainer () {
 
  const [users, setUsers] = useState([]);

  useEffect(() =>{
  const itemsRef = firebase.database().ref("users");
   itemsRef.on("value", snapshot => {
      let dataFromFirebase = snapshot.val();
      dataFromFirebase = objectToArray(dataFromFirebase);
      setUsers(dataFromFirebase);
    });
  });
const  objectToArray = object =>{
    let array = [];
    for (let key in object) {
      object[key].hash = key;
      array.push(object[key]);
    }
    return array;
  }
  const addUser = user => {
    user.ident = makeid();
    firebaseDatabaseUsersRef.push(user);
  };
  const deleteUser =user =>{

    const userIndex = users.indexOf(user);
    users.splice(userIndex, 1);
    firebaseDatabaseUsersRef.child(user.hash).remove();
  }
  const getUser=()=> {
    return users.map(user => {
      return (
        <User
          key={user.ident}
          deleteUser={deleteUser}
          user={user}
          saveUserAfterChange={saveUserAfterChange}
        />
      );
    });
  }
 
  const  saveUserAfterChange=(user, hash)=> {
    user.ident = makeid();
    firebaseDatabaseUsersRef.child(hash).update(user);
  }
  

    return (
      <React.Fragment>
        <HeaderTab />
        {getUser()}
        <Form addUser={addUser} />
      </React.Fragment>
    );
  }


export default MainContainer;

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
  const _addUser = user => {
    user.ident = makeid();
    firebaseDatabaseUsersRef.push(user);
  };
  const _deleteUser =(user) =>{
    const userIndex = users.indexOf(user);
    users.splice(userIndex, 1);
    firebaseDatabaseUsersRef.child(user.hash).remove();
    setUsers(users);
  }
  const _getUser=()=> {
    return users.map(user => {
      return (
        <User
          key={user.ident}
          deleteUser={_deleteUser}
          user={user}
          saveUserAfterChange={_saveUserAfterChange}
        />
      );
    });
  }
 
  const  _saveUserAfterChange=(user, hash)=> {
    user.ident = makeid();
    firebaseDatabaseUsersRef.child(hash).update(user);
    
    for (let user of users) {
      if (user.ident === user.id) {
        let indexUserToChange = users.indexOf(user);
        users.splice(indexUserToChange, 1, user);
        setUsers( users );
      }
    }
  }
  

    return (
      <React.Fragment>
        <HeaderTab />
        {_getUser()}
        <Form addUser={_addUser} />
      </React.Fragment>
    );
  }


export default MainContainer;

import React, { Component } from "react";
import HeaderTab from "../component/headerTab.js";
import Form from "./form.js";
import User from "./user.js";
import makeid from "../service/makeID.js";
import { firebaseDatabaseUsersRef } from "../configs/firebase.js";
import * as firebase from "firebase";

class MainContainer extends Component {
  state = {
    users: []
  };
  componentWillMount() {
    this.itemsRef = firebase.database().ref("users");
    this.itemsRef.on("value", snapshot => {
      let dataFromFirebase = snapshot.val();
      dataFromFirebase = this.objectToArray(dataFromFirebase);
      this.setState({ users: dataFromFirebase });
    });
  }
  objectToArray(object) {
    let array = [];
    for (let key in object) {
      object[key].hash = key;
      array.push(object[key]);
    }
    return array;
  }
  _addUser = user => {
    user.ident = makeid();
    firebaseDatabaseUsersRef.push(user);
  };
  _getUser() {
    return this.state.users.map(user => {
      return (
        <User
          key={user.ident}
          deleteUser={this._deleteUser.bind(this)}
          user={user}
          saveUserAfterChange={this._saveUserAfterChange.bind(this)}
        />
      );
    });
  }
  _deleteUser(user) {
    const users = [...this.state.users];
    const userIndex = users.indexOf(user);
    users.splice(userIndex, 1);
    firebaseDatabaseUsersRef.child(user.hash).remove();
    this.setState({ users });
  }
  _saveUserAfterChange(user, hash) {
    user.ident = makeid();
    firebaseDatabaseUsersRef.child(hash).update(user);
    const users = [...this.state.users];
    for (let user of users) {
      if (user.ident === user.id) {
        let indexUserToChange = this.state.users.indexOf(user);
        users.splice(indexUserToChange, 1, user);
        this.setState({ users });
      }
    }
  }
  render() {
    let usersToShow = this._getUser();
    return (
      <React.Fragment>
        <HeaderTab />
        {usersToShow}
        <Form addUser={this._addUser} />
      </React.Fragment>
    );
  }
}

export default MainContainer;

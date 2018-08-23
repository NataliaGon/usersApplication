import React, {Component} from "react";
import HeaderTab from "./headerTab.js";
import Form from "./form.js";
import User from "./user.js";
import {firebaseDatabaseUsersRef} from "./firebase.js";
import * as firebase from "firebase";

class MainContainer extends Component{
  state = {
    users: [],
    items: []
  };
  componentWillMount(){
    this.itemsRef = firebase.database().ref("users");
    this.itemsRef.on("value", snapshot => {
      let dataFromFirebase = snapshot.val();
      dataFromFirebase = this.objectToArray(dataFromFirebase);
      this.setState({ users: dataFromFirebase });
    });
  }
  render() {
    let usersToShow = this._getUser();
    return (
      <div>
        <HeaderTab />
        {usersToShow}
        <Form addUser={this._addUser} openModal={this.state.openModal} />
      </div>
    );
  }

  objectToArray(object) {
    let array = [];
    for (let key in object) {
      object[key].hash = key;
      array.push(object[key]);
    }
    return array;
  }
  makeid() {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  _addUser = (name, phone, address, gender, age) => {
    let user = {
      ident: this.makeid(),
      name,
      phone,
      address,
      gender,
      age
    };
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
    user.ident = this.makeid();
    firebaseDatabaseUsersRef.child(hash).update(user);
    const users = [...this.state.users];
    for (let user of users) {
      if (user.ident == user.id) {
        let indexUserToChange = this.state.users.indexOf(user);
        users.splice(indexUserToChange, 1, user);
        this.setState({ users });
      }
    }
  }
}

export default MainContainer; 

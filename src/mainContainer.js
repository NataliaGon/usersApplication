import React from "react";

import HeaderTab from "./headerTab.js";
import Form from "./form.js";
import User from "./user.js";
import * as firebase from "firebase";
// import { firebase,database, auth, googleAuthProvider, storage } from './firebase';



export default class MainContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
      items:[]
    };
  
   
  }
  
  // componentWillMount() {
  //   this.firebaseRef = new Firebase("https://user-226b9.firebaseio.com//items/");
  //   this.firebaseRef.on("child_added", function(dataSnapshot) {
  //     this.items.push(dataSnapshot.val());
  //     this.setState({
  //       items: this.items
  //     });
  //   }.bind(this));
  //   console.log(this.State.items);
  // }
  render() {
    let usersToShow = this._getUser();
    // let id;
    return (
      <div>
        <HeaderTab />
        {usersToShow}

        <Form
          addUser={this._addUser.bind(this)}
          openModal={this.state.openModal}
        />
      </div>
    );
  }


  
  makeid() {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  _addUser(name, phone, address,gender,age, photo, file) {
    let user = {
      ident: this.makeid(),
      name,
      phone,
      address,
      gender,
      age,
      photo,
      file
    };
    console.log(user);
    firebase.database.ref('user/' + user.ident).set(user);
    
    
    // this.setState({ users: this.state.users.concat([user])});
  }

  _getUser() {
    return this.state.users.map(user => {
      return (
        <User
          key={user.ident}
          deleteUser={this._deleteUser.bind(this)}
          user={user}
          //   editBtnText={this.state.btnEditText}
          saveUserAfterChange={this._saveUserAfterChange.bind(this)}
        />
      );
    });
  }
  _deleteUser(user) {
    const users = [...this.state.users];
    const userIndex = users.indexOf(user);
    users.splice(userIndex, 1);
    this.setState({ users });
  }
  _saveUserAfterChange(name, phone, address, gender,age,photo, id) {
    let newChangedUser = {
      ident: this.makeid(),
      name,
      phone,
      address,
      gender,
      age,
      photo
      
    };

    const users = [...this.state.users];
    for (let user of users) {
      if (user.ident == id) {
        let indexUserToChange = this.state.users.indexOf(user);

        //    user=newChangedUser;
        users.splice(indexUserToChange, 1, newChangedUser);
        this.setState({ users });
      }
    }
  }
}

import React, { Component } from "react";
import FormForUserChange from "./toChangeUserForm";

class User extends Component {
  constructor() {
    super();
    this.state = {
      openModal: false,
      userToChange: {},
      editBtnText: "edit",
      userOur: {}
    };
  }
  componentWillMount = () => {
    this.setState({ userOur: this.props.user });
  };
  _handleDelete = event => {
    console.log(this.props.user)
    event.preventDefault();
    this.props.deleteUser(this.props.user);
  };
  _userEdit = event => {
    event.preventDefault();
    this.setState({ userToChange: this.props.user });
    this.setState({ openModal: !this.state.openModal });
    this._changeEditBtnText();
  };
  _changeEditBtnText = () => {
    if (this.state.openModal) {
      this.setState({ editBtnText: "edit" });
    } else {
      this.setState({ editBtnText: "cansel" });
    }
  };
  _saveChangedUser = (user, hash) => {
    this.setState({ openModal: !this.state.openModal });
    this.props.saveUserAfterChange(user, hash);
  };
  render() {
    return (
      <div className="user">
        <div className="user-name user-info">{this.props.user.name}</div>
        <div className="user-age user-info">{this.props.user.age}</div>
        <div className="user-phone user-info">{this.props.user.phone}</div>
        <div className="user-address user-info">{this.props.user.address}</div>
        <div className="user-gender user-info">{this.props.user.gender}</div>
        <div className="user-marige user-info">{this.props.user.marige}</div>
        <div className="buttons">
          <button
            className="btn btn-danger"
            onClick={this._handleDelete}
          >
            delete
          </button>
          <button
            className="btn btn-primary btn-edit"
            onClick={this._userEdit.bind(this)}
          >
            {this.state.editBtnText}
          </button>
        </div>
        <FormForUserChange
          userToChange={this.state.userOur}
          openModal={this.state.openModal}
          saveChangedUser={this._saveChangedUser.bind(this)}
        />
      </div>
    );
  }
}

export default User;

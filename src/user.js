import React from "react";
import FormForUserChange from "./toChangeUserForm";

export default class User extends React.Component {
  constructor() {
    super();
    this.state = {
      openModal: false,
      userToChange: {},
      editBtnText: "edit",
      userOur:{}
    };
  }
componentWillMount(){
    this.setState({userOur:this.props.user })
}

  _handleDelete(event) {
    event.preventDefault();
    this.props.deleteUser(this.props.user);
  }
  _userEdit(event) {
    event.preventDefault();
    this.setState({ userToChange: this.props.user });
    this.setState({ openModal: !this.state.openModal });
    this._changeEditBtnText();
  }
  _changeEditBtnText() {
    if (this.state.openModal) {
      this.setState({ editBtnText: "edit" });
    } else {
      this.setState({ editBtnText: "cansel" });
    }
  }
  _saveChangedUser(user, hash) {
    this.setState({ openModal: !this.state.openModal });
    this.props.saveUserAfterChange(user, hash);
  }

  render() {
    return (
      <div className="user">
        <div className="user-name">{this.props.user.name}</div>
        <div className="user-age">{this.props.user.age}</div>
        <div className="user-gender">{this.props.user.gender}</div>
        <div className="user-phone">{this.props.user.phone}</div>
        <div className="user-address">{this.props.user.address}</div>

        <div className="buttons">
          <button
            className="btn btn-danger"
            onClick={this._handleDelete.bind(this)}
          >
            {" "}
            delete
          </button>
          <button
            className=" btn btn-primary btn-edit"
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

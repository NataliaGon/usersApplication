import React, { Component } from "react";
import myPhone from "../service/checkPhone.js";
import makeid from "../service/makeID.js";

class Form extends Component {
  state = {
    displayModal: false,
    gender: "male",
    display: "none"
  };

  _showModal = () => {
    this.setState({ displayModal: !this.state.displayModal });
  };
  _handleChange = event => {
    this.setState({ gender: event.target.value });
  };
  _handleSubmit = event => {
    event.preventDefault();
    if (
      this._name.value &&
      myPhone(this._phone.value) &&
      this._address.value &&
      this._age.value
    ) {
      const user = {
        name: this._name.value,
        age: this._age.value,
        gender: this.state.gender,
        phone: this._phone.value,
        address: this._address.value,
        id: makeid()
      }
      this.props.addUser(user);

      this.setState({ displayModal: !this.state.displayModal });
    }else{
      this.setState({display: 'block'})
    };
  };
  render() {
    let form;
    let btnText;
    let disabled;
    let usertoChangeName;
    const styles = {
      display: this.state.display
    };
    if (this.state.displayModal) {
      form = (
        <div className="shadow p-3 mb-5 bg-white rounded" id="form">
          <form
            className="form-control-file. form-container"
            onSubmit={this._handleSubmit.bind(this)}
          >
            <input
              className="form-control"
              type="text"
              placeholder="name"
              ref={input => (this._name = input)}
            >
              {usertoChangeName}
            </input>
            <input
              className="form-control"
              type="text"
              placeholder="age"
              ref={input => (this._age = input)}
            />
            <select
              className="form-control"
              defaultValue="male"
              onChange={this._handleChange.bind(this)}
            >
              <option value="male">male</option>
              <option value="femal">femal</option>
            </select>
            <input
              className="form-control"
              type="tel"
              placeholder="phone"
              ref={input => (this._phone = input)}
            />
            <input
              className="form-control"
              type="text"
              placeholder="address"
              ref={input => (this._address = input)}
            />
            <button className="btn btn-primary" type="submit">
              Send info
            </button>
          </form>
          <span id="form-fill-error" style={styles}>
            please fill out all fields correct
          </span>
         
        </div>
      );
      btnText = "cansel";
    } else {
      form = null;
      btnText = "addUser";
    }
    return (
      <div>
        <button
          className="btn btn-primary"
          id="add-user-btn"
          disabled={disabled}
          onClick={this._showModal.bind(this)}
        >
          {btnText}
        </button>
        {form}
      </div>
    );
  } // to make btn not clicable when toChangeUserForm is open
}

export default Form;

//don't use ref
//check age
//onblur check

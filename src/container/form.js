import React, { Component } from "react";
import myPhone from "../service/checkPhone.js";
import makeid from "../service/makeID.js";
import { usersParamHeader } from "../variable.js";

class Form extends Component {
  state = {
    displayModal: false,
    display: "none"
  };

  _makeListFormData = usersParam => {
    return usersParam.map(each => {
      const idForInput = makeid();
      return (
        <input
          key={idForInput}
          className="form-control"
          type="text"
          placeholder={each}
          ref={input => (this[each] = input)}
        />
      );
    });
  };
  _makeSelectFormData = usersParamSelect => {
    return usersParamSelect.map(each => {
      const idForSelect = makeid();
      const optionsForSelect = each.map(i => {
        const idForOption = makeid();
        return <option key={idForOption}>{i}</option>;
      });

      return (
        <select
          key={idForSelect}
          className="form-control"
          onChange={this._handleChange.bind(this)}
        >
          {optionsForSelect}
        </select>
      );
    });
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
      this.name.value &&
      myPhone(this.phone.value) &&
      this.address.value &&
      this.age.value
    ) {
      const user = {
        name: this.name.value,
        age: this.age.value,
        phone: this.phone.value,
        address: this.address.value,
        gender: this.gender.value,
        id: makeid()
      };
      this.props.addUser(user);
      this.setState({ displayModal: !this.state.displayModal });
    } else {
      this.setState({ display: "block" });
    }
  };
  render() {
    let form;
    let btnText;
    let disabled;

    const styles = {
      display: this.state.display
    };
    const inputsInForm = this._makeListFormData(usersParamHeader);
 
    if (this.state.displayModal) {
      form = (
        <div className="shadow p-3 mb-5 bg-white rounded" id="form">
          <form
            className="form-control-file. form-container"
            onSubmit={this._handleSubmit.bind(this)}
          >
            {inputsInForm}
         
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

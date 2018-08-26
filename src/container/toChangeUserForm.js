import React, { Component } from "react";
import myPhone from "../service/checkPhone.js";
import {usersParamInput} from'../variable.js';
import makeid from "../service/makeID.js";
import {usersParamSelect}from'../variable.js';

class FormForUserChange extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      age: "",
      gender: "",
      phone: "",
      address: "",
      display: "none"
    };
  }
  
  componentWillMount = () => {
    this.setState({ name: this.props.userToChange.name });
    this.setState({ age: this.props.userToChange.age });
    this.setState({ gender: this.props.userToChange.gender });
    this.setState({ phone: this.props.userToChange.phone });
    this.setState({ address: this.props.userToChange.address });
  };

  _makeListFormData=(usersParam)=>{
    return usersParam.map(each => {
      const idForInputToChange=makeid();
      return (
        <input
              key={idForInputToChange}
              className="form-control"
              type="text"
              defaultValue={this.state[each]}
              placeholder={each}
              ref={input => (this[each] = input)}
            />
      );
    });
  }
  _makeSelectFormData=(usersParamSelect)=>{
    return usersParamSelect.map(each => {
      const idForSelect=makeid();

     const optionsForSelect= each.map(i =>{
        const idForOption=makeid();
        return (
          <option 
          key ={idForOption}
          >{i}</option>
        );
      });
      
      return (
        <select
        key={idForSelect}
        className="form-control"
        defaultValue={this.state.gender}
        onChange={this._handleChange.bind(this)}
      >
        {optionsForSelect}
      </select>
      );
    });
  }
  _handleChange = event => {
    this.setState({ gender: event.target.value });
  };
  _handleSubmit = event => {
    event.preventDefault();
    if (
      this.name.value &&
      this.address.value &&
      this.phone.value &&
      this.age.value &&
      myPhone(this.phone.value)
    ) {
      const changedUser = {
        name: this.name.value,
        age: this.age.value,
        phone: this.phone.value,
        address: this.address.value,
        id: this.props.userToChange.ident,
        gender: this.state.gender
      };
      this.props.saveChangedUser(changedUser, this.props.userToChange.hash);
    } else {
      this.setState({ display: "block" });
    }
  };

  render() {
    let form;
    let btnText;
    const styles = {
      display: this.state.display
    };
    const inputsInForm=this._makeListFormData(usersParamInput);
    const selectInForm=this. _makeSelectFormData(usersParamSelect);
    if (this.props.openModal) {
      form = (
        <div className="shadow p-3 mb-5 bg-white rounded" id="form">
          <form
            className="form-control-file. form-container"
            onSubmit={this._handleSubmit.bind(this)}
          >
            {inputsInForm}
            {selectInForm}
            <button className="btn btn-primary" type="submit">
              Save changes
            </button>
          </form>
          <span id="form-fill-error" style={styles}>
            please fill out all fields correct
          </span>
        </div>
      );
    } else {
      form = "";
    }
    return (
      <div>
        <button
          className="btn btn-primary"
          id="add-user-btn"
          disabled="disabled"
        >
          {btnText}
        </button>
        {form}
      </div>
    );
  }
}

export default FormForUserChange;

//don't use ref
//check age
//on blur check

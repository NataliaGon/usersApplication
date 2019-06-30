import React, { Component } from "react";
import myPhone from "../service/checkPhone.js";
import { usersParamInput } from "../variable.js";
import makeid from "../service/makeID.js";
import { usersParamSelect } from "../variable.js";

class FormForUserChange extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      age: "",
      gender: "",
      marige:"",
      phone: "",
      address: "",
      display: "none"
    };
  }

  componentWillMount = () => {
    this.setState({ name: this.props.userToChange.name });
    this.setState({ age: this.props.userToChange.age });
    this.setState({ gender: this.props.userToChange.gender });
    this.setState({ marige: this.props.userToChange.marige });
    this.setState({ phone: this.props.userToChange.phone });
    this.setState({ address: this.props.userToChange.address });
  };

  _makeListFormData = usersParam => {
    return usersParam.map(each => {

      return (
        <input
          className="form-control"
          type="text"
          name={each}
          defaultValue={this.state[each]}
          placeholder={each}
          onChange={this._handleChange}
        />
      );
    });
  };
  _makeSelectFormData = usersParamSelect => {
    return usersParamSelect.map(each => {
     
      const optionsForSelect = each.options.map(option => {
      
        return <option >{option}</option>;
      });

      return (
        <select
          name={each.name}
          className="form-control"
          value={this.state[each.name]}
          onChange={this._handleChange}
        >
          <option>choose {each.name}</option>
          {optionsForSelect}
        </select>
      );
    });
  };
  _handleChange = event => {
    const target = event.target;
    const name = target.getAttribute("name");
    let state = this.state;
    state[name] = target.value;
    this.setState(state);
  };
  _handleSubmit = event => {
    event.preventDefault();
    if (
      this.state.name &&
      myPhone(this.state.phone) &&
      this.state.address &&
      this.state.age &&
      this.state.gender &&
      this.state.marige
    ) {
      const changedUser = {
        name: this.state.name,
        age: this.state.age,
        phone: this.state.phone,
        address: this.state.address,
        gender: this.state.gender,
        marige: this.state.marige,
        id: this.props.userToChange.ident
      };
      this.props.saveChangedUser(changedUser, this.props.userToChange.hash);
      this.setState({ display: "none" });
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
    const inputsInForm = this._makeListFormData(usersParamInput);
    const selectInForm = this._makeSelectFormData(usersParamSelect);
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


//check age
//on blur check

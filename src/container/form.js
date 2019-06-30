import React, { Component } from "react";
import myPhone from "../service/checkPhone.js";
import makeid from "../service/makeID.js";
import { usersParamInput } from "../variable.js";
import { usersParamSelect } from "../variable.js";

class Form extends Component {
  state = {
    displayModal: false,
    display: "none"
  };
  
  handleChange = event => {
    console.log('1')
    const name = event.target.getAttribute("name");
    let state = this.state;
    state[name] = event.target.value;
    this.setState(state);
  };
  handleSubmit = event => {
    event.preventDefault();

    if (
      this.state.name &&
      myPhone(this.state.phone) &&
      this.state.address &&
      this.state.age &&
      this.state.gender &&
      this.state.marige
    ) {
      const user = {
        name: this.state.name,
        age: this.state.age,
        phone: this.state.phone,
        address: this.state.address,
        gender: this.state.gender,
        marige: this.state.marige,
        id: makeid()
      };

      this.props.addUser(user);

      this.setState({ displayModal: !this.state.displayModal });
      this.setState({ display: "none" });
    } else {
      this.setState({ display: "block" });
    }
  };
  makeListFormData = () => {
    return usersParamInput.map(each => {
      return (
        <input
          className="form-control"
          name={each}
          type="text"
          value={this.state[each]}
          placeholder={each}
          onChange={this.handleChange}
        />
      );
    });
  };

  makeSelectFormData = () => {
    return usersParamSelect.map(each => {
      let optionsForSelect = each.options.map(option => {   
        return <option key={makeid()} >{option}</option>;
      });

      return (
        <select
          key={makeid()}
          name={each.name}
          className="form-control"
          value={this.state[each.name]}
          onChange={this.handleChange}
        >
          <option>choose {each.name}</option>
          {optionsForSelect}
        </select>
      );
    });
  };
  showModal = () => {
    this.setState({ displayModal: !this.state.displayModal });
  };

  render() {
    let form;
    let btnText;
    let disabled;

    const styles = {
      display: this.state.display
    };
    
 
    if (this.state.displayModal) {
      form = (
        <div className="shadow p-3 mb-5 bg-white rounded" id="form">
          <form
            className="form-control-file form-container"
            onSubmit={this.handleSubmit.bind(this)}
          >
            {this.makeListFormData()}
            {this.makeSelectFormData()}
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
      form = '';
      btnText = "addUser";
    }
    return (
      <div>
        <button
          className="btn btn-primary"
          id="add-user-btn"
          disabled={disabled}
          onClick={this.showModal.bind(this)}
        >
          {btnText}
        </button>
        {form}
      </div>
    );
  } // to make btn not clicable when toChangeUserForm is open
}

export default Form;

//check age
//onblur check

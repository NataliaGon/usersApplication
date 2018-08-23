import React from "react";

export default class FormForUserChange extends React.Component {
  constructor() {
    super();
    this.state = {
      value:'',   
    };
  }
  render() {
    let form;
    let btnText;

    if (this.props.openModal) {
      form = (
        <div className="shadow p-3 mb-5 bg-white rounded" id="form">
          <form
            className="form-control-file. form-container"
            onSubmit={this._handleSubmit.bind(this)}
          >
            <input
              className="form-control"
              type="text"
              defaultValue={this.props.userToChange.name}
              placeholder="name"
              ref={input => (this._name = input)}
            />
            <input
              className="form-control"
              type="text"
              defaultValue={this.props.userToChange.age}
              placeholder="age"
              ref={input => (this._age = input)}
            />

            <select
              className="form-control"
              defaultValue={this.props.userToChange.gender}
              onChange={this._handleChange.bind(this)}
            >
              <option value="male">male</option>
              <option value="femal">femal</option>
            </select>

            <input
              className="form-control"
              type="tel"
              defaultValue={this.props.userToChange.phone}
              placeholder="phone"
              ref={input => (this._phone = input)}
            />
            <input
              className="form-control"
              type="text"
              defaultValue={this.props.userToChange.address}
              placeholder="address"
              ref={input => (this._address = input)}
            />
            <button className="btn btn-primary" type="submit">
              Save changes
            </button>
          </form>
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
  _handleChange(event) {
    this.setState({value:event.target.value});
  }
  _handleSubmit(event) {
    event.preventDefault();
    if (
      this._name.value.length > 0 &&
      this._address.value.length > 0 &&
      this._age.value.length > 0
    ) {
      if (this._validPhone(this._phone.value)){ 
          
        const changedUser = { 
          name: this._name.value,
          age: this._age.value,
        //   gender:this.state.value,
          phone: this._phone.value,
          address: this._address.value,
          id: this.props.userToChange.ident
        }
        if(this.state.value.length<1){
            changedUser.gender=this.props.userToChange.gender
        }
        else{
            changedUser.gender=this.state.value
        }
        
        this.props.saveChangedUser(changedUser, this.props.userToChange.hash);
      }
    }
  }
  
  _validPhone(myPhone) {
    var re = /^\d[\d\(\)\ -]{4,14}\d$/;
    var valid = re.test(myPhone);
    if (valid) {
      return true;
    }
  }
}

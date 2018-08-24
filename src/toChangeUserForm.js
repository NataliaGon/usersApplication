import React from "react";

export default class FormForUserChange extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      age: "",
      gender: "",
      phone: "",
      address: ""
    };
  }
  componentWillMount() {
    this.setState({ name: this.props.userToChange.name });
    this.setState({ age: this.props.userToChange.age });
    this.setState({ gender: this.props.userToChange.gender });
    this.setState({ phone: this.props.userToChange.phone });
    this.setState({ address: this.props.userToChange.address });
  }
  _handleChange(event) {
    this.setState({ gender: event.target.value });
  }
  _handleSubmit(event) {
    event.preventDefault();
    if (
      this._name.value&&
      this._address.value&&
      this._phone.value&&
      this._age.value &&
      this._validPhone(this._phone.value)
    ) {
        const changedUser = {
          name: this._name.value,
          age: this._age.value,
          gender:this.state.gender,
          phone: this._phone.value,
          address: this._address.value,
          id: this.props.userToChange.ident
        };
        this.props.saveChangedUser(changedUser, this.props.userToChange.hash);
    }
  }
  _validPhone(myPhone) {
    var re = /^\d[\d\(\)\ -]{4,14}\d$/;
    var valid = re.test(myPhone);
    if (valid) {
      return true;
    }
  }
  render() {
    let form;
    let btnText;

    if (this.props.openModal) {
      console.log(this.props.userToChange.address);
      form = (
        <div className="shadow p-3 mb-5 bg-white rounded" id="form">
          <form
            className="form-control-file. form-container"
            onSubmit={this._handleSubmit.bind(this)}
          >
            <input
              className="form-control"
              type="text"
              defaultValue={this.state.name}
              placeholder="name"
              ref={input => (this._name = input)}
            />
            <input
              className="form-control"
              type="text"
              defaultValue={this.state.age}
              placeholder="age"
              ref={input => (this._age = input)}
            />

            <select
              className="form-control"
              defaultValue={this.state.gender}
              onChange={this._handleChange.bind(this)}
            >
              <option value="male">male</option>
              <option value="femal">femal</option>
            </select>

            <input
              className="form-control"
              type="tel"
              defaultValue={this.state.phone}
              placeholder="phone"
              ref={input => (this._phone = input)}
            />
            <input
              className="form-control"
              type="text"
              defaultValue={this.state.address}
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
}

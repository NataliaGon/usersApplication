import React from "react";

export default class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      displayModal: false,
      value:'',
      form:{
          name:'',
          age:'',
          gender:'',
          phone:'',
          address:''        
      }
    };
  }
 
  render() {
    let form;
    let btnText;
    let disabled;
    let usertoChangeName;

    if (this.props.openModal) {
      disabled = "disabled";
    }

    if (this.state.displayModal) {
      form = (
        <div className="shadow p-3 mb-5 bg-white rounded" 
        id="form">
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
            <select className="form-control"  defaultValue='male' onChange={this._handleChange.bind(this)}>
              <option value="male">male</option>
              <option value="femal">femal</option>
            </select>   
            <input
              className="form-control"
              type="text"
              placeholder="address"
              ref={input => (this._address = input)}
            />
            <input
              className="form-control"
              type="tel"
              placeholder="phone"
              ref={input => (this._phone = input)}
            />
            <button className="btn btn-primary" type="submit">
              Send info
            </button>
          </form>
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
  }
  _showModal() {
    this.setState({ displayModal: !this.state.displayModal });
  }
  _handleChange(event) {
    this.setState({value: event.target.value});
  }
  _handleSubmit(event) {
    event.preventDefault();
    const name = this._name;
    const phone = this._phone;   
    const  age = this._age;
    const address = this._address;
    if(
      name.value &&
      phone.value &&
      address.value &&
      age.value 
    ){
       if (this._validPhone(phone.value)){ 
      this.props.addUser(
        name.value,
        phone.value,
        address.value,
        this.state.value,
        age.value,  
      );
      this.setState({displayModal: !this.state.displayModal});
    }
  }
}
  _validPhone(myPhone) {
    var re = /^\d[\d\(\)\ -]{4,14}\d$/;
    var valid = re.test(myPhone);
    if (valid){
        return(true);
    }}
} 


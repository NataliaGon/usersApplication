import React from 'react';

export default  class FormForUserChange extends React.Component{
    constructor(){
        super();
        this.state={
            
        }
    }
        render(){
        let form
        let btnText
       
        if (this.props.openModal){
          
            form=                             
               <div className="shadow p-3 mb-5 bg-white rounded"  id ="form">
                 <form className="form-control-file." onSubmit ={this._handleSubmit.bind(this)}>
                    <input className="form-control" type="text" defaultValue={this.props.userToChange.name} placeholder="name"  ref={(input)=>this._name=input}></input>
                    <input className="form-control" type="text" defaultValue={this.props.userToChange.age} placeholder="age"  ref={(input)=>this._age=input}></input>
                    <input className="form-control" type="text" defaultValue={this.props.userToChange.gender} placeholder="gender"  ref={(input)=>this._gender=input}></input>
                    <input className="form-control" type="tel"  defaultValue={this.props.userToChange.phone} placeholder="phone"   ref={(input)=>this._phone=input}></input>
                    <input className="form-control" type="text" defaultValue={this.props.userToChange.address} placeholder="address"   ref={(input)=>this._address=input}></input>  
                    <button className="btn btn-primary" type="submit">Save changes</button>
                 </form>
                </div> 
        }
        else{
        
            form='';     
        }
        return(
            <div>
                <button  className="btn btn-primary" id="add-user-btn" disabled="disabled">{btnText}</button>        
                {form}
            </div>)
        }  
   
    _handleSubmit(event){
       
        event.preventDefault();
        if (this._name.value.length>0 && this._address.value.length>0&& this._gender.value.length>0&& this._age.value.length>0){
        const changedUser = {    
        name:this._name.value,
        gender:this._gender.value,
        age:this._age.value,
        phone:this._phone.value,
        address:this._address.value,
        id:this.props.userToChange.ident
        }
        this.props.saveChangedUser(changedUser, this.props.userToChange.hash); 

    }   
    } 
}
  
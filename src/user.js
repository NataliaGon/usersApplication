import React from 'react';
import FormForUserChange from  './toChangeUserForm';


export default  class User extends React.Component{
    constructor(){
        super();
        this.state={
            openModal:false,
            userToChange:{},
            editBtnText:'edit' 
        }

    }
    render(){
        
       
        return(
        <div className="user">
             <div className="user-name">{this.props.user.name}</div>
             <div className="user-age">{this.props.user.age}</div>
             <div className="user-gender">{this.props.user.gender}</div>
             <div className="user-phone">{this.props.user.phone}</div>
             <div className="user-address">{this.props.user.address}</div>

             <div className="user-photo"><img className="image" src={this.props.user.photo} alt=""/></div>
             <div className="buttons">
                 <button className="btn btn-danger" onClick={this._handleDelete.bind(this)}> delete</button>
                 <button className=" btn btn-primary btn-edit" onClick={this._userEdit.bind(this)}>{this.state.editBtnText}</button>
             </div>
       
        <FormForUserChange 
                      userToChange={this.state.userToChange}
                      openModal={this.state.openModal}
                      saveChangedUser={this._saveChangedUser.bind(this)}/>
        </div>
        )
    } 
    _handleDelete(event){
        event.preventDefault();
        this.props.deleteUser(this.props.user);
    } 
    _userEdit(event){
        event.preventDefault();
        this.setState({userToChange: this.props.user})
        this.setState({openModal: !this.state.openModal})
        this._changeEditBtnText(); 
    }
    _changeEditBtnText(){
        if(this.state.openModal){
          
            this.setState({editBtnText:'edit'})
        }else{
            this.setState({editBtnText:'cansel'})
        }

    }
    _saveChangedUser(name, phone, address, gender,age, photo, id){
        this.setState({openModal: !this.state.openModal})
       this.props.saveUserAfterChange(name, phone, address, gender,age,photo, id);
    }    
        
    
}
import React from 'react';

export default  class FormForUserChange extends React.Component{
    constructor(){
        super();
        this.state={
            photo:'',
            imagePreviewUrl:''
        }
        this._handleImageChange = this._handleImageChange.bind(this);
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
                    <input type="file"  accept="image/jpeg,image/png"  onChange={this._handleImageChange}/>
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
        var name=this._name;
        var gender=this._gender;
        var age=this._age;
        var phone=this._phone;
        var address=this._address;
        var photo=this.state.photo;
        var id=this.props.userToChange.ident; 
        if (name.value.length>0 && phone.value.length>0 && address.value.length>0&& gender.value.length>0&& age.value.length>0){
            this.props.saveChangedUser(name.value, phone.value, address.value,gender.value, age.value, this.state.imagePreviewUrl,id,); 
        }
        
    } 
    _handleImageChange(e) {
         e.preventDefault();
         let file = e.target.files[0];
         let reader = new FileReader();
         reader.readAsDataURL(file)
         reader.onloadend = () => {
            
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }
    }
}     
  
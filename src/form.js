import React from 'react';



export default  class Form extends React.Component{
    constructor(){
        super();
        this.state={
            displayModal: false       
        }
    }
    
    render(){
        let form;
        let btnText;
        let disabled;
        let usertoChangeName

        if(this.props.openModal){
            disabled= 'disabled'
        }

        if (this.state.displayModal){
                                       
            form= <div className="shadow p-3 mb-5 bg-white rounded"  id ="form">
                 <form className="form-control-file." onSubmit ={this._handleSubmit.bind(this)}>
                    <input className="form-control" type="text" placeholder="name"  ref={(input)=>this._name=input}>{usertoChangeName}</input>
                    <input className="form-control" type="text" placeholder="age"  ref={(input)=>this._age=input}></input>
                    <input className="form-control" type="text" placeholder="gender"  ref={(input)=>this._gender=input}></input>
                    <input className="form-control" type="text" placeholder="address"  ref={(input)=>this._address=input}></input>
                    <input className="form-control" type="tel" placeholder="phone" ref={(input)=>this._phone=input}></input>
                    
    
                    <button className="btn btn-primary" type="submit">Send info</button>
                 </form>
                </div>;
           
            btnText= 'cansel';
                    
        }
        else{
            form=null;
            btnText= 'addUser' 
        }
        return(
            <div>
                <button  className="btn btn-primary" id="add-user-btn" disabled={disabled} onClick={this._showModal.bind(this)}>{btnText}</button>        
                {form}
           </div>)
    }  

   _showModal(){
        this.setState(
            {displayModal: !this.state.displayModal}
        )
    }
    _handleSubmit(event){
        event.preventDefault();
        var name=this._name;
        var phone=this._phone;
        var gender=this._gender;
        var age=this._age;
        var address=this._address;
         
        if (name.value.length>0 && phone.value.length>0 && address.value.length>0 && gender.value.length>0&& age.value.length>0){       
            this.props.addUser(name.value, phone.value, address.value, gender.value, age.value, this.state.imagePreviewUrl, this.state.file);      
            this.setState({displayModal: !this.state.displayModal});
            this.setState({imagePreviewUrl: ''});
            this.setState({file: ''});
        }
        
    } 
   
    
}  
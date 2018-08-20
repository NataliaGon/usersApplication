import React from 'react';

export default class HeaderTab extends React.Component{
    render(){
        return(
            <header id="header" className="bg-info">
                <div className="user-name">Name</div>
                <div className="user-name">Age</div>
                <div className="user-name">Gender</div>
                <div className="user-phone">Phone</div>
                <div className="user-address">Address</div>
                <div className="buttons"></div>
            </header>
    )
    }  
} 
import React, { Component } from 'react';

class SignIn extends Component {
    state = {  

        userObjArray:[{userName:"Awais",userPWD:"Awais@123"}
        ,{userName:"Saqib",userPWD:"Saqib@123"}
        ,{userName:"Sherwani",userPWD:"Sherwani@123"}
    ],
        userName:'',
        userPWD:'',
        _isAuthorized:false,
       
       
    }


    HandlerChange = (event) => {
        this.setState({
          [event.target.name]:
            event.target.type === "number"
              ? parseFloat(event.target.value)
              : event.target.value,
        });
      };
      HandlerCheckAuthorization = () =>{
          const {userName,userPWD} = this.state;
          let c=this.state.userObjArray.find( uo => (uo.userName===userName && uo.userPWD===userPWD))
          this.setState({
            _isAuthorized:(typeof c !== 'undefined') ?  true:false,
           
          }); 
         
        //   console.log(this.userName)
          


      }
    render() { 
        console.log(this.props)
        return (  
            
            <div>
                <label htmlFor="">User Name:</label>:
                <input type="text" placeholder="User Name" name="userName"
                onChange={this.HandlerChange}/>
                <label htmlFor="">User Password:</label>:
                <input type="text" placeholder="User Password" name="userPWD"
                onChange={this.HandlerChange} 
                onBlur={this.HandlerCheckAuthorization}/>

                <button onClick = {() => this.props.onAutho(this.state._isAuthorized,this.state.userName)}>Log In</button>

            </div>

        );
    }
}
 
export default SignIn;
import React, { Component } from 'react';
import Crud from './Components/Crud';
import SignIn from './Components/SignIn';
import LogInError  from './Components/LogInError';
class App extends Component {
  state = {  
    userName:'',
    isAuthorized:0,
  }

  HandlerSetAuthorization = (isAuthorized,userName) =>{
    // alert('From user App moudule HandlerSetAuthorization');
    // console.log(`value of userName is = ${userName} and isAuthorized is = ${isAuthorized}`);
      this.setState({isAuthorized:(isAuthorized)?1:2,userName});
      // console.log(this.state.isAuthorized);
  }
  HandlerLogOut = _ =>{
    this.setState({isAuthorized:0});
  }
  render() { 
    return (  
      <div>
            {(this.state.isAuthorized===0)  ? <SignIn onAutho={this.HandlerSetAuthorization}/>:null}
            {(this.state.isAuthorized===1)? 
            <div>
                 <h1>Travel Agency!!!</h1>{<h3>Welcome Mr : {this.state.userName}</h3>}
                 <button onClick={this.HandlerLogOut}>Log Out</button>
            </div> 
           :null}
           {(this.state.isAuthorized===1)?<Crud userName={this.state.userName}/>:(this.state.isAuthorized===2)?<LogInError/>:null}
           

      </div>
      
    );
  }
}
 
export default App;

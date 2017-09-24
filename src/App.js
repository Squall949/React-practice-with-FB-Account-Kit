import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.smsLogin = this.smsLogin.bind(this);
    this.emailLogin = this.emailLogin.bind(this);
  }

  // phone form submission handler
  smsLogin() {
		//var countryCode = document.getElementById("country_code").value;
		//var phoneNumber = document.getElementById("phone_number").value;
		window.AccountKit.login(
		  'PHONE', 
		  {countryCode: '', phoneNumber: ''}, // will use default values if not specified
		  this.loginCallback
		);
  }

  // email form submission handler
  emailLogin() {
		//var emailAddress = document.getElementById("email").value;
		window.AccountKit.login(
		  'EMAIL',
		  {emailAddress: ''},
		  this.loginCallback
		);
	}
  
  // login callback
  loginCallback(response) {
		if (response.status === "PARTIALLY_AUTHENTICATED") {
		  var code = response.code;
		  var csrf = response.state;
		  
		  // Send code to server to exchange for access token
		  document.getElementById("code").value = response.code;
		  document.getElementById("csrf").value = response.state;
		  document.getElementById("login_success").submit();
		  
		}
		else if (response.status === "NOT_AUTHENTICATED") {
		  // handle authentication failure
		  
		}
		else if (response.status === "BAD_PARAMS") {
		  // handle bad parameters
		  
		}
  }
    
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to MyFBLive</h2>
        </div>
        <p className="App-intro">
          To get started, please <b>Login</b>.
        </p>
        <div>
          <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" onClick={this.smsLogin}>Login via SMS</button>
        </div>
        <div>Or</div>
        <div>
          <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent" onClick={this.emailLogin}>Login via Email</button>
        </div>
      </div>
    );
  }
}

export default App;

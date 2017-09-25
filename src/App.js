import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSuccessfulLogin:false,
      token:"",
      userId:""
    };
  }

  // phone form submission handler
  smsLogin = () => {
		//var countryCode = document.getElementById("country_code").value;
		//var phoneNumber = document.getElementById("phone_number").value;
		window.AccountKit.login(
		  'PHONE', 
		  {countryCode: '', phoneNumber: ''}, // will use default values if not specified
		  this.loginCallback
		);
  }

  // email form submission handler
  emailLogin = () => {
		//var emailAddress = document.getElementById("email").value;
		window.AccountKit.login(
		  'EMAIL',
		  {emailAddress: ''},
		  this.loginCallback
		);
  }
  
  fetchUserData = (url) => {
    fetch(url, {
      method: 'GET'
      })
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText)
        return response.json()
      })
      .then((resp) => {
        this.setState({isSuccessfulLogin:true,token:resp.access_token,userId:resp.id});
      })
      .catch((error) => {
        //console.error(error)
      })
  }
  
  // login callback
  loginCallback = (response) => {
		if (response.status === "PARTIALLY_AUTHENTICATED") {
		  const code = response.code;
      const account_kit_api_version = 'v1.1';
      const app_id = '2072180896132839';
      const app_secret = '50a206194dafd2fc9924f85f468a0f74';
      const token_exchange_base_url = `https://graph.accountkit.com/${account_kit_api_version}/access_token`;

      const app_access_token = ['AA', app_id, app_secret].join('|');
      const params = {
        grant_type: 'authorization_code',
        code,
        access_token: app_access_token
      };

      function toQueryString(paramsObject) {
        return Object
          .keys(paramsObject)
          .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(paramsObject[key])}`)
          .join('&')
        ;
      }

      const token_exchange_url = token_exchange_base_url + '?' + toQueryString(params);
      this.fetchUserData(token_exchange_url);
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
          <h2>Welcome to my test of Account Kit Login</h2>
        </div>
        <p className="App-intro">
          To get started, please <b>Choose</b>.
        </p>
        <div>
          <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" onClick={this.smsLogin}>Login via SMS</button>
        </div>
        <div>Or</div>
        <div>
          <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent" onClick={this.emailLogin}>Login via Email</button>
        </div>
        <div className={(!this.state.isSuccessfulLogin)?'App-inVisible':''}>
          <div><code>User Token:</code> {this.state.token}</div>
          <div><code>User Id:</code> {this.state.userId}</div>
        </div>
      </div>
    );
  }
}

export default App;

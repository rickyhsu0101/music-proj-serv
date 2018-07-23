import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from './util/setAuthToken';
import {setCurrentUser} from './actions/authActions'; 
import store from './store/store';
import './App.css';
import Register from './components/auth/Register/Register';
import Login from './components/auth/Login/Login';
import NavbarCustom from './components/layout/NavbarCustom/NavbarCustom';
import CreateUpdateProfile from './components/dashboard/CreateUpdateProfile/CreateUpdateProfile';
if(localStorage.jwtToken){
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
}

class App extends Component {
  render() {
    return (
      <Provider store = {store}>
        <Router>
          <div>
            <NavbarCustom/>
            <Route exact path = "/register" component ={Register} />
            <Route exact path = "/login" component = {Login}/>
            <Route exact path = "/profile" component = {CreateUpdateProfile}/>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

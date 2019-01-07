import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Switch } from 'react-router'
import { Provider } from 'react-redux';
import store from './store.js';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authAction';
import { clearCurrentProfile, addExperience } from './actions/profileActions';
import Navbar from './components/layout/navbar';
import Register from './components/auth/register';
import Login from './components/auth/login';
import Landing from './components/layout/landing';
import Footer from './components/layout/footer';
import Dashboard from './components/dashboard/dashboard';
import PrivateRoute from './components/common/PrivateRoute';
import './App.css';
import CreateProfile from './components/create-profile/createProfile';
import EditProfile from './components/editProfile/editProfile.js';
import AddExperience from './components/addCredentials/addExperience';
import AddEducation from './components/addCredentials/addEducation';
import Profiles from './components/profiles/profiles.js';
import Profile from './components/profile/profile.js';

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  store.dispatch(clearCurrentProfile);
  const currenttime=Date.now() / 1000;
  if(decoded.exp < currenttime){
    store.dispatch(logoutUser());
    store.dispatch(clearCurrentProfile());
    window.location.href='/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:profile" component={Profile} />
              <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
              <PrivateRoute exact path="/create-profile" component={CreateProfile} />
              </Switch>
              <Switch>
              <PrivateRoute exact path="/edit-profile" component={EditProfile} />
              </Switch>
              <Switch>
              <PrivateRoute exact path="/add-experience" component={AddExperience} />
              </Switch>
              <Switch>
              <PrivateRoute exact path="/add-education" component={AddEducation} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

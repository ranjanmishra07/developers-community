import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store.jsx'
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser } from './actions/authAction'
import Navbar from './components/layout/navbar';
import Register from './components/auth/register'
import Login from './components/auth/login'
import Landing from './components/layout/landing'
import Footer from './components/layout/footer'
import './App.css';

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded))
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
            </div>
            <Footer />
            <h1>ceate react app</h1>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

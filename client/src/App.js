import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Navbar from './components/layout/navbar';
import Register from './components/auth/register'
import Login from './components/auth/login'
import Landing from './components/layout/landing'
import Footer from './components/layout/footer'
import './App.css';

class App extends Component {
  render() {
    return (
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
    );
  }
}

export default App;

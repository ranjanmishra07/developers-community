import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import {logoutUser} from '../../actions/authAction';
import {clearCurrentProfile} from '../../actions/profileActions';
 
class Navbar extends Component {
  onLogoutclick = () => {
    this.props.logoutUser();
    this.props.clearCurrentProfile();
  }
  render() {
    const {isAuthenticated,user} =this.props.auth;
    const authLinks=(
      <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <a href="" onClick={this.onLogoutclick} className="nav-link">
        <img src={user.avatar} alt={user.name} style={{width:'10%'}}></img>
        Logout
        </a>
      </li>
    </ul>
    )
    const guestLists= (
      <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/register">Sign Up</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/login">Login</Link>
      </li>
    </ul>
    )
    return (
      <div>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
          <div className="container">
            <Link className="navbar-brand" to="/">DevConnector</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="mobile-nav">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/profiles"> Developers</Link>
                </li>
              </ul>
              {isAuthenticated ? authLinks : guestLists}
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

Navbar.propTypes = {
  logoutUser:propTypes.func.isRequired,
  auth: propTypes.object.isRequired
}
const mapStateToProps=(state)=>({
  auth: state.auth
})
export default connect(mapStateToProps,{logoutUser,clearCurrentProfile})(Navbar);
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import Spinner from '../common/spinner';
import ProfileActions from './profileActions';
import Experience from './experience';
import Education from './education';

class Dashboard extends Component {
  componentDidMount() {
    
    this.props.getCurrentProfile();
  }
  onDeleteClick = (e) => {
    this.props.deleteAccount();
  }
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let dashboardcontent;
    if (profile === null || loading) {
      dashboardcontent = <Spinner />
    }else if(Object.keys(profile).length>0){
      dashboardcontent = (
        <div>
          <p className="lead text-muted">
            welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
          </p>
          <ProfileActions />
          <Experience experience={profile.experience}/>
          <Education education={profile.education}/>
          <div style={{marginBottom:"60px"}} />
          <button onClick={this.onDeleteClick} className="btn btn-danger">Delete My Account</button>
        </div>
      )
    } else {
      dashboardcontent = (
        <div>
          <p className="text-muted">hello {user.name}</p>
          <p>you have not set up profile yet,please set it up</p>
          <Link to="/create-profile" className="btn btn-lg btn-info">create profile</Link>
        </div>
      )
    }
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardcontent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
Dashboard.propTypes = {
  deleteAccount: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
})
export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
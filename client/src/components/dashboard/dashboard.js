import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { getCurrentProfile } from '../../actions/profileActions'
import Spinner from '../common/spinner';
class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    console.log('profile',profile);
    const skills=profile && profile.skills;
    let dashboardcontent;
    if (profile === null || loading) {
      dashboardcontent = <Spinner />
    }else if(Object.keys(profile).length>0){
      dashboardcontent = (
        <div>
          <h1>hello {profile.handle}</h1>
          <p>you have following skills</p>
          {skills.map(skill=><p>{skill}</p>)}
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
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
})
export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
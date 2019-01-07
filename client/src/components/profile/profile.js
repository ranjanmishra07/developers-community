import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { getProfileByHandle } from '../../actions/profileActions';
import ProfileAbout from './profileAbout';
import ProfileHeader from './profileHeader';
import ProfileCreds from './profileCreds';
import ProfileGithub from './profileGithub';
import Spinner from '../common/spinner';
class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.profile) {
      this.props.getProfileByHandle(this.props.match.params.profile);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push('/not-found');
    }
  }

  render() {
    console.log('props',this.props.profile);
    const { profile, loading } = this.props.profile;
    let profilecontent;
    if (profile === null || loading) {
      profilecontent = <Spinner />
    } else {
      profilecontent = (
        <div>
          <div className="row">
            <div className="col-md-6">
            <Link to = "/profiles" className="btn btn-light mb3 float-left" >
            Back to profiles
            </Link>
            </div>
          </div>
        <ProfileHeader profile={profile}/>
        <ProfileAbout profile={profile}/>
        <ProfileCreds experience={profile.experience} education={profile.education}/>
        {profile.githubusername ? (
            <ProfileGithub username={profile.githubusername} />
          ) : null}
        </div>
      )
    }
    return (
      <div>
        <h1>profile</h1>
        {profilecontent}
      </div>
    )
  }
}

Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
})

export default connect(mapStateToProps, { getProfileByHandle })(Profile);

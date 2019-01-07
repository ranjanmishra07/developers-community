import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {deleteExperience} from '../../actions/profileActions';
class Experience extends Component {
  deleteExperience = (id) =>{
    this.props.deleteExperience(id,this.props.history);
  }
  render() {
    const experience=this.props.experience && this.props.experience.map(exp=>(
      <tr key={exp.id}>
       <td >{exp.company}</td>
       <td >{exp.title}</td>
       <td >{exp.from} - {exp.to}</td>
       <td><button onClick={e=>this.deleteExperience(e,exp._id)}className="btn btn-danger">delete</button></td>
      </tr>
    ))
    return (
      <div>
        <h4>Experience credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>company</th>
              <th>title</th>
              <th>years</th>
              <th />
            </tr>
            {experience}
          </thead>
        </table>
      </div>
    )
  }
}

Experience.propTypes = {
  deleteExperience : PropTypes.func.isRequired
}

export default connect(null,{deleteExperience})(
  withRouter(Experience)
);

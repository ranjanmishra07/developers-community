import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {deleteEducation} from '../../actions/profileActions';
class Education extends Component {
  deleteEducation = (id) =>{
    this.props.deleteEducation(id,this.props.history);
  }
  render() {
    const Education=this.props.education && this.props.education.map(edu=>(
      <tr key={edu.id}>
       <td >{edu.school}</td>
       <td >{edu.degree}</td>
       <td >{edu.from} - {edu.to}</td>
       <td><button onClick={e=>this.deleteEducation(e,edu._id)}className="btn btn-danger">delete</button></td>
      </tr>
    ))
    return (
      <div>
        <h4>Education credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>company</th>
              <th>title</th>
              <th>years</th>
              <th />
            </tr>
            {Education}
          </thead>
        </table>
      </div>
    )
  }
}

Education.propTypes = {
  deleteEducation : PropTypes.func.isRequired
}

export default connect(null,{deleteEducation})(
  withRouter(Education)
);

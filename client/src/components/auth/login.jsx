import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import classnames from 'classnames';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { loginUser } from '../../actions/authAction'

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    }
  }
  onChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value })
  }

  // componentDidMount() {
  //   if (this.props.auth.isAuthenticated) {
  //     this.props.history.push('/dashboard');
  //   }
  // }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }

    else if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      email: this.state.email,
      password: this.state.password
    }

    this.props.loginUser(newUser, this.state.history)
  }
  render() {
    const { errors } = this.state;
    return (
      <div>
        <div className="login">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Log In</h1>
                <p className="lead text-center">Sign in to your DevConnector account</p>
                <form action="dashboard.html" noValidate onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <input type="email" className={classnames("form-control form-control-lg", { "is-invalid": errors })}
                      placeholder="Email Address" name="email"
                      value={this.state.email} onChange={this.onChange} />
                    {errors && errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                  </div>
                  <div className="form-group">
                    <input type="password" className={classnames("form-control form-control-lg", { "is-invalid": errors })}
                      placeholder="Password" name="password"
                      value={this.state.password} onChange={this.onChange} />
                    {errors && errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                  </div>
                  <input type="submit" className="btn btn-info btn-block mt-4" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { loginUser })(withRouter(Login))
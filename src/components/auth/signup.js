import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as actions         from '../../actions';
import { connect }          from 'react-redux';

class Signup extends Component {
  handleFormSubmit(formProps) {
    // Call action creator to sign up the user
    this.props.signupUser(formProps);
  }
  
  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }
  
  render() {
    const { handleSubmit, errors, fields: { email, password, passwordConfirm } } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email:</label>
          <input {...email} name="email" type="text" className="form-control"/>
          {email.touched && email.error && <div className="error">{email.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <input {...password} name="password" type="password" className="form-control"/>
          {password.touched && password.error && <div className="error">{password.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Confirm Password:</label>
          <input {...passwordConfirm} name="passwordConfirm" type="password" className="form-control"/>
          {passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div>}
        </fieldset>
        {this.renderAlert()}
        < button action="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

function validate(formProps) {
  const errors = {};
  
  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }
  
  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }
  
  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please confirm your password';
  }
  
  if (formProps.password !== formProps.passwordConfirm) {
    errors.passwordConfirm = 'Passwords must match';
  }
  
  return errors;
}

export default connect(mapStateToProps, actions)(reduxForm({
  form: 'signup',
  fields: [ 'email', 'password', 'passwordConfirm' ],
  validate
})(Signup));
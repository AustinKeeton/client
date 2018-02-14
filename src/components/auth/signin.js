import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as actions         from '../../actions';
import { connect }          from 'react-redux';

class Signin extends Component {
  handleFormSubmit({ email, password }) {
    // Need to log user in
    this.props.signinUser({ email, password });
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
    const { handleSubmit, fields: { email, password } } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email:</label>
          <input {...email} name="email" type="text" className="form-control"/>
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <input {...password} name="password" type="password" className="form-control"/>
        </fieldset>
        {this.renderAlert()}
        < button action="submit"
                 className="btn btn-primary">Sign In
        </button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default connect(mapStateToProps, actions)(reduxForm({
  form: 'signin',
  fields: [ 'email', 'password' ]
})(Signin));
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../actions';
import { connect } from 'react-redux';

const required = val => !val ? 'This field is required':undefined;
const minLength = val => val.length < 6 ? 'This field must contain at lest 6 chars' : undefined;
const allowedChars = val => !(/^[a-zA-Z0-9_-]*$/.test(val)) ? 'This field can only contain letters, numbers, -, or _':undefined;
const fieldValid = [required, minLength, allowedChars];

class Auth extends Component {
  constructor(props) {
    super(props);

    this.state = {signin: true};
  }
  renderInput(field) {
    return (
      <fieldset className="form-group">
        <label>{field.label}</label>
        <div>
          <input {...field.input} type={field.type} className="form-control" />
          {field.meta.touched && field.meta.error && <span className="error">{field.meta.error}</span>}
        </div>
      </fieldset>
    );
  }

  handleFormSubmit({name, pswd}) {
    if(this.state.signin) {
      this.props.signinUser({name, password: pswd});
    } else {
      this.props.signupUser({name, password: pswd});
    }
  }

  activateSignup() {
    this.setState({signin: false});
  }

  render () {
    const { handleSubmit, errorMessage } = this.props;

    let submit = null;
    if(this.state.signin) {
      submit = (
        <div>
          <button action="submit" className="btn btn-primary">Sign In</button>
          <br />
          <a onClick={() => this.activateSignup()}>New user? Click here.</a>
        </div>
      );
    } else {
      submit = (
        <div>
          <Field name="pswdVerify" component={this.renderInput} validate={fieldValid} type="password" label="Verify Password" />
          <button action="submit" className="btn btn-secondary">Sign Up</button>
        </div>
      );
    }

    return (
      <div className="auth-form container">
        <h1>Sign In / Up</h1>
        <form onSubmit={handleSubmit( e => this.handleFormSubmit(e) )}>
          <Field name="name" component={this.renderInput} validate={fieldValid} type="text" label="Name" />
          <Field name="pswd" component={this.renderInput} validate={fieldValid} type="password" label="Password" />
          {errorMessage && <div className="error"><strong>Oops: </strong>{errorMessage} <br /></div>}
          {submit}
        </form>
      </div>
    );
  }
}

function validate({pswd, pswdVerify}) {
  const errors = {};

  if(pswd && pswdVerify && pswd != pswdVerify)
    errors['pswdVerify'] = "Password and Verify Password do not match";

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form: 'auth',
  validate
})(
  connect(mapStateToProps, actions)(Auth)
);

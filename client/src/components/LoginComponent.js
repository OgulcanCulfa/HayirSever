import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { loginAction } from "../actions/auth";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger mt-2" role="alert">
        Bu alan boş bırakılamaz.
      </div>
    );
  }
};




class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeEmailAddress = this.onChangeEmailAddress.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      EmailAddress: "",
      Password: "",
      loading: false,
    };
  }

  onChangeEmailAddress(e) {
    this.setState({
      EmailAddress: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      Password: e.target.value,
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      loading: true,
    });

    this.form.validateAll();

    const { history } = this.props;

    if (this.checkBtn.context._errors.length === 0) {
      this.props.actions
        .login(this.state.EmailAddress, this.state.Password)
        .then(() => {
          history.push("/profile");
          window.location.reload();
        })
        .catch(() => {
          this.setState({
            loading: false,
          });
        });
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { isLoggedIn, message } = this.props;

    if (isLoggedIn) {
      return <Redirect to="/profile" />;
    }

    return (
      <div className="col-md-12 d-flex justify-content-center mt-5">
        <div className="card card-container border-0 w-50">
          <Form
            onSubmit={this.handleLogin}
            ref={(c) => {
              this.form = c;
            }}
          >
            <div className="form-group">
              <label htmlFor="EmailAddress">Email Adresi</label>
              <Input
                type="text"
                className="form-control"
                name="EmailAddress"
                value={this.state.EmailAddress}
                onChange={this.onChangeEmailAddress}
                validations={[required]}
              />
               
            </div>


            <div className="form-group">
              <label htmlFor="Password">Şifre</label>
              <Input
                type="password"
                className="form-control"
                name="Password"
                value={this.state.Password}
                onChange={this.onChangePassword}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <button
                className="btn btn-primary btn-block"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Giriş Yap</span>
              </button>
            </div>

            {message && (
              <div className="form-group">
                <div className="alert alert-danger text-center" role="alert">
                  {message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={(c) => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { isLoggedIn } = state.authReducer;
  const { message } = state.messageReducer;
  return {
    isLoggedIn,
    message,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      login: bindActionCreators(loginAction, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

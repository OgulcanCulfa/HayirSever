import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { registerAction } from "../actions/auth";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const email = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const name = (value) => {
  if (value.length < 3 || value.length > 80) {
    return (
      <div className="alert alert-danger" role="alert">
        The name must be between 3 and 80 characters.
      </div>
    );
  }
};

const surname = (value) => {
  if (value.length < 3 || value.length > 50) {
    return (
      <div className="alert alert-danger" role="alert">
        The surname must be between 3 and 50 characters.
      </div>
    );
  }
};

const password = (value) => {
  if (value.length < 6 || value.length > 50) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 50 characters.
      </div>
    );
  }
};

class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeSurname = this.onChangeSurname.bind(this);
    this.onChangeEmailAdress = this.onChangeEmailAdress.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      Name: "",
      Surname: "",
      EmailAddress: "",
      Password: "",
      successful: false,
    };
  }

  onChangeName(e) {
    this.setState({
      Name: e.target.value,
    });
  }

  onChangeSurname(e) {
    this.setState({
      Surname: e.target.value,
    });
  }

  onChangeEmailAdress(e) {
    this.setState({
      EmailAdress: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      Password: e.target.value,
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      successful: false,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      this.props.actions
        .registerForm(
          this.state.Name,
          this.state.Surname,
          this.state.EmailAdress,
          this.state.Password
        )
        .then((res) => {
          this.setState({
            successful: true,
          });
        })
        .catch((err) => {
          if (err) throw err;
          this.setState({
            successful: false,
          });
        });
    }
  }

  render() {
    const { message } = this.props;

    return (
      <div className="col-md-12 d-flex justify-content-center mt-5">
        <div className="card card-container border-0 w-50">
          <Form
            onSubmit={this.handleRegister}
            ref={(c) => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="Name">Name</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="Name"
                    value={this.state.Name}
                    onChange={this.onChangeName}
                    validations={[required, name]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="Surname">Surname</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="Surname"
                    value={this.state.Surname}
                    onChange={this.onChangeSurname}
                    validations={[required, surname]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={this.state.EmailAdress}
                    onChange={this.onChangeEmailAdress}
                    validations={[required, email]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.Password}
                    onChange={this.onChangePassword}
                    validations={[required, password]}
                  />
                </div>

                <div className="form-group">
                  <button className="btn btn-primary btn-block">Sign Up</button>
                </div>
              </div>
            )}

            {message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
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
  const { message } = state.messageReducer;
  return {
    message,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      registerForm: bindActionCreators(registerAction, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);

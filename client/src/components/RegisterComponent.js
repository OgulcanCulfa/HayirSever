import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { registerAction } from "../actions/auth";
import alertify from "alertifyjs";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger mt-2" role="alert">
        Bu alan boş bırakılamaz.
      </div>
    );
  }
};

const email = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        Bu geçerli bir e-mail adresi değil.
      </div>
    );
  }
};

const name = (value) => {
  if (value.length < 2 || value.length > 80) {
    return (
      <div className="alert alert-danger mt-2" role="alert">
        Adınız 2 veya 80 harf arasında olmalıdır.
      </div>
    );
  }
};

const surname = (value) => {
  if (value.length < 3 || value.length > 50) {
    return (
      <div className="alert alert-danger mt-2" role="alert">
        Soyadınız 3 veya 50 harf arasında olmalıdır.
      </div>
    );
  }
};

const password = (value) => {
  if (value.length < 6 || value.length > 50) {
    return (
      <div className="alert alert-danger mt-2" role="alert">
        Şifreniz 6 veya 50 karakter arasında olmalıdır.
      </div>
    );
  }
};

const department = (value) => {
  if (value.length < 2 || value.length > 80) {
    return (
      <div className="alert alert-danger mt-2" role="alert">
        Bölüm bilgisi 2 veya 50 karakter arasında olmalıdır.
      </div>
    );
  }
};

const classNum = (value) => {
  if (value < 1 || value > 6) {
    return (
      <div className="alert alert-danger mt-2" role="alert">
        Sınıf 1 veya 6 arasında olabilir.
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
    this.onChangeDepartment = this.onChangeDepartment.bind(this);
    this.onChangeClassNum = this.onChangeClassNum.bind(this);

    this.state = {
      Name: "",
      Surname: "",
      EmailAddress: "",
      Password: "",
      department: "",
      classNum: null,
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

  onChangeDepartment(e) {
    this.setState({
      department: e.target.value,
    });
  }

  onChangeClassNum(e) {
    this.setState({
      classNum: e.target.value,
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      this.props.actions
        .registerForm(
          this.state.Name,
          this.state.Surname,
          this.state.EmailAdress,
          this.state.Password,
          this.state.department,
          this.state.classNum
        )
        .then((res) => {
          alertify.success(res.data);
          this.props.history.push("/giris");
        })
        .catch((err) => {
          alertify.error(err.response.data);
        });
    }
  }

  render() {
    return (
      <div className="my-auto align-items-center w-100">
        <div className="row">
          <div className="col-md-12 d-flex justify-content-center">
            <div className="card card-container p-4 border-0 w-75">
              <Form
                id="registerForm"
                onSubmit={this.handleRegister}
                ref={(c) => {
                  this.form = c;
                }}
              >
                <div>
                  <div className="form-group">
                    <label htmlFor="Name">Ad</label>
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
                    <label htmlFor="Surname">Soyad</label>
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
                    <label htmlFor="department">Bölüm</label>
                    <Input
                      type="text"
                      className="form-control"
                      name="department"
                      value={this.state.department}
                      onChange={this.onChangeDepartment}
                      validations={[required, department]}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="classNum">Sınıf</label>
                    <Input
                      type="number"
                      className="form-control"
                      name="classNum"
                      value={this.state.classNum}
                      onChange={this.onChangeClassNum}
                      validations={[required, classNum]}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Adresi</label>
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
                    <label htmlFor="password">Şifre</label>
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
                    <button className="btn btn-primary btn-block">
                      Kayıt Ol
                    </button>
                  </div>
                </div>
                <CheckButton
                  style={{ display: "none" }}
                  ref={(c) => {
                    this.checkBtn = c;
                  }}
                />
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      registerForm: bindActionCreators(registerAction, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);

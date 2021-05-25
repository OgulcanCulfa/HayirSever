import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { getUserAction } from "../actions/userActions";

class User extends Component {
  componentDidMount() {
    this.props.actions.getUser(parseInt(this.props.match.params.id));
  }

  render() {
    const { user } = this.props;
    return (
      <div className="container">
        <section className="profile">
          <div className="main-body">
            <div className="row text-center">
              <div className="col-md-12 mb-3">
                <h2>Kullanıcı Bilgileri</h2>
              </div>
            </div>
            <div className="row gutters-sm">
              <div className="col-md-5 mb-3">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex flex-column align-items-center text-center">
                      <img src={user.profilePhoto} alt="" width="150" />
                      <div className="mt-3">
                        <h4>
                          {user.Name} {user.Surname}
                        </h4>
                        <p className="text-secondary mb-1">
                          Bölüm: {user.department}
                        </p>
                        <p className="text-secondary mb-1">
                          Sınıf: {user.classNum}
                        </p>
                        {user.district && user.city ? (
                          <p className="text-muted font-size-sm">
                            Yaşadığı Yer: {user.district} / {user.city}
                          </p>
                        ) : (
                          <p className="text-muted font-size-sm">
                            {" "}
                            Yaşadığı Yer:{" "}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card mt-3">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                      <h6 className="mb-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-globe mr-2 icon-inline"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="2" y1="12" x2="22" y2="12"></line>
                          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                        </svg>
                        Website
                      </h6>
                      <span className="text-secondary text-break">
                        <a rel="noreferrer" target="_blank" href={user.website}>
                          {user.website}
                        </a>
                      </span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                      <h6 className="mb-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-github mr-2 icon-inline"
                        >
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                        </svg>
                        Github
                      </h6>
                      <span className="text-secondary text-break">
                        <a rel="noreferrer" target="_blank" href={user.github}>
                          {user.github}
                        </a>
                      </span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                      <h6 className="mb-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-twitter mr-2 icon-inline text-info"
                        >
                          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                        </svg>
                        Twitter
                      </h6>
                      <span className="text-secondary text-break">
                        <a rel="noreferrer" target="_blank" href={user.twitter}>
                          {user.twitter}
                        </a>
                      </span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                      <h6 className="mb-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-instagram mr-2 icon-inline text-danger"
                        >
                          <rect
                            x="2"
                            y="2"
                            width="20"
                            height="20"
                            rx="5"
                            ry="5"
                          ></rect>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </svg>
                        Instagram
                      </h6>
                      <span className="text-secondary text-break">
                        <a
                          rel="noreferrer"
                          target="_blank"
                          href={user.instagram}
                        >
                          {user.instagram}
                        </a>
                      </span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                      <h6 className="mb-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-facebook mr-2 icon-inline text-primary"
                        >
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                        </svg>
                        Facebook
                      </h6>
                      <span className="text-secondary text-break">
                        <a rel="noreferrer" href={user.facebook}>
                          {user.facebook}
                        </a>
                      </span>
                    </li>

                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                      <h6 className="mb-0">
                        <img
                          alt=""
                          src="https://img.icons8.com/windows/32/4a90e2/kaggle.png"
                        />
                        Kaggle
                      </h6>
                      <span className="text-secondary text-break">
                        <a rel="noreferrer" href={user.kaggle}>
                          {user.kaggle}
                        </a>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-7 d-flex justify-content-center">
                <div className="card w-100 mb-3">
                  <div className="card-body ">
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Ad Soyad</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        {user.Name} {user.Surname}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">E-mail</h6>
                      </div>
                      <div className=" mt-0 col-sm-9 text-secondary">
                        {user.EmailAddress}
                      </div>
                    </div>

                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Telefon</h6>
                      </div>
                      <div className=" col-sm-9 text-secondary">
                        {user.mobile}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3 d-flex align-items-center">
                        <h6 className="mb-0">Adres</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        {user.address}
                      </div>
                    </div>
                    <hr />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getUser: bindActionCreators(getUserAction, dispatch),
    },
  };
}

function mapStateToProps(state) {
  const { user } = state.userReducer;
  const { auth } = state.authReducer;
  return {
    user,
    auth,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(User);

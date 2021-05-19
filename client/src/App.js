import React, { Component } from "react";
import { connect } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";

import "jquery/dist/jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./App.css";
import Login from "./components/LoginComponent";
import Register from "./components/RegisterComponent";
import Home from "./components/HomeComponent";
import Profile from "./components/ProfileComponent";
import Post from "./components/PostComponent";
import User from "./components/UserComponent";
import Message from "./components/MessageComponent";
import Error from "./components/ErrorComponent";

import { logoutAction } from "./actions/auth";
import { clearMessage } from "./actions/messages";

import { history } from "./utils/history";
import ProtectedRoute from "./utils/ProtectedRoute";
import { bindActionCreators } from "redux";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAdmin: false,
      currentUser: undefined,
    };

    // history.listen((location) => {
    //   this.props.actions.clearMessage(); // clear message when changing location
    // });
  }

  componentDidMount() {
    const auth = this.props.auth;
    if (auth) {
      this.setState({
        currentUser: auth,
        isAdmin: auth.UserTypeName.includes("Root"),
      });
    }
  }

  render() {
    const { currentUser, isAdmin } = this.state;
    return (
      <Router history={history}>
        <div style={{ minHeight: "1000px" }}>
          <nav className="navbar navbar-dark bg-dark">
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarTogglerDemo03"
              aria-controls="navbarTogglerDemo03"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="d-flex header mx-auto">
              <h1 className="my-0">
                <Link to={"/"} className="text-white text-decoration-none">
                  HayırSever
                </Link>
              </h1>
            </div>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
              <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                <li className="nav-item">
                  <Link to={"/"} className="nav-link">
                    Ana Sayfa
                  </Link>
                </li>

                {isAdmin && (
                  <li className="nav-item">
                    <Link to={"/admin"} className="nav-link">
                      Admin Paneli
                    </Link>
                  </li>
                )}

                {currentUser ? (
                  <>
                    <li>
                      <Link to={"/profile"} className="nav-link">
                        {currentUser.Name}
                      </Link>
                    </li>

                    <li>
                      <Link to={"/posts"} className="nav-link">
                        Gönderiler
                      </Link>
                    </li>

                    <li>
                      <Link to={"/messages"} className="nav-link">
                        Mesajlar
                      </Link>
                    </li>

                    <li>
                      <Link
                        to={"/login"}
                        className="nav-link"
                        onClick={() => this.props.actions.logout()}
                      >
                        Çıkış Yap
                      </Link>
                    </li>
                    {/* <form className="form-inline my-2 my-lg-0">
                      <input
                        className="form-control mr-sm-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                      />
                      <button
                        className="btn btn-outline-success my-2 my-sm-0"
                        type="submit"
                      >
                        Ara
                      </button>
                    </form>  */}
                  </>
                ) : (
                  <>
                    <Link to={"/login"} className="nav-link">
                      Giriş Yap
                    </Link>

                    <Link to={"/register"} className="nav-link">
                      Kayıt Ol
                    </Link>
                  </>
                )}
              </ul>
              {}
            </div>
          </nav>

          <div className="container my-3">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <ProtectedRoute exact path="/profile" component={Profile} />
              <ProtectedRoute exact path="/messages" component={Message} />
              <ProtectedRoute path="/posts" component={Post} />
              <ProtectedRoute path="/user/:id" component={User} />
              <Route path="*" component={Error} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { auth } = state.authReducer;
  return {
    auth,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      logout: bindActionCreators(logoutAction, dispatch),
      clearMessage: bindActionCreators(clearMessage, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

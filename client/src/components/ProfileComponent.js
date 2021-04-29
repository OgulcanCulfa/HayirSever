import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

class Profile extends Component {
  render() {
    const { user: currentUser } = this.props;

    return (

      <div className="row py-5 px-4">
        <div className="col-md-12">
          <div className="bg-white shadow rounded overflow-hidden">
            <div className="px-4 pt-0 pb-4 cover">
              <div className="media align-items-center profile-head">
                <div className="profile mr-3">
                  <img
                    src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80"
                    alt="..."
                    width="130"
                    className="rounded mb-2 img-thumbnail"
                  />
                  <Link to="#" className="btn btn-outline-dark btn-sm btn-block">
                    Edit profile
                  </Link>
                </div>
                <div className="media-body mb-5">
                  <p className="mt-0 mb-0">{currentUser.Name} {currentUser.Surname}</p>
  
                </div>
              </div>
            </div>

            <div className="px-4 py-3">
              <h5 className="mb-0">About</h5>
              <div className="p-4 rounded shadow-sm bg-light">
                <p className="font-italic mb-0">Web Developer</p>
                <p className="font-italic mb-0">Lives in New York</p>
                <p className="font-italic mb-0">Photographer</p>
              </div>
            </div>
            <div className="py-4 px-4">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="mb-0">Recent photos</h5>
                <Link to="#" className="btn btn-link text-muted">
                  Show all
                </Link>
              </div>
              <div className="row">
                <div className="col-lg-6 mb-2 pr-lg-1">
                  <img
                    src="https://images.unsplash.com/photo-1469594292607-7bd90f8d3ba4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                    alt=""
                    className="img-fluid rounded shadow-sm"
                  />
                </div>
                <div className="col-lg-6 mb-2 pl-lg-1">
                  <img
                    src="https://images.unsplash.com/photo-1493571716545-b559a19edd14?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                    alt=""
                    className="img-fluid rounded shadow-sm"
                  />
                </div>
                <div className="col-lg-6 pr-lg-1 mb-2">
                  <img
                    src="https://images.unsplash.com/photo-1453791052107-5c843da62d97?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
                    alt=""
                    className="img-fluid rounded shadow-sm"
                  />
                </div>
                <div className="col-lg-6 pl-lg-1">
                  <img
                    src="https://images.unsplash.com/photo-1475724017904-b712052c192a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                    alt=""
                    className="img-fluid rounded shadow-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.authReducer;
  return {
    user,
  };
}

export default connect(mapStateToProps)(Profile);

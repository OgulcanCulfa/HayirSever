import React, { Component } from "react";
import { connect } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";

class Profile extends Component {
  render() {
    return (
      <div>
        <section className="pt-5"></section>
        <div className="row">
          <div className="col-md-12">
            <div className="cardbox shadow-lg bg-white">
              <img
                src={this.props.user.ProfilePhoto}
                alt=""
                class="img-thumbnail"
              />
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

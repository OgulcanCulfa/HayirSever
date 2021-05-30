import React, { Component } from "react";
import { Link } from "react-router-dom";
import alertify from "alertifyjs";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import moment from "moment";
import "moment/locale/tr";

import { getUserAction, updateUserInfoAction } from "../actions/userActions";
import { getPostsByIdAction, deletePostAction } from "../actions/postActions";
import {
  getCommentAction,
  createCommentAction,
  deleteCommentAction,
} from "../actions/commentActions";

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      toggle: false,
    };

    this.handleCreateComment = this.handleCreateComment.bind(this);
    this.handleDeletePost = this.handleDeletePost.bind(this);
    this.handleDeleteComment = this.handleDeleteComment.bind(this);
    this.handleUpdateUserInfo = this.handleUpdateUserInfo.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    this.props.actions.getUser(parseInt(this.props.auth.userId));
    this.props.actions.getPostsById(parseInt(this.props.auth.userId));
  }

  handleCreateComment(postId) {
    return (e) => {
      e.preventDefault();

      const data = new FormData(e.target);

      data.append("postId", postId);
      data.set("photo", e.target[1].files[0]);

      this.props.actions
        .createComment(data)
        .then((res) => {
          alertify.success(res.data);
          setTimeout(() => window.location.reload(), 1000);
        })
        .catch((err) => {
          alertify.error(err.response.data);
        });
      document.getElementById("commentForm").reset();
    };
  }

  handleDeletePost(postId) {
    return (e) => {
      e.preventDefault();

      this.props.actions
        .deletePost(postId)
        .then((res) => {
          alertify.success(res.data);
          this.props.actions.getPostsById(this.props.auth.userId);
        })
        .catch((err) => {
          alertify.error(err.response.data);
        });
    };
  }

  handleDeleteComment(commentId) {
    return (e) => {
      e.preventDefault();
      this.props.actions
        .deleteComment(commentId)
        .then((res) => {
          alertify.success(res.data);
          setTimeout(() => window.location.reload(), 1000);
        })
        .catch((err) => {
          alertify.error(err.response.data);
        });
    };
  }

  handleUpdateUserInfo(id) {
    return (e) => {
      e.preventDefault();

      const data = new FormData(e.target);
      data.append("id", id);
      //data.set("profilePhoto", e.target[0].files[0])
      //const plainFormData = Object.fromEntries(data.entries());
      this.props.actions
        .updateUserInfo(data)
        .then((res) => {
          alertify.success(res.data);
          setTimeout(() => window.location.reload(), 1000);
        })
        .catch((err) => {
          alertify.error(err.response.data);
        });
    };
  }

  toggle() {
    this.props.commentData
      ? this.setState((prevState) => ({
          toggle: !prevState.toggle,
        }))
      : this.setState({ toggle: false });
  }

  render() {
    const { user } = this.props;
    return (
      <div className="container">
        <div
          className="modal fade bd-example-modal-lg"
          id="editUserInfos"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="myLargeModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="card">
                <div className="card-body">
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <form
                    onSubmit={this.handleUpdateUserInfo(this.props.auth.userId)}
                    className="p-3 w-75"
                  >
                    <div className="form-group row">
                      <label htmlFor="Name" className="col-sm-2 col-form-label">
                        Ad
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          name="Name"
                          defaultValue={user.Name}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="Surname"
                        className="col-sm-2 col-form-label"
                      >
                        Soyad
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          name="Surname"
                          defaultValue={user.Surname}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="EmailAddress"
                        className="col-sm-2 col-form-label"
                      >
                        E-mail
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          name="EmailAddress"
                          defaultValue={user.EmailAddress}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="Password"
                        className="col-sm-2 col-form-label"
                      >
                        Şifre
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="password"
                          className="form-control"
                          name="Password"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="mobile"
                        className="col-sm-2 col-form-label"
                      >
                        Telefon
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          name="mobile"
                          defaultValue={user.mobile}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="address"
                        className="col-sm-2 col-form-label"
                      >
                        Adres
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          name="address"
                          defaultValue={user.address}
                        />
                      </div>
                    </div>
                    <div className="form-group-row text-center">
                      <button
                        type="submit"
                        className="btn btn-outline-success mt-3"
                      >
                        Güncelle
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade bd-example-modal-lg"
          id="editUserLinks"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="myLargeModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="card">
                <div className="card-body">
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <form
                    onSubmit={this.handleUpdateUserInfo(this.props.auth.userId)}
                    className="p-3 w-75"
                  >
                    <div className="form-group row">
                      <label
                        htmlFor="website"
                        className="col-sm-2 col-form-label"
                      >
                        Website
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          name="website"
                          defaultValue={user.website}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="github"
                        className="col-sm-2 col-form-label"
                      >
                        Github
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          name="github"
                          defaultValue={user.github}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="twitter"
                        className="col-sm-2 col-form-label"
                      >
                        Twitter
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          name="twitter"
                          defaultValue={user.twitter}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="instagram"
                        className="col-sm-2 col-form-label"
                      >
                        Instagram
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          name="instagram"
                          defaultValue={user.instagram}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="facebook"
                        className="col-sm-2 col-form-label"
                      >
                        Facebook
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          name="facebook"
                          defaultValue={user.facebook}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="kaggle"
                        className="col-sm-2 col-form-label"
                      >
                        Kaggle
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          name="kaggle"
                          defaultValue={user.kaggle}
                        />
                      </div>
                    </div>
                    <div className="form-group-row text-center">
                      <button
                        type="submit"
                        className="btn btn-outline-success mt-3"
                      >
                        Güncelle
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade bd-example-modal-lg"
          id="editPhotoArea"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="myLargeModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="card">
                <div className="card-body">
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <form
                    encType="multipart/form-data"
                    onSubmit={this.handleUpdateUserInfo(this.props.auth.userId)}
                    className="p-3 w-75"
                  >
                    <div className="form-group row">
                      <label
                        htmlFor="profilePhoto"
                        className="col-sm-2 col-form-label"
                      >
                        Profil Fotoğrafı
                      </label>
                      <div className="col-sm-10 d-flex align-items-center">
                        <input
                          type="file"
                          accept="image/*"
                          name="profilePhoto"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="department"
                        className="col-sm-2 col-form-label"
                      >
                        Bölüm
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          name="department"
                          defaultValue={user.department}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="class"
                        className="col-sm-2 col-form-label"
                      >
                        Sınıf
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="number"
                          className="form-control"
                          name="classNum"
                          defaultValue={user.classNum}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="city" className="col-sm-2 col-form-label">
                        İl
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          name="city"
                          defaultValue={user.city}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="EmailAddress"
                        className="col-sm-2 col-form-label"
                      >
                        İlçe
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          name="district"
                          defaultValue={user.district}
                        />
                      </div>
                    </div>
                    <div className="form-group-row text-center">
                      <button
                        type="submit"
                        className="btn btn-outline-success mt-3"
                      >
                        Güncelle
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="profile">
          <div className="main-body">
            <div className="row text-center">
              <div className="col-md-12 mb-3">
                <h2>Kişisel Bilgilerim</h2>
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
                            Yaşadığı Yer: {user.district + " / " + user.city}
                          </p>
                        ) : (
                          <p className="text-muted font-size-sm">
                            {" "}
                            Yaşadığı Yer:{" "}
                          </p>
                        )}
                        <button
                          className="btn btn-outline-secondary"
                          data-target="#editPhotoArea"
                          data-toggle="modal"
                        >
                          <i className="fa fa-pencil mr-2"></i>
                          Profili Düzenle
                        </button>
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
                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap mx-auto">
                      <h6 className="mb-0">
                        <button
                          className="btn btn-outline-secondary"
                          data-toggle="modal"
                          data-target="#editUserLinks"
                        >
                          <i className="fa fa-pencil mr-2"></i>
                          Linkleri Düzenle
                        </button>
                      </h6>
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
                    <div className="row">
                      <div className="col-sm-4 mt-2 mx-auto">
                        <button
                          data-target="#editUserInfos"
                          data-toggle="modal"
                          className="btn btn-outline-secondary"
                        >
                          <i className="fa fa-pencil mr-2"></i>
                          Bilgileri Düzenle
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="card border-bottom-0">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-12 text-center text-secondary ">
                        <h2>Postlarım</h2>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  {this.props.postData && (
                    this.props.postData.map((val) => (
                      <div key={val.postId} className="col-md-12">
                        <div className="card card-body mb-5">
                          <div className="p-3">
                            <div className="media m-0 d-md-flex align-items-center">
                              <div className="d-flex mr-3">
                                <Link to="#">
                                  <img
                                    className="img-fluid rounded-circle"
                                    src={val.profilePhoto}
                                    alt="User"
                                  />
                                </Link>
                              </div>

                              <div className="media-body">
                                <p className="m-0">
                                  {val.Name} {val.Surname}
                                </p>

                                <small>
                                  <span>
                                    {moment(val.postCreatedAt).fromNow()}
                                  </span>
                                </small>
                              </div>
                              {user.id === val.postUserId && (
                                <button
                                  type="button"
                                  className="close p-3"
                                  onClick={this.handleDeletePost(val.postId)}
                                >
                                  <i className="fa fa-trash"></i>
                                </button>
                              )}
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-12 d-flex align-items-center w-100 p-3">
                              <div className="text-break p-3">
                                <p id="postText" className="mb-0">
                                  {val.postText}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="cardbox-item d-flex justify-content-center my-4">
                            <img
                              alt=""
                              className="img-fluid w-75"
                              //src="https://www.telegraph.co.uk/content/dam/tv/2019/05/12/TELEMMGLPICT000195851846_trans_NvBQzQNjv4BqNrzB8hrvgfJ5sESwMmBGZOCHfpH_fyW0CNqPxWGmNfw.jpeg?imwidth=450"
                              src={val.postPhoto}
                            />
                          </div>
                          <div className="row">
                            <div className="col-md-12">
                              <div className="cardbox-base border-top-0">
                                <ul
                                  onClick={() => {
                                    if (val.countOfComments > 0) {
                                      this.props.actions.getCommentsById(
                                        val.postId
                                      );
                                      this.toggle();
                                    }
                                  }}
                                  className="float-left comments"
                                >
                                  <li>
                                    <Link to="#">
                                      <i className="fa fa-comment fa-lg"></i>
                                    </Link>
                                  </li>
                                  <li>
                                    <Link to="#">
                                      <em className="mr-5">
                                        {val.countOfComments}
                                      </em>
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          {this.state.toggle &&
                            this.props.commentData
                              .filter((c) => c.postId === val.postId)
                              .map((c) => (
                                <div key={c.id} className="row">
                                  <div className="col-md-12 mb-3 search">
                                    <div className="my-1">
                                      <div className="d-md-flex flex-column">
                                        <div className="d-flex m-3 align-items-center text-left">
                                          <span className="comment-avatar mt-1 ">
                                            <Link to="#">
                                              <img
                                                className="rounded-circle"
                                                src={c.profilePhoto}
                                                alt="..."
                                              />
                                            </Link>
                                          </span>
                                          <div className="media-body ml-2">
                                            <p className="m-0">
                                              {c.Name + " " + c.Surname}
                                            </p>
                                          </div>
                                          {user.id === c.userId && (
                                            <div className="d-flex align-items-center m-3 justify-content-left">
                                              <button
                                                type="submit"
                                                className="border-0 disable-pointer"
                                                onClick={this.handleDeleteComment(
                                                  c.id
                                                )}
                                              >
                                                <i className="fa fa-trash pointer"></i>
                                              </button>
                                            </div>
                                          )}
                                        </div>
                                        <div className="d-md-flex mr-auto m-3 align-items-center justify-content-left">
                                          <div className="text-break">
                                            <p id="area" className="mb-0">
                                              {c.text}
                                            </p>
                                          </div>
                                        </div>
                                        {c.photo === null ? (
                                          <div></div>
                                        ) : (
                                          <div className="d-md-flex align-items-center justify-content-left">
                                            <img
                                              alt=""
                                              className="img-fluid w-75"
                                              src={c.photo}
                                            ></img>
                                          </div>
                                        )}
                                        <div className="d-flex align-items-center m-3 justify-content-left time p-0">
                                          <small>
                                            <span>
                                              {moment(c.createdAt)
                                                .locale("tr")
                                                .fromNow()}
                                            </span>
                                          </small>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                          <div className="row d-flex">
                            <div className="col-md-1 d-flex align-items-center ml-3 mr-0">
                              <span className="comment-avatar float-left mt-2">
                                <Link to="#">
                                  <img
                                    className="rounded-circle"
                                    src={user.profilePhoto}
                                    alt="..."
                                  />
                                </Link>
                              </span>
                            </div>
                            <div className="col-md-10">
                              <div className="align-items-center m-3">
                                <form
                                  encType="multipart/form-data"
                                  id="commentForm"
                                  onSubmit={this.handleCreateComment(
                                    val.postId
                                  )}
                                >
                                  <div className="search text-break d-flex">
                                    <textarea
                                      placeholder="Yorum yazın"
                                      rows="1"
                                      name="text"
                                      className="w-100"
                                    />
                                    <input
                                      type="file"
                                      name="photo"
                                      accept="image/*"
                                      className="my-auto px-2 border-top-0 border-bottom-0"
                                    ></input>
                                    <button
                                      className="px-2 border-0"
                                      type="submit"
                                    >
                                      <i className="fa fa-paper-plane"></i>
                                    </button>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.userReducer;
  const { auth } = state.authReducer;
  const { postData, isFetchingPosts } = state.postReducer;
  const { commentData, isFetchingComments } = state.commentReducer;
  return {
    user,
    auth,
    postData,
    isFetchingPosts,
    isFetchingComments,
    commentData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getUser: bindActionCreators(getUserAction, dispatch),
      getPostsById: bindActionCreators(getPostsByIdAction, dispatch),
      getCommentsById: bindActionCreators(getCommentAction, dispatch),
      createComment: bindActionCreators(createCommentAction, dispatch),
      deletePost: bindActionCreators(deletePostAction, dispatch),
      deleteComment: bindActionCreators(deleteCommentAction, dispatch),
      updateUserInfo: bindActionCreators(updateUserInfoAction, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

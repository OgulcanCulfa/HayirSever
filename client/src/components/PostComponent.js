import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  getPostAction,
  createPostAction,
  deletePostAction,
} from "../actions/postActions";
import {
  getCommentAction,
  createCommentAction,
  deleteCommentAction,
} from "../actions/commentActions";
import { getUserAction } from "../actions/userActions";
import { getCategoriesAction } from "../actions/categoryAction";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import alertify from "alertifyjs";
import moment from "moment";
import "moment/locale/tr";

class PostComponent extends Component {
  constructor() {
    super();
    this.handleCreatePost = this.handleCreatePost.bind(this);
    this.handleCreateComment = this.handleCreateComment.bind(this);
    this.handleDeletePost = this.handleDeletePost.bind(this);
    this.handleDeleteComment = this.handleDeleteComment.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
    this.handleSum = this.handleSum.bind(this);
    this.toggle = this.toggle.bind(this);

    this.state = {
      toggle: false,
      active: false,
      activeIndex: Number,
    };
  }
  componentDidMount() {
    this.props.actions.getUser(parseInt(this.props.auth.userId));
    this.props.actions.getPosts();
    this.props.actions.getCategories();
  }

  handleCreatePost(e) {
    e.preventDefault();
    debugger;
    const data = new FormData();
    data.append("text", e.target[0].value);
    data.append("postphoto", e.target[1].files[0]);
    data.append("categoryId", parseInt(e.target[2].value));
    this.props.actions
      .createPost(data)
      .then((res) => {
        this.props.actions.getPosts();
        this.props.actions.getCategories();
        alertify.success(res.data);
      })
      .catch((err) => {
        this.props.actions.getPosts();
        alertify.error(err.response.data);
      });
    document.getElementById("postForm").reset();
  }

  handleCreateComment(postId) {
    return (e) => {
      debugger;
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
          this.props.actions.getPosts();
          this.props.actions.getCategories();
          alertify.success(res.data);
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

  handleCategory(categoryId) {
    this.props.actions.getPosts(categoryId);
    return (e) => {
      e.preventDefault();
    };
  }

  handleSum(key, array) {
    return array.reduce((a, b) => a + (b[key] || 0), 0);
  }

  toggle() {
    this.props.commentData
      ? this.setState((prevState) => ({
          toggle: !prevState.toggle,
        }))
      : this.setState({ toggle: false });
  }

  render() {
    if (this.props.isFetchingPosts)
      return (
        <div className="d-flex mt-5">
          <div className="spinner-border mx-auto" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    return (
      <div>
        <section className="hero">
          <div className="row">
            <div className="col-md-12">
              <div className="cardbox shadow-lg bg-white">
                <div className="card-body">
                  <form
                    id="postForm"
                    encType="multipart/form-data"
                    onSubmit={this.handleCreatePost}
                  >
                    <div className="form-group search">
                      <div className="row ">
                        <div className="col-md-12 d-md-flex ">
                          <textarea
                            className="form-control"
                            id="text"
                            name="text"
                            rows="5"
                            placeholder="İhtiyaçlarınızı yazınız"
                          ></textarea>
                        </div>
                        <div className="col-md-12 icon-border bottom-border border-md-bottom border-md-right d-md-flex align-items-center mt-2">
                          <input
                            type="file"
                            name="postphoto"
                            accept="image/*"
                            className="border-0 disable-pointer p-2"
                          >
                            {/* <i className="fa fa-camera pointer"></i> */}
                          </input>
                          <div className="form-group mb-0 icon-border top-border bottom-border right-border border-md-bottom border-md-left border-md-right p-2">
                            <label htmlFor="categorySelect">
                              Kategori Seçiniz:
                            </label>
                            <select
                              className="form-control"
                              id="categorySelect"
                            >
                              {this.props.categories &&
                                this.props.categories.map((ct) => (
                                  <option value={ct.id} key={ct.id}>
                                    {ct.categoryName}
                                  </option>
                                ))}
                            </select>
                          </div>
                          <div className="form-group d-md-flex mb-0 icon-border height top-border bottom-border border-md-right border-md-left border-md-bottom p-2">
                            <button
                              className="border-0 disable-pointer d-md-flex"
                              type="submit"
                            >
                              <i className="fa fa-paper-plane pointer d-md-flex"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="row stick">
            <div
              className="col-md-3 my-3 sticky-item
            "
            >
              <ul className="list-group">
                <li className="list-group-item text-center">
                  <h4>Kategoriler</h4>
                </li>
                <li
                  onClick={() => {
                    this.props.actions.getPosts();
                    this.setState({
                      activeIndex: 10000,
                      active: true,
                    });
                  }}
                  key="10000"
                  className={
                    this.state.activeIndex === 10000
                      ? "list-group-item active pointer"
                      : "list-group-item pointer"
                  }
                >
                  Hepsi
                  <span className="badge badge-dark float-right">
                    {this.handleSum("countOfCategories", this.props.categories)}
                  </span>
                </li>
                {this.props.categories &&
                  this.props.categories.map((ct) => (
                    <li
                      onClick={() => {
                        this.handleCategory(ct.id);
                        this.setState({
                          activeIndex: ct.id,
                          active: true,
                        });
                      }}
                      key={ct.id}
                      className={
                        ct.id === this.state.activeIndex
                          ? "list-group-item pointer active"
                          : "list-group-item pointer"
                      }
                    >
                      {ct.categoryName}
                      <span className="badge badge-dark float-right">
                        {ct.countOfCategories}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="col-md-9 my-3">
              {this.props.postData &&
                this.props.postData.map((val) => (
                  <div key={val.postId} className="cardbox shadow-lg bg-white">
                    <div className="p-3">
                      <div className="media m-0 d-md-flex align-items-center">
                        <div className="d-flex mr-3">
                          <Link to={"/user/" + val.postUserId}>
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
                            <span>{moment(val.postCreatedAt).fromNow()}</span>
                          </small>
                          <br />
                          <small>
                            <span>{"Kategori: " + val.categoryName}</span>
                          </small>
                        </div>
                        {(this.props.user.id === val.postUserId ||
                          this.props.auth.UserTypeName === "Root") && (
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

                    {val.postPhoto === null ? (
                      <div></div>
                    ) : (
                      <div className="cardbox-item d-flex justify-content-center my-4">
                        <img
                          alt=""
                          width="650"
                          height="650"
                          className="img-fluid"
                          //src="https://www.telegraph.co.uk/content/dam/tv/2019/05/12/TELEMMGLPICT000195851846_trans_NvBQzQNjv4BqNrzB8hrvgfJ5sESwMmBGZOCHfpH_fyW0CNqPxWGmNfw.jpeg?imwidth=450"
                          src={val.postPhoto}
                        />
                      </div>
                    )}

                    <div className="row">
                      <div className="col-md-12">
                        <div className="cardbox-base border-top-0">
                          <ul
                            onClick={() => {
                              if (val.countOfComments > 0) {
                                this.props.actions.getCommentsById(val.postId);
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
                                <em className="mr-5">{val.countOfComments}</em>
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
                          <div key={c.id} className="row mx-0">
                            <div className="col-md-12 mb-3 search">
                              <div className="my-1">
                                <div className="d-md-flex flex-column">
                                  <div className="d-flex m-3 align-items-center text-left">
                                    <span className="comment-avatar mt-1 ">
                                      <Link to={"/user/" + c.userId}>
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
                                    {(this.props.auth.userId === c.userId ||
                                      this.props.auth.UserTypeName ===
                                        "Root") && (
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
                                        width="300"
                                        height="250"
                                        className="img-fluid"
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
                      <div className="col-md-1 align-items-center ml-3 mr-0 d-flex">
                        <span className="comment-avatar float-left mt-2">
                          <Link to={"/user/" + this.props.user.id}>
                            <img
                              className="rounded-circle d-flex"
                              src={this.props.user.profilePhoto}
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
                            onSubmit={this.handleCreateComment(val.postId)}
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
                              >
                                {/* <i className="fa fa-camera"></i> */}
                              </input>
                              <button className="px-2 border-0" type="submit">
                                <i className="fa fa-paper-plane"></i>
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { postData, isFetchingPosts } = state.postReducer;
  const { commentData, isFetchingComments } = state.commentReducer;
  const { auth } = state.authReducer;
  const { user } = state.userReducer;
  const { categories } = state.categoryReducer;
  return {
    user,
    auth,
    postData,
    isFetchingPosts,
    isFetchingComments,
    commentData,
    categories,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getUser: bindActionCreators(getUserAction, dispatch),
      getPosts: bindActionCreators(getPostAction, dispatch),
      getCommentsById: bindActionCreators(getCommentAction, dispatch),
      getCategories: bindActionCreators(getCategoriesAction, dispatch),
      createPost: bindActionCreators(createPostAction, dispatch),
      createComment: bindActionCreators(createCommentAction, dispatch),
      deletePost: bindActionCreators(deletePostAction, dispatch),
      deleteComment: bindActionCreators(deleteCommentAction, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostComponent);

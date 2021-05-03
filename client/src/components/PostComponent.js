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
  }
  componentDidMount() {
    this.props.actions.getPosts();
  }

  handleCreatePost(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("text", e.target[0].value);
    data.append("postphoto", e.target[1].files[0]);
    this.props.actions
      .createPost(data)
      .then((res) => {
        this.props.actions.getPosts();
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
      e.preventDefault();

      const data = new FormData(e.target);

      data.append("postId", postId);

      const plainFormData = Object.fromEntries(data.entries());
      this.props.actions
        .createComment(plainFormData)
        .then((res) => {
          alertify.success(res.data);
          setTimeout(() => window.location.reload(),2000)
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
          alertify.success(res.data);
        })
        .catch((err) => {
          alertify.error(err.response.data);
        });
    };
  }

  handleDeleteComment(commentId) {
    return (e) => {
      debugger;
      e.preventDefault();

      this.props.actions
        .deleteComment(commentId)
        .then((res) => {
          alertify.success(res.data);
          setTimeout(() => window.location.reload(),2000)
        })
        .catch((err) => {
          alertify.error(err.response.data);
        });
    };
  }

  render() {
    if (this.props.isFetchingPosts)
      return (
        <div className="d-flex justify-content-center mt-5">
          <div className="spinner-border" role="status">
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
                            rows="3"
                            placeholder="İhtiyaçlarınızı yazınız"
                          ></textarea>
                        </div>
                        <div className="col-md-12 icon-border border-bottom-0 border-right-0  d-flex align-items-center mt-2">
                          <input
                            type="file"
                            name="postphoto"
                            accept="image/*"
                            className="border-0 disable-pointer p-3"
                          >
                            {/* <i className="fa fa-camera pointer"></i> */}
                          </input>
                          <button
                            className="border-top-0 border-bottom-0 disable-pointer p-3"
                            type="submit"
                          >
                            <i className="fa fa-paper-plane pointer"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            {this.props.postData &&
              this.props.postData.map((val) => (
                <div key={val.postId} className="col-md-12">
                  <div className="cardbox shadow-lg bg-white">
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
                              {val.district} / {val.city}
                            </span>
                          </small>
                          <small>
                            <span>{moment(val.postCreatedAt).fromNow()}</span>
                          </small>
                        </div>
                        {this.props.user.userId === val.postUserId && (
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
                              val.countOfComments > 0 &&
                                this.props.actions.getCommentsById(val.postId);
                            }}
                            className="float-left comments"
                          >
                            <li>
                              <Link to="#">
                                <i className="fa fa-comments fa-lg"></i>
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
                    {this.props.commentData &&
                      this.props.commentData
                        .filter((c) => c.postId === val.postId)
                        .map((c) => (
                          <div key={c.id} className="row">
                            <div className="col-md-12 mb-3 search">
                              <div className="my-1">
                                <div className="d-md-flex flex-row">
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
                                  </div>
                                  <div className="d-md-flex mr-auto m-3 align-items-center justify-content-left">
                                    <div className="text-break">
                                      <p id="area" className="mb-0">
                                        {c.text}
                                      </p>
                                    </div>
                                  </div>
                                  {this.props.user.userId === c.userId && (
                                    <div className="d-flex align-items-center m-3 justify-content-left">
                                      <button
                                        type="submit"
                                        className="border-0 disable-pointer"
                                        onClick={this.handleDeleteComment(c.id)}
                                      >
                                        <i className="fa fa-trash pointer"></i>
                                      </button>
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
                    <div className="row">
                      <div className="col-md-auto d-flex flex-row align-items-center ml-3 mr-0">
                        <span className="comment-avatar float-left mt-2">
                          <Link to="#">
                            <img
                              className="rounded-circle"
                              src={this.props.user.ProfilePhoto}
                              alt="..."
                            />
                          </Link>
                        </span>
                      </div>
                      <div className="col-md-auto d-md-flex">
                        <div className="d-md-flex align-items-center m-3">
                          <form
                            id="commentForm"
                            
                            onSubmit={this.handleCreateComment(val.postId)}
                          >
                            <div className="search text-break d-flex flex-row">
                              <textarea
                                placeholder="Yorum yazın"
                                rows="1"
                                name="text"
                                className="w-100"
                              />
                              <input
                                type="file"
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
                </div>
              ))}
          </div>
        </section>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { postData, isFetchingPosts } = state.postReducer;
  const { commentData, isFetchingComments } = state.commentReducer;
  const { user } = state.authReducer;
  return {
    postData,
    isFetchingPosts,
    isFetchingComments,
    commentData,
    user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getPosts: bindActionCreators(getPostAction, dispatch),
      getCommentsById: bindActionCreators(getCommentAction, dispatch),
      createPost: bindActionCreators(createPostAction, dispatch),
      createComment: bindActionCreators(createCommentAction, dispatch),
      deletePost: bindActionCreators(deletePostAction, dispatch),
      deleteComment: bindActionCreators(deleteCommentAction, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostComponent);

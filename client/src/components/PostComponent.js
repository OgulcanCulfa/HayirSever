import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getPostAction, createPostAction } from "../actions/postActions";
import {
  getCommentAction,
  createCommentAction,
} from "../actions/commentActions";
import { clearMessage } from "../actions/messages";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import alertify from "alertifyjs";
import moment from "moment";
import 'moment/locale/tr';

class PostComponent extends Component {
  constructor() {
    super();
    this.handlePostSubmit = this.handlePostSubmit.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
  }
  componentDidMount() {
    this.props.actions.getPosts();
  }

  handlePostSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const plainFormData = Object.fromEntries(data.entries());
    this.props.actions.createPost(plainFormData);
    document.getElementById("postForm").reset();
  }

  handleCommentSubmit(postId) {
    return (e) => {
      e.preventDefault();
      const data = new FormData(e.target);
      data.append("postId", postId);
      const plainFormData = Object.fromEntries(data.entries());
      this.props.actions.createComment(plainFormData);
      document.getElementById("commentForm").reset();
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
    this.props.postMsg && alertify.error(this.props.postMsg);
    this.props.commentMsg && alertify.error(this.props.commentMsg);
    this.props.commentSuccessMsg &&
      alertify.success(this.props.commentSuccessMsg);
    return (
      <div>
        <section className="hero">
          <div className="row">
            <div className="col-md-12">
              <div className="cardbox shadow-lg bg-white">
                <div className="card-body">
                  <form id="postForm" onSubmit={this.handlePostSubmit}>
                    <div className="form-group search">
                      <div className="row ">
                        <div className="col-md-12 d-md-flex ">
                          <textarea
                            className="form-control"
                            name="text"
                            rows="3"
                            placeholder="What are you thinking?"
                          ></textarea>
                        </div>
                        <div className="col-md-12 icon-border border-bottom-0 border-right-0  d-flex align-items-center mt-2">
                          <button
                            className="border-0 disable-pointer p-3"
                            type="submit"
                          >
                            <i className="fa fa-camera pointer"></i>
                          </button>
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
                    <div className="cardbox-heading">
                      <div className="media m-0 d-md-flex align-items-center">
                        <div className="d-flex mr-3">
                          <Link to="#">
                            <img
                              className="img-fluid rounded-circle"
                              src="http://www.themashabrand.com/templates/bootsnipp/post/assets/img/users/4.jpg"
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
                              {val.district} {val.city}
                            </span>
                          </small>
                          <small>
                            <span>{moment(val.postCreatedAt).fromNow()}</span>
                          </small>
                        </div>
                        {this.props.user.userId === val.postUserId && (
                          <button
                            type="button"
                            class="close"
                            aria-label="Close"
                          >
                            <i class="fa fa-trash p-3"></i>
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-12 d-flex align-items-center w-100">
                        <div className="text-break p-3">
                          <p id="postText" class="mb-0">
                            {val.postText}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="cardbox-item d-flex justify-content-center my-5">
                      <img
                        className="img-fluid"
                        src="https://www.telegraph.co.uk/content/dam/tv/2019/05/12/TELEMMGLPICT000195851846_trans_NvBQzQNjv4BqNrzB8hrvgfJ5sESwMmBGZOCHfpH_fyW0CNqPxWGmNfw.jpeg?imwidth=450"
                        alt="resim yok"
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
                                  <div className="col-md-auto d-flex align-items-center text-left mb-3 mb-md-0">
                                    <span className="comment-avatar mt-1 ">
                                      <Link to="#">
                                        <img
                                          className="rounded-circle"
                                          src="http://www.themashabrand.com/templates/bootsnipp/post/assets/img/users/6.jpg"
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
                                  <div className="col-md-8 d-md-flex align-items-center justify-content-left">
                                    <div className="text-break">
                                      <p id="area" className="mb-0">
                                        {c.text}
                                      </p>
                                    </div>
                                  </div>
                                  {this.props.user.userId === c.userId && (
                                    <div className="col-md-auto d-flex align-items-center justify-content-left">
                                      <button
                                        type="button"
                                        className="border-0 disable-pointer"
                                      >
                                        <i class="fa fa-trash pointer"></i>
                                      </button>
                                    </div>
                                  )}
                                  <div className="col-md-auto d-flex align-items-center justify-content-left time p-0">
                                    <small><span>{moment(c.createdAt).locale("tr").fromNow()}</span></small>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    <div className="row">
                      <div className="col-md-12 d-md-flex my-4">
                        <div className="col-md-auto d-flex flex-row align-items-center mb-3 mb-md-0">
                          <span className="comment-avatar float-left mt-2">
                            <Link to="#">
                              <img
                                className="rounded-circle"
                                src="http://www.themashabrand.com/templates/bootsnipp/post/assets/img/users/6.jpg"
                                alt="..."
                              />
                            </Link>
                          </span>
                        </div>
                        <div className="col-md-8 d-flex align-items-center">
                          <form
                            id="commentForm"
                            onSubmit={this.handleCommentSubmit(val.postId)}
                          >
                            <div className="search text-break d-flex flex-row">
                              <textarea
                                placeholder="Write a comment"
                                rows="1"
                                name="text"
                              />
                              <button className="px-2 border-top-0 border-bottom-0">
                                <i className="fa fa-camera"></i>
                              </button>
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
  const { message } = state.messageReducer;
  const { postData, postMsg, isFetchingPosts } = state.postReducer;
  const {
    commentData,
    commentMsg,
    isFetchingComments,
    commentSuccessMsg,
  } = state.commentReducer;
  const { user } = state.authReducer;
  return {
    message,
    postData,
    postMsg,
    isFetchingPosts,
    isFetchingComments,
    commentData,
    commentMsg,
    commentSuccessMsg,
    user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getPosts: bindActionCreators(getPostAction, dispatch),
      createPost: bindActionCreators(createPostAction, dispatch),
      getCommentsById: bindActionCreators(getCommentAction, dispatch),
      createComment: bindActionCreators(createCommentAction, dispatch),
      clearMessage: bindActionCreators(clearMessage, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostComponent);

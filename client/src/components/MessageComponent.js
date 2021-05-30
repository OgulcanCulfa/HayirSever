import React, { Component } from "react";
import { socket } from "../utils/socketInstance";
import moment from "moment";
import "moment/locale/tr";
import { getChatUserAction } from "../actions/userActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import alertify from "alertifyjs";

class MessageComponent extends Component {
  constructor() {
    super();
    this.socket = null;
    this.state = {
      messages: [],
      online: [],
      receiver: null,
      x: null,
      activeIndex: Number,
    };
  }

  componentDidMount() {
    this.props.actions.getChatUsers();

    this.socket = socket(this.props.auth.userId);

    this.socket.once("online", (data) => {
      if (!data.result) {
        alertify.error("Mesajlaşmaya bağlanamadınız. Lütfen tekrar deneyin.");
      } else {
        this.props.actions.getChatUsers();
      }
    });

    this.socket.once("getChatUser", () => {
      this.props.actions.getChatUsers();
    });

    this.socket.on("getMessages", (data) => {
      this.props.actions.getChatUsers();
      this.setState({ messages: data });
    });
    this.socket.on("successOrFail", (data) => {
      if (!data) {
        alertify.error("Mesaj gönderilemedi. Lütfen tekrar deneyiniz.");
      }
    });
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  getMessages = (senderId, receiverId) => {
    this.socket.emit("joinPrivate", {
      senderId,
      receiverId,
    });
    this.socket.emit("getMessages", {
      senderId,
      receiverId,
    });
  };

  sendMessage = (senderId, receiverId) => {
    return (e) => {
      e.preventDefault();
      const message = e.target[0].value;
      if (message.length === 0) {
        alertify.error("Boş mesaj gönderemezsiniz");
      } else {
        this.socket.emit("sendMessage", {
          senderId,
          receiverId,
          message: message,
        });
        this.props.actions.getChatUsers();
        this.socket.emit("getMessages", { senderId, receiverId });
        document.getElementById("chatForm").reset();
      }
    };
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h3 className="text-center mt-5 mb-4">Mesajlaşma</h3>
          </div>
          <div className="col-md-4 col-12">
            <div className="messaging">
              <div className="inbox_msg">
                <div className="inbox_people">
                  <div className="headind_srch">
                    <div className="recent_heading">
                      <h4>Mesaj Yaz</h4>
                    </div>
                  </div>
                  <div className="inbox_chat">
                    {this.props.chatUser &&
                      this.props.chatUser.map((cu) =>
                        cu.id === this.props.auth.userId ? (
                          <div></div>
                        ) : (
                          <div
                            key={cu.id}
                            className={
                              cu.id === this.state.activeIndex
                                ? "chat_list pointer bg-primary text-white"
                                : "chat_list pointer"
                            }
                          >
                            <div
                              onClick={async () => {
                                this.setState({
                                  receiver: cu,
                                  activeIndex: cu.id,
                                });
                                this.getMessages(this.props.auth.userId, cu.id);
                              }}
                              className="chat_people d-flex align-items-center"
                            >
                              <div className="chat_img">
                                {" "}
                                <img
                                  className=" w-100"
                                  src={cu.profilePhoto}
                                  alt=""
                                />{" "}
                              </div>
                              <div className="chat_ib">
                                <h5>
                                  {cu.Name} {cu.Surname}{" "}
                                </h5>
                              </div>
                              {cu.isOnline ? (
                                <small className="float-right d-flex align-items-center">
                                  <i className="fa fa-circle fa-xs text-success mr-2"></i>
                                </small>
                              ) : (
                                <small className="float-right d-flex align-items-center">
                                  <i className="fa fa-circle fa-xs text-secondary mr-2"></i>
                                </small>
                              )}
                            </div>
                          </div>
                        )
                      )}
                  </div>{" "}
                </div>
              </div>{" "}
            </div>{" "}
          </div>
          {this.state.receiver ? (
            <div className="col-md-8 col-12">
              <div className="mesgs">
                <div className="msg_history">
                  {this.state.messages.length === 0 && (
                    <h3 className="text-center">Mesaj başlatın</h3>
                  )}
                  {this.state.messages.map((m) => (
                    <div>
                      {this.props.auth.userId === m.receiverId ? (
                        <div className="row">
                          <div className="col-md-12">
                            <div
                              key={m.id}
                              className="incoming_msg float-right"
                            >
                              <div className="received_msg">
                                <div className="received_withd_msg">
                                  <p>{m.message}</p>
                                  <span className="time_date">
                                    {moment(m.createdAt).fromNow()} |{" "}
                                    {moment(m.createdAt).format("MMMM")}{" "}
                                    {moment(m.createdAt).date()}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="row">
                          <div className="col-md-12">
                            <div key={m.id} className="outgoing_msg">
                              <div className="sent_msg">
                                <p>{m.message}</p>
                                <span className="time_date">
                                  {moment(m.createdAt).fromNow()} |{" "}
                                  {moment(m.createdAt).format("MMMM")}{" "}
                                  {moment(m.createdAt).date()}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="type_msg">
                  <div className="input_msg_write">
                    <form
                      id="chatForm"
                      onSubmit={this.sendMessage(
                        this.props.auth.userId,
                        this.state.receiver.id
                      )}
                    >
                      <input
                        type="text"
                        name="message"
                        className="write_msg"
                        placeholder="Mesaj yazın"
                      />
                      <button className="msg_send_btn" type="submit">
                        <i
                          className="fa fa-paper-plane-o"
                          aria-hidden="true"
                        ></i>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}{" "}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { auth } = state.authReducer;
  const { user, chatUser } = state.userReducer;
  return {
    auth,
    user,
    chatUser,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getChatUsers: bindActionCreators(getChatUserAction, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageComponent);

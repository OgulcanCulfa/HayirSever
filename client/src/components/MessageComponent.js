import React, { Component } from "react";
import socketIOClient from "socket.io-client";
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
      api: "http://localhost:5000",
      messages: [],
      receiver: null,
    };
  }

  componentDidMount() {
    this.props.actions.getChatUsers();
    const socket = socketIOClient(this.state.api, {
      query: {
        userId: this.props.auth.userId,
      },
    });
    this.socket = socket;

    this.socket.on("isOnline", (data) => {
      if (!data.bool) {
        console.log("Offline. id:", data.id);
      } else {
        console.log("Bağlandı. id:", data.id);
      }
    });

    this.socket.on("getMessages", (data) => {
      this.props.actions.getChatUsers();
      this.setState({ messages: data });
      console.log(this.state.messages);
    });
    this.socket.on("successOrFail", (data) => {
      if (!data) {
        alertify.error("Mesaj gönderilemedi. Lütfen tekrar deneyiniz.");
      }
    });
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
      this.socket.emit("sendMessage", {
        senderId,
        receiverId,
        message: e.target[0].value,
      });
      this.props.actions.getChatUsers();
      this.getMessages(senderId, receiverId);
      document.getElementById("chatForm").reset();
    };
  };

  render() {
    return (
      <div>
        <h3 className="text-center mt-5 mb-4">Mesajlaşma</h3>
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
                      <div key={cu.id} className="chat_list pointer">
                        <div className="chat_people d-flex align-items-center">
                          <div className="chat_img">
                            {" "}
                            <img
                              className=" w-100"
                              src={cu.profilePhoto}
                              alt=""
                            />{" "}
                          </div>
                          <div className="chat_ib">
                            <h5
                              onClick={async () => {
                                await this.setState({ receiver: cu });
                                this.getMessages(this.props.auth.userId, cu.id);
                              }}
                            >
                              {cu.Name} {cu.Surname}{" "}
                            </h5>
                          </div>
                        </div>
                      </div>
                    )
                  )}
              </div>
            </div>
            {this.state.receiver ? (
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
            ) : (
              <div></div>
            )}
          </div>
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

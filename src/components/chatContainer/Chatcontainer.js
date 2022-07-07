import React, { useRef, useState } from "react";
import ChatInput from "../chatInput/ChatInput";
import axios from "axios";
import { useEffect, usetState } from "react";
import { v4 as uuidv4 } from "uuid";

const Chatcontainer = ({ currentChat, personId, personName, socket }) => {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentUserAvatar, setCurrentUserAvatar] = useState("");
  const [anotherUserAvatar, setAnotherUserAvatar] = useState("");
  const scrollRef = useRef();
  console.log(currentChat);
  const getallmessageHnadler = () => {
    socket.current.emit("get-all-msg", {
      fromUser: personId,
      to: currentChat._id,
    });
    socket.current.on("projectMessages", (data) => {
      setMessages(data);
    });
  };
  useEffect(() => {
    if (currentChat) {
      getallmessageHnadler();
    }
  }, [currentChat]);

  const handleSendMessage = async (msg) => {
    console.log(personId, "personId");
    console.log(currentChat._id, "currentChatid");
    console.log(msg, "message");
    socket.current.on("usersAvatar", (users) => {
      console.log(users, "users");
      let currentUser = users[0].avatar_url;
      let anotherUser = users[1].avatar_url;
      console.log(currentUser, "current");
      setCurrentUserAvatar(currentUser);
      setAnotherUserAvatar(anotherUser);
    });
    const test = typeof msg;
    console.log(test);
    if (currentChat) {
      socket.current.emit("send-msg", {
        fromUser: personId,
        to: currentChat._id,
        contentType: test,
        message: msg,
      });
      const msgs = [...messages];
      console.log(msgs, "fdfd");

      msgs.push({ fromSelf: true, message: msg });
      setMessages(msgs);
    }
  };
  useEffect(() => {
    console.log("socket current", socket.current);
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
        console.log("fgsfsd");
      });
    }
  });

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="user-detail">
          <div className="username">
            <h3>{currentChat.first_name}</h3>
          </div>
        </div>
      </div>
      <div className="messages-container">
        {messages.map((message) => (
          <div
            className="message-inner-container"
            ref={scrollRef}
            key={uuidv4()}
          >
            <div
              className={`message ${message.fromSelf ? "sended" : "recieved"}`}
            >
              <div className="content-names">
                {message.fromSelf ? (
                  <img
                    className="current-user-avatar"
                    src={currentUserAvatar}
                  />
                ) : (
                  <img
                    className="another-user-avatar"
                    src={anotherUserAvatar}
                  />
                )}
                <div className="content">
                  {" "}
                  {message.message.length > 400 ? (
                    <img src={message.message} />
                  ) : (
                    <span>{message.message}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <ChatInput handleSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default Chatcontainer;
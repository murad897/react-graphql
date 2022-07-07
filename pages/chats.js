import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Contacts from "../src/components/contacts/Contacts";
import Chatcontainer from "../src/components/chatContainer/Chatcontainer";
import { io } from "socket.io-client";

const chats = () => {
  const socket = useRef();
  const [token, setToken] = useState("");
  const [contacts, setContacts] = useState([]);
  const [personName, setPesronName] = useState(undefined);
  const [currentChat, setCurrentChat] = useState("");
  const [personId, setPersonId] = useState("");
  useEffect(() => {
    setToken(localStorage.getItem("token"));
    console.log(token);
    if (token) {
      axios
        .post(`http://localhost:3007/user/getUser`, {
          token: token,
        })
        .then((res) => {
          const person = res.data.user._id;
          setPersonId(person);
          setPesronName(res.data.user.first_name);
          axios
            .get(`http://localhost:3007/user//allUsers/${person}`)
            .then((res) => {
              let data = res.data.users;
              setContacts(data);
              console.log(data);
            });
          console.log(person, "token success");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("empty token");
    }
  }, [token]);

  useEffect(() => {
    if (personId) {
      socket.current = io("http://localhost:3007");
      socket.current.emit("add-user", personId);
    }
  }, [personId]);
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  console.log(currentChat);
  return (
    <div>
      {token ? (
        <div className="main-chat-container">
          <div className="inner-chat-container">
            <Contacts
              contacts={contacts}
              personName={personName}
              changeChat={handleChatChange}
              socket={socket}
            />
            <Chatcontainer
              currentChat={currentChat}
              personId={personId}
              personName={personName}
              socket={socket}
            />
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default chats;
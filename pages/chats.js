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
  }, [token]);

  useEffect(() => {
    if (personId) {
      socket.current = io("http://localhost:3001");
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

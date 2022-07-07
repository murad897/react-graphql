import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Popover from "@mui/material/Popover";

const Contacts = ({
  contacts,
  personName,
  changeChat,
  currentUser,
  socket,
}) => {
  const [token, setToken] = useState("");
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [currrentuserName, setCurrrentUserName] = useState(undefined);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const sendImage = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      let selectedFile = document.getElementById("img").files[0];
      data.append("inputname", selectedFile);
      console.log(selectedFile);
      const res = await axios.post(
        `http://localhost:3007/user/uploadImage`,
        selectedFile,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const changeCurrrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <div className="main-contacts">
      <div className="contacts">
        {contacts.map((contact, index) => {
          return (
            <div
              className={`contact ${
                index === currentSelected ? "selected" : ""
              }`}
              key={index}
              onClick={() => changeCurrrentChat(index, contact)}
            >
              <div className="userName">
                <h3>{contact.first_name}</h3>
              </div>
            </div>
          );
        })}
      </div>
      <div className="current-user">
        <p>{personName}</p>
        <button className="edit-button" onClick={handleClick}>
          edit
        </button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <form onSubmit={sendImage} encType="multipart/form-data">
            edit pic: <input type="file" id="img" name="img" accept="image/*" />
            <input type="submit" />
          </form>
        </Popover>
      </div>
    </div>
  );
};

export default Contacts;
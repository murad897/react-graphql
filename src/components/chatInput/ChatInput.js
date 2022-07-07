import React from "react";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import ImageIcon from "@mui/icons-material/Image";
import { useState } from "react";
import FileBase64 from "react-file-base64";
import { useRef } from "react";

const ChatInput = ({ handleSendMessage }) => {
  const [msg, setmsg] = useState("");
  const inputEl = useRef();
  const ref = useRef();
  const [files, setFiles] = useState("");

  const resetFunction = () => {
    return (
      <div>
        <FileBase64
          ref={ref}
          multiple={false}
          onDone={({ base64 }) => setFiles(base64)}
        />
      </div>
    );
  };

  const sendChat = (e) => {
    e.preventDefault();
    if (msg.length > 0 && msg.length < 400) {
      handleSendMessage(msg);
      setmsg("");
    } else {
      handleSendMessage(files);
      setFiles("");
    }
  };

  console.log(files);
  return (
    <div className="chat-input-container">
      <div className="input-inner-container">
        <div className="image-upload-icon"></div>
        <form className="input-container" onSubmit={(e) => sendChat(e)}>
          <TextField
            hiddenLabel
            id="filled-hidden-label-small"
            variant="filled"
            size="small"
            value={msg}
            onChange={(e) => setmsg(e.target.value)}
          />
          <div className="upload-image-icon" ref={inputEl}>
            {resetFunction()}
            {/*<ImageIcon className="image-icon" /> */}
          </div>
          <Button
            className="send-button"
            variant="contained"
            endIcon={<SendIcon />}
            onClick={(e) => sendChat(e)}
          >
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatInput;

import React from "react";
import Main from "../src/components/main/Main";
import Login from "./login";
import Chats from "./chats";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const index = () => {
  const [token, setToken] = useState("");
  const [success, setSuccess] = useState("");
  console.log(token);
  useEffect(() => {
    setToken(localStorage.getItem("token"));
    console.log(token);
    if (token) {
      axios
        .post(`http://localhost:3007/user/getUser`, {
          token: token,
        })
        .then((res) => {
          const person = res;
          setSuccess(person.data.isToken);
          console.log(person, "token success");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("empty token");
    }
  }, [token]);

  

  return (
    <div>
      {success ? (
        <Link href="http://localhost:3000/">
          <Main />
        </Link>
      ) : (
        <Link href="http://localhost:3000/login">
          <Login />
        </Link>
      )}
    </div>
  );
};

export default index;
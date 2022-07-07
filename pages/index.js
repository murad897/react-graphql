import React from "react";
import Main from "../src/components/main/Main";
import Login from "./login";
import Chats from "./chats";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { GET_USER } from "../src/queries/User";
import { useQuery } from "@apollo/client";

const index = () => {
  const [token, setToken] = useState("");
  const [success, setSuccess] = useState("");
  const { data, loading, error } = useQuery(GET_USER, {
    variables: {
      token,
    },
  });

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    if (token) {
      setSuccess(true);
    } else {
      console.log("token is emty");
    }
  }, [token]);
  console.log(data, "getUser");

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

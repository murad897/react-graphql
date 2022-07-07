import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginEvent = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:3007/user/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        const persons = res;
        router.push("/");
        console.log(persons.data.token, "yfjfjgf");
        localStorage.setItem("token", persons.data.token);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <form className="login-form">
        <div className="login-title">Login</div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="login-buttons">
          <div className="form-group buttons" onClick={loginEvent}>
            <Link
              href="/login"
              type="submit"
              className="register-button btn btn-primary"
            >
              login
            </Link>
          </div>
          <div className="form-group buttons">
            <Link
              href="/register"
              type="submit"
              className="register-button btn btn-primary"
            >
              register
            </Link>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;

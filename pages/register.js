import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const Register = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:3007/user/register`, {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
      })
      .then((res) => {
        const persons = res;
        router.push("/login");
        console.log(persons, "yfjfjgf");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <form className="register-form">
        <div className="register-title">register</div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">first name</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">last name</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            value={lastName}
            onChange={(e) => setlastName(e.target.value)}
          />
        </div>
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
        <div className="form-group ">
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
        <div className="register-buttons">
          <div className="form-group buttons" onClick={registerSubmitHandler}>
            <Link
              href="/register"
              type="submit"
              className="register-button btn btn-primary"
            >
              register
            </Link>
          </div>
          <div className="form-group">
            <Link href="/login" type="submit" className=" btn btn-primary">
              login
            </Link>
          </div>
        </div>
      </form>
    </>
  );
};

export default Register;
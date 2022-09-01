import React, { useState } from "react";
import { GiSkeletonInside } from "react-icons/gi";
import { useHistory } from "react-router-dom";
import { Form } from "../styled/Form";

function Login({ setUser }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  const { username, password } = formData;

  async function onSubmit(e) {
    e.preventDefault();
    const user = {
      username,
      password,
    };
    try {
      let response = await fetch("/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      response = await response.json();
      console.log(response);
      setUser(response.user);
      console.log("Response is...", response.session.session_id);
      window.sessionStorage.setItem("user_id", response.session.session_id);
      history.push(`/users/${user.id}`);
    } catch (response) {
      console.log({ response });
      response.json().then((json) => setErrors(Object.entries(json.errors)));
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <>
      <Form onSubmit={onSubmit}>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
        />

        <input type="submit" value="Log in!" />
      </Form>
      {errors ? errors.map((e) => <div>{e[0] + ": " + e[1]}</div>) : null}
    </>
  );
}

export default Login;

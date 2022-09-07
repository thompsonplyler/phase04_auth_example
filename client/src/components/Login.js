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
    history.push(`/users/${user.id}`);
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

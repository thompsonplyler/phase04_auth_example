import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form } from "../styled/Form";

function Login({ setId }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  const { username, password } = formData;

  function onSubmit(e) {
    e.preventDefault();
    const user = {
      username,
      password,
    };

    fetch(`/login`, {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    }).then((res) => {
      if (res.ok) {
        console.dir("response to observe cookies:", res);
        res.json().then((user) => {
          console.log("User information:", user);
          localStorage.setItem("user", JSON.stringify(user));
          setId(user.id);
          history.push(`/users/${user.id}`);
        });
      } else {
        res.json().then((json) => setErrors(Object.entries(json.errors)));
      }
    });
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

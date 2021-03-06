import React, { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "./api-auth";
import auth from "./auth-utils";
import { Redirect } from "react-router-dom";

export default function Login(props) {
  const [userValues, setUserValues] = useState({
    email: "",
    password: "",
    error: "",
    redirectToReferrer: false,
  });

  const handleChange = (name) => (event) => {
    setUserValues({ ...userValues, [name]: event.target.value });
  };

  // const checkMe = (token) => {
  //   console.log(token);
  //   fetch("http://localhost:6969/api/users/me", {
  //     method: "GET",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + token,
  //     },
  //   })
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const clickSubmit = (e) => {
    e.preventDefault();
    const user = {
      username: userValues.username || undefined,
      email: userValues.email || undefined,
      password: userValues.password || undefined,
    };

    login(user).then((data) => {
      if (data.error) {
        setUserValues({ ...userValues, error: data.error });
      } else {
        auth.authenticate(data, () => {
          setUserValues({ ...userValues, error: "", redirectToReferrer: true });
        });
      }
    });
  };

  const { from } = props.location.state || {
    from: {
      pathname: "/",
    },
  };

  const { redirectToReferrer } = userValues;
  if (redirectToReferrer) {
    return <Redirect to={from} />;
  }

  return (
    <main>
      <form method="post">
        <fieldset>
          <label>
            E-mail
            <br />
            <input
              type="email"
              name="email"
              placeholder="Enter you email"
              onChange={handleChange("email")}
              required
            />
            <br />
          </label>
          <label>
            Password
            <br />
            <input
              type="password"
              name="password"
              placeholder="Enter you password"
              onChange={handleChange("password")}
              required
            />
            <br />
          </label>
        </fieldset>
        <footer>
          <Link to="#">Forgot password?</Link>
          <br />
          <Link onClick={clickSubmit} to="/">
            Login
          </Link>
        </footer>
      </form>
    </main>
  );
}

import React, { useState } from "react";
import validator from "validator";

function App() {
  const [signupInput, setSignupInput] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setSignupInput({ ...signupInput, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault();

    if (!validator.isEmail(signupInput.email)) {
      setError("the email you input is invalid.");
    } else if (signupInput.password.length < 5) {
      setError("the password you entered should contain 5 or more characters");
    } else if (signupInput.confirmPassword !== signupInput.password) {
      setError("passwords don't match each other.");
    } else setError("");
  };

  return (
    <div className="container my-5">
      <form>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="text"
            id="email"
            className="form-control"
            name="email"
            value={signupInput.email}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            name="password"
            value={signupInput.password}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="confirm-password" className="form-label">
            Confirm password
          </label>
          <input
            type="password"
            id="confirm-password"
            name="confirmPassword"
            className="form-control"
            value={signupInput.confirmPassword}
            onChange={(e) => handleChange(e)}
          />
        </div>
        {error ? <p className="text-danger">{error}</p> : null}
        <button type="submit" className="btn btn-primary" onClick={handleClick}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;

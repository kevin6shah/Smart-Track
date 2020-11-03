import React from "react";
import { hot } from "react-hot-loader";

class LoginMain extends React.Component {
  render() {
    return (
      <div className="container mt-4 login">
        <form className="form-signin">
          <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>

          <input
            type="text"
            id="inputUsername"
            name="username"
            className="form-control"
            placeholder="Username"
          />

          <input
            type="password"
            id="inputPassword"
            name="password"
            className="form-control"
            placeholder="Password"
            required
          />

          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me" />
              &nbsp; Remember me
            </label>
          </div>
          <button type="button" className="btn btn-lg btn-success">Submit</button>
        </form>
      </div>
    );
  }
}

export default hot(module)(LoginMain);

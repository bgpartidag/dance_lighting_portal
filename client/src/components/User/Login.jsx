import React from "react";
import $ from "jquery";
import { Link } from "react-router-dom";

function Login() {
	return (
		<section id="login">
        {/* Login Card */}
        <div className="container">
            <div className="row">
              <h1>Login</h1>
            </div>

            <div className="card card-body text-center" id="login-card" style={{borderColor:"white"}}>
              <form>
                <div className="mb-3">
                  <input type="email" placeholder="Email..." id="email"/>
                </div>
                <div className="mb-3">
                  <input type="password" placeholder="Password..." id="password"/>
                </div>
                <button type="button" className="btn btn-primary btn-sm" id="login-btn" value="login">Login</button>
                <button type="button" className="btn btn-primary btn-sm" id="register-btn" value="register-link">Register</button>
              </form>
            </div>
          </div>
		</section>
	);
}

export default Login;

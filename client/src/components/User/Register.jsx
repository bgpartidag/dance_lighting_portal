import React from "react";
import $ from "jquery";
import { Link } from "react-router-dom";

function Register() {
	return (
		<section id="register">
        {/* Register Card */}
        <div className="container">
          <div className="row">
              <h1>Register</h1>
          </div>

          <div className="card card-body text-center" id="register-card" style={{borderColor:"white"}}>
            <form>
              <div className="mb-3">
                <input type="text" placeholder="Name..." id="name"/>
              </div>
              <div className="mb-3">
                <input type="email" placeholder="Email..." id="email"/>
              </div>
              <div className="mb-3">
                <input type="password" placeholder="Password..." id="password"/>
              </div>
              <div className="mb-3">
                <input type="password" placeholder="Confirm Password..." id="confirm"/>
              </div>
              <div className="mb-3">
                <select name="" id="">
                  <option value="">Dance Team</option>
                  <option value="">Lighting Tech</option>
                </select>
              </div>
              <button type="button" className="btn btn-primary btn-sm" id="login-btn" value="register">Register</button>
              <button type="button" className="btn btn-primary btn-sm" id="register-btn" value="cancel">Cancel</button>
            </form>
          </div>
        </div>
		</section>
	);
}

export default Register;

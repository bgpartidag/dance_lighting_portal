import React from "react";
import $ from "jquery";
import { Link } from "react-router-dom";

function TechSignup() {
return (
  <section id="tech-signup">
    {/* Tech Signup Card */}
    <div class="container">
      <div className="row">
        <h1>Register as Tech</h1>
      </div>

      <div class="card card-body text-center" id="register-card" style={{borderColor:"white"}}>
        <form>
          <div class="mb-3">
            <input type="text" placeholder="Name..." id="name"/>
          </div>
          <div class="mb-3">
            <input type="email" placeholder="Email..." id="email"/>
          </div>
          <div class="mb-3">
            <input type="password" placeholder="Password..." id="password"/>
          </div>
          <div class="mb-3">
            <input type="password" placeholder="Confirm Password..." id="confirm"/>
          </div>
          <div class="mb-3" id="tech-confirm">
            <input type="radio" id="tech-confirm-statement"/>
            <label for="tech-confirm-statement" style={{padding:"5px"}}>I am able to fulfill all technical duties as required for this
              dance.</label>
          </div>
          <button type="button" class="btn btn-primary btn-sm" id="login-btn" value="register-tech">Register</button>
          <button type="button" class="btn btn-primary btn-sm" id="register-btn" value="cancel">Cancel</button>
        </form>
      </div>
    </div>
  </section>
);
}

export default TechSignup;
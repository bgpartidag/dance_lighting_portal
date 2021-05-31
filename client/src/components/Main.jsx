import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import $ from "jquery";

import Header from "./Header";
import Footer from "./Footer";
import EditShow from "./Show/EditShow";
import EditDance from "./Dance/EditDance";
import EditCue from "./Cue/EditCue";
import Login from "./User/Login"
import Register from "./User/Register"
import TechSignup from "./User/TechSignup"

function Main() {
	return (
		<Router>
			<Header />
			<div
				style={{
					height: "80%",
					marginTop: "80px",
					marginLeft: "5%",
					marginRight: "5%",
				}}
			>
				<TechSignup/>
				{/* <Register/> */}
				{/* <Login/> */}
				{/* <EditDance /> */}
				{/* <EditCue /> */}
				{/* <EditShow /> */}
			</div>
			<Footer />
		</Router>
	);
}

export default Main;

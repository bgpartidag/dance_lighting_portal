import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import $ from "jquery";

import Header from "./Header";
import Footer from "./Footer";
import EditShow from "./Show/EditShow";
import EditDance from "./Dance/EditDance";
import EditCue from "./Cue/EditCue";
import Show from "./Show/Show";
import LightingInfo from "./Show/LightingInfo";
import DisplayShowInfo from "./Show/DisplayShowInfo";
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
				{/* Setting paths from one page to the next */}
				<Switch>
					{/* <Route exact path='/'><Home/></Route> */}
					<Route path="/edit_show">
						<EditShow />
					</Route>
					<Route path="/edit_dance">
						<EditDance />
					</Route>
					<Route path="/edit_cue">
						<EditCue />
					</Route>
					<Route path="/show">
						<Show />
					</Route>
					{/* <Route path='/show_breakdown'><ShowBreakdown/></Route> */}
					<Route path="/lighting_info">
						<LightingInfo />
					</Route>
					<Route path="/display-show-info">
						<DisplayShowInfo />
					</Route>
					<Route path='/tech_signup'>
						<TechSignup/>
					</Route>
					<Route path='/login'>
						<Login/>
					</Route>
					<Route path='/register'>
						<Register/>
					</Route>
				</Switch>
			</div>
			<Footer />
		</Router>
	);
}

export default Main;

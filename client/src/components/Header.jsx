import React from "react";
import $ from "jquery";
import { Link } from "react-router-dom";


// User Log in function
function UserLogin(props) {
	const currentUser = null;
	const setCurrentUser = null;
	// const currentUser = props.currentUser;
	// const setCurrentUser = props.setCurrentUser;

	const Logout = () => {
		$.get("/node_logout").done((data) => {
			if (data.message === "success") {
				setCurrentUser(null);
			}
		});
	};

	if (currentUser !== null) {
		return (
			<div className="navbar-nav navbar-right">
				<div className="navbar-brand mb-0">Hello, {currentUser.username}</div>
				<a className="nav-link active" onClick={Logout}>
					Log out
				</a>
			</div>
		);
	} else {
		return (
			<ul class="navbar-nav mb-2 mb-lg-0 navbar-right">
				<Link className="nav-link active justify-content-end" to="/login">
					Login
				</Link>
				<Link className="nav-link active" to="/register">
					Register
				</Link>
			</ul>
		);
	}
}

function Header(props) {
	return (
		<section id="header_section">
			<nav class="navbar navbar-expand-lg navbar-light">
				<div class="container-fluid">
					{/* Adds image and text to header */}
					{/* The href sets up the img and text as a link to the home page */}
					<a class="navbar-brand" href="/"> 
						<img
							src="/images/clark.png"
							alt=""
							width="50"
							height="50"
							class="d-inline-block align-text-middle" // changed class to middle to center text next to image
							style={{ marginRight: "10px" }} // Adds space between img and text
						/>
					CU Dance and Lighting Portal</a>
					{/* Sets up an appearing drop down menu when the browser is in a smaller sized window */}
					<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span class="navbar-toggler-icon"></span>
					</button>
					<div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
							{/* Calls userlogin which adds the user login and the register buttons to the appearing drop down menu */}
							<UserLogin {...props} />
					</div>
				</div>
			</nav>
		</section>
	);
}

export default Header;

import React from "react";
import $ from "jquery";
import { Link } from "react-router-dom";

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
			<div className="navbar-nav navbar-right">
				<Link className="nav-link active" to="/login">
					Login
				</Link>
				<Link className="nav-link active" to="/register">
					Register
				</Link>
			</div>
		);
	}
}

function Header(props) {
	return (
		<section id="header_section">
			<nav className="navbar navbar-expand-lg nav-custom">
				<div className="container-fluid">
					<div className="navbar-nav">
						<Link className="navbar-brand" to="/">
							<img
								src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FClark_University&psig=AOvVaw0mmGREar8EEeicwzjuaioz&ust=1622505934128000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCIjfiuHP8vACFQAAAAAdAAAAABAI"
								alt=""
								width="30"
								height="24"
								class="d-inline-block align-text-top"
							/>
							CU Dance and Lighting Portal
						</Link>
					</div>
					{/*... extends dictionary with props dict*/}
					<UserLogin {...props} />
				</div>
			</nav>
		</section>
	);
}

export default Header;

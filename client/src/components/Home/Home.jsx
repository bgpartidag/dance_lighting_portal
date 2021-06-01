import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ShowItem from "./ShowItem";
import $ from "jquery";

function Home() {
	const [isLoaded, setIsLoaded] = useState(false);
	const [error, setError] = useState("");
	const [shows, setShows] = useState([]);

	useEffect(() => {
		//sorta like on document ready
		if (!isLoaded) {
			// contact nodejs to get movies
			$.get("/node_get_all_shows").done(
				(data) => {
					if (data.message === "success") {
						console.log(data.data);
						setShows(data.data);
						setIsLoaded(true);
					} else {
						setError(data.message);
					}
				}
			);
		}
	});

	let defaultShow = {
		team_username: "TBD",
		show_name: "",
		contact_name: "",
		contact_email: "",
		contact_phone: "",
		show_start_date: "",
		show_end_date: "",
		show_start_time: "",
		show_end_time: "",
		tech_start_date: "",
		tech_end_date: "",
		tech_start_time:"",
		tech_end_time: "",
		show_notes: "",
	};

	// const shows = [
	// 	{
	// 		show_name: "show 1",
	// 		team_name: "team a",
	// 		start_date: "05/30/2021",
	// 		end_date: "06/01/2021",
	// 		start_time: "10:00",
	// 		end_time: "12:00",
	// 	},
	// ];

	return (
		<section id="home">
			<div className="container">
				<div className="row">
					<h1>Home</h1>
				</div>

				<div
					className="card card-body text-center"
					style={{ position: "relative" }}
				>
					<div className="row">
						<div className="col">
							<select
								name=""
								id="select-team"
								style={{ margin: "20px", position: "absolute" }}
							>
								<option value="">Select Team</option>
							</select>
						</div>
					</div>
					<div className="row">
						<div className="col">
							<div className="card text-center" style={{ marginTop: "50px" }}>
								<div className="row">
									<select
										className="col-md-2"
										name=""
										id="select-team"
									// style={{ margin: "5%" }}
									>
										<option value="">Show</option>
									</select>
									<select
										className="col-md-2"
										name=""
										id="select-team"
									// style={{ margin: "5%" }}
									>
										<option value="">Team</option>
									</select>
									<select
										className="col-md-2"
										name=""
										id="select-team"
									// style={{ margin: "5%" }}
									>
										<option value="">Start Date</option>
									</select>
									<select
										className="col-md-2"
										name=""
										id="select-team"
									// style={{ margin: "5%" }}
									>
										<option value="">End Date</option>
									</select>
									<select
										className="col-md-2"
										name=""
										id="select-team"
									// style={{ margin: "5%" }}
									>
										<option value="">Start Time</option>
									</select>
									<select
										className="col-md-2"
										name=""
										id="select-team"
									// style={{ margin: "5%" }}
									>
										<option value="">End Time</option>
									</select>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="card">
								{/* <div className="card-body"> */}
								<ul className="list-group">
									{shows.map(function (s, idx) {
										return (
											<li className="list-group-item" key={s._id}>
												<ShowItem
													show={s}
													show_id={s._id}
													evenOdd={idx % 2 === 0 ? "even_row" : "odd_row"}
												/>
											</li>
										);
									})}
								</ul>
								{/* </div> */}
							</div>
						</div>
						<div className="row text-center">
							<p id="error_message" style={{ color: "red" }}>
								{error}
							</p>
						</div>
						<div className="row">
							<div className="col">
								<Link type="button" className="btn btn-primary"
									style={{ width: "20%" }} to={{
										pathname: "/edit_show",
										state: { show: defaultShow},
									}}>Add Show</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Home;
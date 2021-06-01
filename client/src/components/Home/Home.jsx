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
			$.get("/node_get_all_shows").done((data) => {
				if (data.message === "success") {
					console.log(data.data);
					setShows(data.data);
					setIsLoaded(true);
				} else {
					setError(data.message);
				}
			});
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
		tech_start_time: "",
		tech_end_time: "",
		show_notes: "",
	};

	return (
		<section id="home">
			<div className="container">
				<div className="row">
					<h1>Upcoming Shows</h1>
				</div>

				<div className="row">
					<div className="col">
						<select name="" id="select-team" style={{ marginBottom: "10px" }}>
							<option value="">Select Team</option>
						</select>
					</div>
				</div>

				<div
					className="card card-body text-center"
					// style={{ position: "relative" }}
				>
					<div className="row">
						<div className="col">
							<div
								className="card card-body text-center"
								style={{
									borderColor: "white",
									paddingBottom: "0",
								}}
							>
								<div className="row">
									<h5
										className="col-md-2"
										name=""
										id="select-team"
										// style={{ margin: "5%" }}
									>
										<option value="">Show</option>
									</h5>
									<h5
										className="col-md-2"
										name=""
										id="select-team"
										// style={{ margin: "5%" }}
									>
										<option value="">Team</option>
									</h5>
									<h5
										className="col-md-2"
										name=""
										id="select-team"
										// style={{ margin: "5%" }}
									>
										<option value="">Start Date</option>
									</h5>
									<h5
										className="col-md-2"
										name=""
										id="select-team"
										// style={{ margin: "5%" }}
									>
										<option value="">End Date</option>
									</h5>
									<h5
										className="col-md-2"
										name=""
										id="select-team"
										// style={{ margin: "5%" }}
									>
										<option value="">Start Time</option>
									</h5>
									<h5
										className="col-md-2"
										name=""
										id="select-team"
										// style={{ margin: "5%" }}
									>
										<option value="">End Time</option>
									</h5>
								</div>
							</div>
						</div>
					</div>

					<div className="row">
						<div className="card" style={{ borderColor: "white" }}>
							{/* <div className="card-body"> */}
							<ul className="list-group">
								{shows.map(function (s, idx) {
									const rowTag = idx % 2 === 0 ? "even_row" : "odd_row";
									return (
										<li className={"list-group-item " + rowTag} key={s._id}>
											<ShowItem show={s} show_id={s._id} />
										</li>
									);
								})}
							</ul>
							{/* </div> */}
						</div>
					</div>
				</div>

				<div className="row">
					<div className="col-md-10"></div>
					<div className="col-md-2">
						<Link
							name=""
							id="add-show"
							className="btn btn-primary"
							style={{ marginTop: "10px" }}
						>
							<option value="">Add Show</option>
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Home;

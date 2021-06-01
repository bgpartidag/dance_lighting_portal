import React from "react";
import { Link } from "react-router-dom";
import ShowItem from "./ShowItem";

function Home() {
	const shows = [
		{
			show_name: "show 1",
			team_name: "team a",
			start_date: "05/30/2021",
			end_date: "06/01/2021",
			start_time: "10:00",
			end_time: "12:00",
		},
		{
			show_name: "show 2",
			team_name: "team b",
			start_date: "05/30/2021",
			end_date: "06/01/2021",
			start_time: "10:00",
			end_time: "12:00",
		},
		{
			show_name: "show 3",
			team_name: "team c",
			start_date: "05/30/2021",
			end_date: "06/01/2021",
			start_time: "10:00",
			end_time: "12:00",
		},
	];
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
											<ShowItem show={s} />
										</li>
									);
								})}
							</ul>
							{/* </div> */}
						</div>
					</div>

					<div className="row">
						<div className="col">
							<Link
								name=""
								id="add-show"
								className="btn btn-primary"
								style={{ marginLeft: "85%" }}
							>
								<option value="">Add Show</option>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Home;

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
	];
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
													evenOdd={idx % 2 === 0 ? "even_row" : "odd_row"}
												/>
											</li>
										);
									})}
								</ul>
								{/* </div> */}
							</div>
						</div>
						<div className="row">
							<div className="col">
								<Link name="" id="add-show" className="btn btn-primary">
									<option value="">Add Show</option>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Home;

import React from "react";
import { Link } from "react-router-dom";
import DanceItem from "../Dance/DanceItem";

function Show(props) {
	const show = {
		team_username: "team1",
		show_name: "show1",
		contact_name: "Nicholas",
		contact_email: "NiMitchell@clarku.edu",
		contact_phone: "802-289-2607",
		show_start: "05/30/2021",
		show_end: "06/01/2021",
		show_start_time: "10:00",
		show_end_time: "12:00",
		tech_start: "05/28/2021",
		tech_end: "06/01/2021",
		tech_start_time: "6:00",
		tech_end_time: "12:00",
		show_notes: "this show gone slap",
	};
	const dances = [
		{
			parent_show: "show1",
			dance_name: "dance1",
			choreographer: "Nicholas",
			length: 120,
			dance_notes: "testComments",
			status: "Complete",
		},
	];

	function addDance() {}
	return (
		<section id="edit_que">
			<div className="container">
				<div className="row">
					<h1>{show.show_name}</h1>
				</div>
				<div className="row">
					<div className="col-md-3">
						<div className="card">
							<div className="card-body">
								<h5 style={{ textAlign: "left" }}>Group:</h5>
								<p>{show.team_username}</p>
								<br />
								<h5 style={{ textAlign: "left" }}>Show Dates:</h5>
								<p>
									Start: {show.show_end} at {show.show_start_time}
								</p>
								<p>
									End: {show.show_end} at {show.show_end_time}
								</p>
								<br />
								<h5 style={{ textAlign: "left" }}>Tech Dates:</h5>
								<p>
									Start: {show.tech_start} at at {show.tech_start_time}
								</p>
								<p>
									End: {show.show_end} at {show.tech_end_time}
								</p>
							</div>
						</div>
					</div>
					<div className="col-md-7">
						<div className="card">
							<div className="card-body">
								<ul className="list-group">
									{dances.map(function (d, idx) {
										return (
											<li className="list-group-item" key={d._id}>
												<DanceItem
													dance={d}
													evenOdd={idx % 2 === 0 ? "even_row" : "odd_row"}
												/>
											</li>
										);
									})}
								</ul>
							</div>
						</div>
						<button className="btn btn-primary" onClick="addDance()">
							Add Dance
						</button>
					</div>
					<div className="col-md-2">
						<form>
							<label for="dance_detail" className="form-label">
								Details:
								<textarea
									type="text"
									id="dance_detail"
									name="dance_detail"
									className="form-control"
									style={{ height: "100%", textAlign: "left" }}
									value={show.show_notes}
								></textarea>
							</label>
							<button type="submit" className="btn btn-primary">
								Save Details
							</button>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Show;

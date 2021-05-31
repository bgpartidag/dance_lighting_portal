import React from "react";
import { Link } from "react-router-dom";
import DanceItem from "../Dance/DanceItem";
import LightItem from "../Cue/LightItem";
import DanceInfo from "../Dance/DanceInfo";

function DisplayShowInfo(props) {
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

	return (
		<section id="edit_que">
			<div className="container">
				<div className="row">
					<h1>{show.show_name + " Lighting Info"}</h1>
				</div>
				<br />
				<div className="row">
					<div className="col-md-4">
						<h5 style={{ textAlign: "left" }}>Show Director:</h5>
						<p>Name: {show.contact_name}</p>
						<p>Email: {show.contact_email}</p>
						<p>Phone: {show.contact_phone}</p>
					</div>
					<div className="col-md-4">
						<h5 style={{ textAlign: "left" }}>Show Dates:</h5>
						<p>
							Start: {show.show_end} at {show.show_start_time}
						</p>
						<p>
							End: {show.show_end} at {show.show_end_time}
						</p>
					</div>
					<div className="col-md-4">
						<h5 style={{ textAlign: "left" }}>Tech Dates:</h5>
						<p>
							Start: {show.tech_start} at at {show.tech_start_time}
						</p>
						<p>
							End: {show.show_end} at {show.tech_end_time}
						</p>
					</div>
					<p>
						<b>Notes:</b> {show.show_notes}
					</p>
					<div className="row">
						<ul className="list-group">
							{dances.map(function (d, idx) {
								return <DanceInfo dance={d} num={idx} />;
							})}
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
}
export default DisplayShowInfo;

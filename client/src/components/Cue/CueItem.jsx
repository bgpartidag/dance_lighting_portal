import React from "react";
import { Link } from "react-router-dom";
import LightItem from "./LightItem";

function CueItem(props) {
	const row_class = "row " + props.evenOdd;
	const cue = props.cue;

	return (
		<div className={row_class}>
			<div className="col-lg-4">
				<Link
					className="cue_name  btn-primary"
					to={{
						pathname: "/edit_cue",
						state: {
							cue: cue,
							dance: props.dance,
							show: props.show,
							show_id: props.show_id
						},
					}}
				>
					<h5 style={{ color: "blue", textAlign: "left" }}>
						Edit Cue
					</h5>
				</Link>
				<p>Duration: {cue.end_time} - {cue.start_time}</p>
			</div>
			<div className="col-lg-8">
				<ul className="list-group">
					{cue.lights.map(function (light) {
						return (
							<li className="list-group-item" key={light._id}>
								<LightItem light={light} />
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
}

export default CueItem;

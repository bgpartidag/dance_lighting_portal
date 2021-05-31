import React from "react";
import { Link } from "react-router-dom";
import LightItem from "../Cue/LightItem";

function CueInfo(props) {
	const cue = props.cue;
	const idx = props.num;

	console.log(cue.lights);
	return (
		<section>
			<div className="card" style={{ marginLeft: "40px", marginRight: "40px" }}>
				<div className="card-header">
					<b>Cue {idx}:</b>
				</div>
				<div
					className="card-body"
					style={{ marginLeft: "40px", marginRight: "40px" }}
				>
					<p>
						<b>Start:</b> {cue.start_time} <b>End:</b> {cue.end_time}
					</p>
					{cue.lights.map(function (l) {
						return (
							<div className="container">
								<div className="col-sm-6">
									<LightItem light={l} />
								</div>
							</div>
						);
					})}
					<p>Notes: {cue.notes}</p>
				</div>
			</div>
			<br />
		</section>
	);
}

export default CueInfo;

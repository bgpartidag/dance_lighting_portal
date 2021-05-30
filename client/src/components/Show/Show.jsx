import React from "react";
import { Link } from "react-router-dom";

function Show() {
	return (
		<div className={row_class}>
			<div className="col-lg-4">
				<Link
					className="cue_name"
					to={{
						pathname: "/edit_cue",
						state: {
							cue: cue,
						},
					}}
				>
					{cue.name}
				</Link>
				<p>Rating: {cue.end_time - cue.start_time}</p>
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

export default Show;

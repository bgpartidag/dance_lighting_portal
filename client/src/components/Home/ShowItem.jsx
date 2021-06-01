import React from "react";
import { Link } from "react-router-dom";
import $ from "jquery";

function ShowItem(props) {
	const row_class = "row " + props.evenOdd;
	const show = props.show;
	const show_id=props.show_id;

	return (
		<div className={row_class}>
			<div className="col-md-2">
				<Link className="show_name btn-primary" to={{
					pathname: "show",
					state: {
						show: show,
						show_id: show_id,
					},
				}}
				><h5 style={{ color: "blue", textAlign: "left" }}>{show.show_name}</h5>
				</Link>
			</div>
			<div className="col-md-2">
				<p>{show.team_name}</p>
			</div>
			<div className="col-md-2">
				<p>{show.show_start_date}</p>
			</div>
			<div className="col-md-2">
				<p>{show.show_end_date}</p>
			</div>
			<div className="col-md-2">
				<p>{show.show_start_time}</p>
			</div>
			<div className="col-md-2">
				<p>{show.show_end_time}</p>
			</div>
		</div>
	);
}
export default ShowItem;

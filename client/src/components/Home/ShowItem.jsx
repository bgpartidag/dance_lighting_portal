import React from "react";
import { Link } from "react-router-dom";
import $ from "jquery";

function ShowItem(props) {
	const row_class = "row " + props.evenOdd;
	const show = props.show;

	return (
		<div className={row_class}>
			<div className="col-md-2">
				<Link
					className="show_name btn-primary"
					to={{
						pathname: "/edit_show",
						state: {
							show: show,
							show_id: "A show id i guess",
						},
					}}
				>
					<h5 style={{ color: "blue", textAlign: "left" }}>{show.show_name}</h5>
				</Link>
			</div>
			<div className="col-md-2">
				<p>{show.team_name}</p>
			</div>
			<div className="col-md-2">
				<p>{show.start_date}</p>
			</div>
			<div className="col-md-2">
				<p>{show.end_date}</p>
			</div>
			<div className="col-md-2">
				<p>{show.start_time}</p>
			</div>
			<div className="col-md-2">
				<p>{show.end_time}</p>
			</div>
		</div>
	);
}
export default ShowItem;

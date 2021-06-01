import React from "react";
import { Link } from "react-router-dom";
import $ from "jquery";

function ShowItem(props) {
	const row_class = "row";
	const show = props.show;

	return (
		<div className={row_class}>
			<div className="col-md-2" style={{ borderRight: "1px solid black" }}>
				<Link
					className="show_name btn btn-primary"
					to={{
						pathname: "/edit_show",
						state: {
							show: show,
							show_id: "A show id i guess",
						},
					}}
					style={{ padding: "5px", margin: "1px" }}
				>
					<h5 style={{ color: "white", textAlign: "center" }}>
						{show.show_name}
					</h5>
				</Link>
			</div>
			<div
				className="col-md-2"
				style={{ borderRight: "1px solid black", paddingTop: "8px" }}
			>
				<p>{show.team_name}</p>
			</div>
			<div
				className="col-md-2"
				style={{ borderRight: "1px solid black", paddingTop: "8px" }}
			>
				<p>{show.start_date}</p>
			</div>
			<div
				className="col-md-2"
				style={{ borderRight: "1px solid black", paddingTop: "8px" }}
			>
				<p>{show.end_date}</p>
			</div>
			<div
				className="col-md-2"
				style={{ borderRight: "1px solid black", paddingTop: "8px" }}
			>
				<p>{show.start_time}</p>
			</div>
			<div className="col-md-2" style={{ paddingTop: "8px" }}>
				<p>{show.end_time}</p>
			</div>
		</div>
	);
}
export default ShowItem;

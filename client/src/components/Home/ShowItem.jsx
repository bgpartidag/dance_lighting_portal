import React from "react";
import { Link } from "react-router-dom";
import $ from "jquery";

function ShowItem(props) {
	const row_class = "row";
	const show = props.show;
	const show_id=props.show_id;

	return (
		<div className={row_class}>
			<div className="col-md-2" style={{ borderRight: "1px solid black" }}>
				<Link
					className="show_name btn btn-primary"
					to={{
						pathname: "show",
						state: {
							show: show,
							show_id: show_id,
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
				<p>{show.show_start_date}</p>
			</div>
			<div
				className="col-md-2"
				style={{ borderRight: "1px solid black", paddingTop: "8px" }}
			>
				<p>{show.show_end_date}</p>
			</div>
			<div
				className="col-md-2"
				style={{ borderRight: "1px solid black", paddingTop: "8px" }}
			>
				<p>{show.show_start_time}</p>
			</div>
			<div className="col-md-2" style={{ paddingTop: "8px" }}>
				<p>{show.show_end_time}</p>
			</div>
		</div>
	);
}
export default ShowItem;

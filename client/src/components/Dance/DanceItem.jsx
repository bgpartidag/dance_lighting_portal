import React from "react";
import { Link } from "react-router-dom";
import $ from "jquery";

function DanceItem(props) {
	const row_class = "row " + props.evenOdd;
	const dance = props.dance;
	const cues = [];

	// get all cues
	$.get("/node_get_all_cues_by_dance", { id: dance.id }).done((data) => {
		if (data.message === "success") {
			cues = data.cues;
		}
	});

	// Allow for reordering dances (removed in this version)
	// function moveDance(direction, dance) {}

	return (
		<div className={row_class}>
			<div className="col-lg-4">
				<Link
					className="dance_name btn-primary"
					// to={{
					// 	pathname: "/edit_dance",
					// 	state: {
					// 		dance: dance,
					// 		show_id: "A show id i guess",
					// 	},
					// }}
				>
					<h5 style={{ color: "blue", textAlign: "left" }}>
						{dance.dance_name}
					</h5>
				</Link>
				<p>{dance.choreographer}</p>
			</div>
			<div className="col-lg-3">
				<p>{"Duration: " + dance.length}</p>
			</div>

			<div className="col-lg-3" style={{ textAlign: "right" }}>
				<p>Status: {dance.status}</p>
			</div>
			<div className="col-lg-2" style={{ textAlign: "right" }}>
				<p>Cues: {cues.length}</p>
			</div>
			{/* <div className="col-lg-1" style={{ textAlign: "right" }}>
				<i
					type="button"
					onClick={moveDance("up", dance.dance_name)}
					class="fas fa-arrow-circle-up"
				></i>
				<br />
				<i
					type="button"
					onClick={moveDance("down", dance.dance_name)}
					class="fas fa-arrow-circle-down"
				></i>
			</div> */}
		</div>
	);
}
export default DanceItem;

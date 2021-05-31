import React from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import CueInfo from "../Cue/CueInfo";

function DanceInfo(props) {
	const dance = props.dance;
	const idx = props.num;
	let cues = [];

	$.get("/node_get_all_cues_by_dance", { id: dance.id }).done((data) => {
		if (data.message === "success") {
			cues = data.cues;
		}
	});

	// TODO: hardcoded test cue
	cues = [
		{
			parent_dance: "dance1",
			start_time: "1:35",
			end_time: "2:40",
			cue_notes: "Notes for cue",
			lights: [
				{
					light_name: "left_flood",
					color: "green",
					brightness: 85,
				},
			],
		},
	];
	return (
		<section>
			<div className="card">
				<div className="card-header">
					<h5>Dance: {dance.dance_name}</h5>
				</div>
				<div className="card-body">
					<p>
						<b>Length:</b> {dance.length} <b>Choreographer:</b>{" "}
						{dance.choreographer}
					</p>
					<p>
						<b>Notes:</b> {dance.dance_notes}
					</p>
					{cues.map(function (c, c_idx) {
						return <CueInfo cue={c} num={c_idx} />;
					})}
				</div>
			</div>

			<br />
		</section>
	);
}

export default DanceInfo;

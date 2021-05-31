import React, { useState, useEffect } from "react";
import CueItem from "./CueItem";
import $ from "jquery";

function CueList(props) {
	const [error, setError] = useState("");
	const [isLoaded, setIsLoaded] = useState(false);
	const [cues, setCues] = useState([]);

	useEffect(() => { //sorta like on document ready
		if (!isLoaded) {
			// contact nodejs to get movies
			$.get('/node_get_all_cues_by_dance', { dance_id: props.dance_id }).done((data) => {
				if (data.message === 'success') {
					//console.log(data.cues);
					setCues(data.data);
					setIsLoaded(true);
				} else {
					setError(data.message);
				}
			});
		}
	})

	// if (error) {
	// 	return <div>{error}</div>;
	// } else {
	return (
		<div>
			<ul className="list-group">
				{cues.map(function (c, idx) {
					return (
						<li className="list-group-item" key={c._id}>
							<CueItem
								cue={c}
								evenOdd={idx % 2 === 0 ? "even_row" : "odd_row"}
								dance={props.dance}
								show={props.show}
								show_id={props.show_id}
							/>
						</li>
					);
				})}
			</ul>
			<div className="row text-center">
				<p id="error_message" style={{ color: "red" }}>{error}</p>
			</div>
		</div>
	);
	// }
}

export default CueList;

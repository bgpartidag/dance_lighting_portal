import React, { useState, useEffect } from "react";
import CueItem from "./CueItem";
import $ from "jquery";

function CueList() {
	const [error, setError] = useState("");
	const [isLoaded, setIsLoaded] = useState(false);
	const [cues, setCues] = useState([]);

	// useEffect(() => {
	// 	console.log("Use effect");
	// 	if (!isLoaded) {
	// 		//contact NodeJS to get movies
	// 		$.getJSON("/node_get_cues").done((data) => {
	// 			console.log(data);
	// 			if (data.message === "success") {
	// 				setCues(data.data);
	// 				setIsLoaded(true);
	// 			} else {
	// 				setError(data.message);
	// 			}
	// 		});
	// 	}
	// });

	// if (error) {
	// 	return <div>{error}</div>;
	// } else {
	return (
		<ul className="list-group">
			{cues.map(function (c, idx) {
				return (
					<li className="list-group-item" key={c._id}>
						<CueItem cue={c} evenOdd={idx % 2 === 0 ? "even_row" : "odd_row"} />
					</li>
				);
			})}
		</ul>
	);
	// }
}

export default CueList;

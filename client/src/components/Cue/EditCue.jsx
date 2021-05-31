import React, { useState } from "react";
import { useLocation, Link, useHistory } from "react-router-dom";
import $ from "jquery";
import LightVisualizer from "./LightVisualizer";

function EditCue(props) {
	const [error, setError] = useState("");
	const cue = {
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
	};

	// new cue, create an empty cue
	if (cue === null) {
		cue = {
			parent_dance: "",
			start_time: "",
			end_time: "",
			cue_notes: "",
			lights: [],
		};
	}
	const saveCue = (event) => {
		event.preventDefault();
		setError("");
		const form = event.target.elements;
		const saveCue = {
			parent_dance: "TBD",
			start_time: form.cue_start.value,
			end_time: form.cue_end.value,
			details: form.light_detail.value,
		};
		console.log(saveCue);

		// const dance_id = 1;
		// const order = 1;

		// $.post("/node_add_cue", {cue:cue, dance_id: dance_id, order:order}).done((data)=>{
		//     if(data.message === 'success'){
		//         //navigate
		//         history.push('/PATHNAME TBD')
		//     }else{
		//         setError(data.message);
		//     }
		// });
	};

	// if this is a new cue, set values to empty
	return (
		<section id="edit_que">
			<div className="container">
				<div className="row">
					<h1>Edit Cue</h1>
				</div>
				<form id="edit_form" onSubmit={saveCue} method="POST">
					<div className="row">
						<div className="col-2">
							<div>
								<h5>Cue Time:</h5>
							</div>
							<div>
								<label for="cue_start" className="form-label">
									Start Time:
									<input
										type="text"
										name="cue_start"
										defaultValue={cue.start_time}
										id="cue_start"
										className="form-control"
									/>
								</label>
							</div>
							<div>
								<label for="cue_end" className="form-label">
									End Time:
									<input
										type="text"
										name="cue_end"
										defaultValue={cue.end_time}
										id="cue_end"
										className="form-control"
									/>
								</label>
							</div>
						</div>
						<div className="col-8">
							<LightVisualizer cue={cue} />
						</div>
						<div className="col-2">
							<h5>Cue Details:</h5>
							<label for="light_detail" className="form-label">
								Details:
								<textarea
									type="text"
									id="light_detail"
									name="light_detail"
									defaultValue={cue.cue_notes}
									className="form-control"
									style={{ height: "100%", textAlign: "left" }}
								></textarea>
							</label>
						</div>
					</div>
					<div className="row text-center">
						<p id="error_message" style={{ color: "red" }}>
							{error}
						</p>
					</div>
					<div className="row button">
						<div className="col-12 text-center button_col">
							<button
								type="submit"
								className="btn btn-primary"
								style={{ width: "20%" }}
							>
								Save Cue
							</button>
						</div>
					</div>
				</form>
			</div>
		</section>
	);
}

export default EditCue;

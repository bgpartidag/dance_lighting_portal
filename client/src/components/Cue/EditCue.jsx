import React, { useState } from "react";
import { useLocation, Link, useHistory } from "react-router-dom";
import $ from "jquery";
import LightVisualizer from "./LightVisualizer";

function EditCue() {
	const location = useLocation();
	const show = location.state.show;
	const show_id = location.state.show_id;
	const dance = location.state.dance;
	const cue = location.state.cue;
	const history = useHistory();

	const [error, setError] = useState("");

	const saveCue = (event) => {
		event.preventDefault();
		setError("");
		const form = event.target.elements;

		let lightList = []

		Array.from(document.querySelectorAll(".light_checks")).forEach((checkbox) => {
			if (document.getElementById(checkbox.id).checked) {
				const light_id = document.getElementById(checkbox.id).id;
				const brightness_id = light_id + "_brightness";
				const color_id = light_id + "_color";
				const brightness_value = document.getElementById(brightness_id).value;
				let color_value = "null";
				if (document.getElementById(color_id)) {
					color_value = document.getElementById(color_id).value;
				}
				lightList.push({
					light_name: light_id,
					color: color_value,
					brightness: brightness_value
				})
			}
		});

		cue.start_time = form.cue_start.value;
		cue.end_time = form.cue_end.value;
		cue.cue_notes = form.light_detail.value;
		cue.lights = lightList;

		$.post("/node_add_cue", { cue: cue }).done((data) => {
			if (data.message === "success") {
				//navigate
				console.log(data.cue._id);
				history.push('/edit_dance', {dance: dance, show: show, show_id: show_id	});
			} else {
				setError(data.message.message);
			}
		});
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
						<div className="col-md-2">
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
										placeholder="Time"
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
										placeholder="Time"
									/>
								</label>
							</div>
						</div>
						<div className="col-md-8">
							<LightVisualizer cue={cue} />
						</div>
						<div className="col-md-2">
							<h5>Cue Details:</h5>
							<textarea
								type="text"
								id="light_detail"
								name="light_detail"
								defaultValue={cue.cue_notes}
								className="form-control"
								placeholder="Details..."
								style={{ height: "20%", textAlign: "left" }}
							></textarea>
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

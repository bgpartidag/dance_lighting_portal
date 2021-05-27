import React from "react";
import $ from "jquery";
import { Link } from "react-router-dom";
import LightVisualizer from "./LightVsializer";

function EditCue() {
	return (
		<section id="edit_que">
			<div className="container">
				<div className="row">
					<h1>EditQue</h1>
				</div>
				<form id="edit_form">
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
										value=""
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
										value=""
										id="cue_end"
										className="form-control"
									/>
								</label>
							</div>
						</div>
						<div className="col-8">
							<LightVisualizer />
						</div>
						<div className="col-2">
							<h5>Light Options:</h5>
							<label for="brightness" className="form-label">
								Brightness:
								<input
									id="brightness"
									classname="custom-range"
									type="range"
									min="0"
									max="100"
								/>
							</label>
							<label for="color" className="form-label">
								Color:
								<input
									type="text"
									name="color"
									value=""
									id="color"
									className="form-control"
								/>
							</label>
							<label for="light_detail" className="form-label">
								Details:
								<textarea
									type="text"
									id="light_detail"
									name="light_detail"
									className="form-control"
									style={{ height: "100%", textAlign: "left" }}
								></textarea>
							</label>
						</div>
					</div>
					<div className="row">
						<div className="row button">
							<div className="col-12 text-center button_col">
								<input
									type="button"
									className="btn btn-dark"
									value="Save Cue"
									onclick="saveCue()"
									style={{ width: "20%" }}
								/>
							</div>
						</div>
					</div>
				</form>
			</div>
		</section>
	);
}

export default EditCue;

import React from "react";
import $ from "jquery";
import { Link } from "react-router-dom";
//import LightItem from "./LightItem";
import CueList from "../Cue/CueList";

function EditDance() {
	return (
		<section id="edit_que">
			<div className="container">
				<div className="row">
					<h1 id="dance_name">New Dance</h1>
				</div>
				<form id="edit_form">
					<div className="row">
						<div className="col-4">
							<div>
								<label for="dance_name" className="form-label">
									Dance Name:
									<input
										type="text"
										name="dance_name"
										value=""
										id="dance_name"
										className="form-control"
									/>
								</label>
							</div>

							<div>
								<label for="choreographer_name" className="form-label">
									Choreographer Name:
									<input
										type="text"
										name="choreographer_name"
										value=""
										id="choreographer_name"
										className="form-control"
									/>
								</label>
							</div>

							<label for="dance_info" className="form-label">
								Dance Info:
								<textarea
									type="text"
									id="dance_info"
									name="dance_info"
									className="form-control"
									style={{ height: "100%", textAlign: "left" }}
								></textarea>
							</label>
						</div>
						<div className="col-8">
							<div className="row">
								<h5 style={{ textAlign: "left" }}>Cue List</h5>
								<CueList />
								<div className="row">
									<div className="col-12 text-left button_col">
										<input
											type="button"
											className="btn btn-dark"
											value="Add Cue"
											onclick="editCue()"
											style={{ width: "20%" }}
										/>
									</div>
								</div>
							</div>
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

export default EditDance;

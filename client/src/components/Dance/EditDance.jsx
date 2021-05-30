import React, { useState } from 'react';
import $ from "jquery";
import { Link } from "react-router-dom";
//import LightItem from "./LightItem";
import CueList from "../Cue/CueList";

function EditDance() {
	const [error, setError] = useState('');

	const saveDance = (event) => {
		event.preventDefault();
		setError('A test run');
		const form = event.target.elements;
		const dance = {
			parent_show: "TBD",
			dance_name: form.dance_name.value,
			choreographer: form.choreographer_name.value,
			comments: form.dance_info.value
		}
		console.log(dance);

		// const show_id = 0;
		// const order = 0;

		// $.post('/node_add_dance', {dance: dance, show_id: show_id, order: order}).done((data)=>{
		// 	if(data.message === 'success'){

		// 		//navigate to somewhere
		// 		history.push('/PATHNAME TBD')

		// 	}else{
		// 		setError(data.message);
		// 	}
		// });
	}

	return (
		<section id="edit_que">
			<div className="container">
				<div className="row">
					<h1 id="dance_name">New Dance</h1>
				</div>
				<form id="edit_form" onSubmit={saveDance} method="POST">
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
										<Link type="button" className="btn btn-primary" style={{ width: "20%" }} to={{
											pathname: "/edit_cue PATHNAME TBD", state: { dance_name: "TBD" }
										}}>Add Cue</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="row text-center">
						<p id="error_message" style={{color: "red"}}>{error}</p>
					</div>
					<div className="row button">
						<div className="col-12 text-center button_col">
							<button type="submit" className="btn btn-primary" style={{ width: "20%" }}>Save Dance</button>
						</div>
					</div>
				</form>
			</div>
		</section>
	);
}

export default EditDance;

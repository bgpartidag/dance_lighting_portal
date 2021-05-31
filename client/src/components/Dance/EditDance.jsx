import React, { useState } from 'react';
import $ from "jquery";
import { Link } from "react-router-dom";
//import LightItem from "./LightItem";
import CueList from "../Cue/CueList";

function AddCueAbility() {
	const randomBoolean = false;

	if (randomBoolean) {
		return (
			<Link type="button" className="btn btn-primary" style={{ width: "20%" }} to={{
				pathname: "/PATHNAME TBD", state: { dance_name: "TBD" }
			}}>Add Cue</Link>
		)
	}else{
		return(
			<p>Dance needs to be saved before adding cues.</p>
		)
	}
}

function EditDance() {
	const [error, setError] = useState('');

	const saveDance = (event) => {
		event.preventDefault();
		setError('');
		const form = event.target.elements;
		const dance = {
			parent_show: "60b43c0b4ef9e842e455dc76",
			dance_name: form.dance_name.value,
			dance_length: "00:00",
			choreographer: form.choreographer_name.value,
			dance_notes: form.dance_info.value,
			status: "incomplete"
		}
		console.log(dance);


		$.post('/node_add_dance', {dance: dance}).done((data)=>{
			if(data.message === 'success'){
				//navigate to somewhere
				//history.push('/PATHNAME TBD')b
				console.log(data.dance._id);
				setError('navigation not in place');
			}else{
				setError(data.message.message);
			}
		});
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
										<AddCueAbility/>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="row text-center">
						<p id="error_message" style={{ color: "red" }}>{error}</p>
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

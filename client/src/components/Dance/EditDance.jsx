import React, { useState } from 'react';
import $ from "jquery";
import { useLocation, Link, useHistory } from 'react-router-dom';
//import LightItem from "./LightItem";
import CueList from "../Cue/CueList";

function AddCueAbility(props) {
	//const randomBoolean = false;
	const dance = props.dance
	console.log(dance._id);

	const defaultCue = {
		parent_dance: dance._id,
		start_time: "",
		end_time: "",
		cue_notes: "",
		lights: [],
	}

	if (dance._id !== undefined) {
		return (
			<div className="row">
				<h5 style={{ textAlign: "left" }}>Cue List</h5>
				<CueList dance={dance} dance_id={dance._id} show={props.show} show_id={props.show_id} />
				<div className="row">
					<div className="col-12 text-left button_col">
						<Link type="button" className="btn btn-primary" style={{ width: "20%" }} to={{
							pathname: "/edit_cue", state: { cue: defaultCue, dance: dance, show: props.show, show_id: props.show_id }
						}}>Add Cue</Link>
					</div>
				</div>
			</div>
		)
	} else {
		return (
			<p>Dance needs to be saved before adding cues.</p>
		)
	}
}

function EditDance() {
	const location = useLocation();
	let show = {};
	let show_id = 'NONE'
	let dance = {
		parent_show: show_id,
		dance_name: 'TEMPLATE NAME',
		dance_length: "00:00",
		choreographer: 'TEMPLATE CHOREOGRAPHER',
		dance_notes: 'TEMPLATE NOTES',
		status: "incomplete"
	};
	if (location.state !== undefined) {
		show = location.state.show;
		show_id = location.state.show_id;
		dance = location.state.dance;
	}
	const [error, setError] = useState('');
	const history = useHistory();

	const saveDance = (event) => {
		event.preventDefault();
		setError('');
		const form = event.target.elements;

		dance.dance_name = form.dance_name.value;
		dance.choreographer = form.choreographer_name.value;
		dance.dance_notes = form.dance_info.value
		console.log(dance);

		if (location.state !== undefined) {
			if (dance.dance_name === '' || dance.choreographer === '') {
				setError('Only Details can be left empty. Please fill in everything else.');
			} else {
				$.post('/node_add_dance', { dance: dance }).done((data) => {
					if (data.message === 'success') {
						//navigate to somewhere
						// console.log(data.dance._id);
						history.push('/show', { show: show, show_id: show_id });
					} else {
						setError(data.message.message);
					}
				});
			}
		}
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
										defaultValue={dance.dance_name}
										id="dance_name"
										className="form-control"
										placeholder='Dance'
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
										defaultValue={dance.choreographer}
										className="form-control"
										placeholder='Choreographer'
									/>
								</label>
							</div>

							<label for="dance_info" className="form-label">
								Dance Info:
								<textarea
									type="text"
									id="dance_info"
									name="dance_info"
									defaultValue={dance.dance_notes}
									className="form-control"
									placeholder='Dance info...'
									style={{ height: "100%", textAlign: "left" }}
								></textarea>
							</label>
						</div>
						<div className="col-8">
							<AddCueAbility dance={dance} show={show} show_id={show_id} />
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

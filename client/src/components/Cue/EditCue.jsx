import React, { useState } from 'react';
import { useLocation, Link, useHistory } from 'react-router-dom';
import $ from "jquery";
import LightVisualizer from "./LightVisualizer";

function EditCue() {
	const [error, setError] = useState('');

	const saveCue = (event) => {
		event.preventDefault();
		setError('');
		const form = event.target.elements;
		const cue = {
			parent_dance: "60b4448e2f29a92ef43ee39b",
			start_time: form.cue_start.value,
			end_time: form.cue_end.value,
			cue_notes: form.light_detail.value
		}
		console.log(cue);
		
		$.post("/node_add_cue", {cue:cue}).done((data)=>{
		    if(data.message === 'success'){
		        //navigate
		        //history.push('/PATHNAME TBD')
				console.log(data.cue._id);
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
										id="cue_start"
										className="form-control"
										placeholder='Time'
									/>
								</label>
							</div>
							<div>
								<label for="cue_end" className="form-label">
									End Time:
									<input
										type="text"
										name="cue_end"
										id="cue_end"
										className="form-control"
										placeholder='Time'
									/>
								</label>
							</div>
						</div>
						<div className="col-8">
							<LightVisualizer />
						</div>
						<div className="col-2">
							<h5>Cue Details:</h5>
							<label for="light_detail" className="form-label">
								Details:
								<textarea
									type="text"
									id="light_detail"
									name="light_detail"
									className="form-control"
									placeholder='Details...'
									style={{ height: "100%", textAlign: "left" }}
								></textarea>
							</label>
						</div>
					</div>
					<div className="row text-center">
						<p id="error_message" style={{color: "red"}}>{error}</p>
					</div>
					<div className="row button">
						<div className="col-12 text-center button_col">
							<button type="submit" className="btn btn-primary" style={{ width: "20%" }}>Save Cue</button>
						</div>
					</div>
				</form>
			</div>
		</section>
	);
}

export default EditCue;

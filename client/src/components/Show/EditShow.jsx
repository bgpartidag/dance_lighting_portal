import React, {useState} from 'react';
import $ from "jquery";
import { Link } from "react-router-dom";

function EditShow() {
	const [error, setError] = useState('');
	//const history = useHistory();

	const saveShow = (event) => {
		event.preventDefault();
		setError('');
        const form = event.target.elements;
		console.log("The Start Date: " + form.show_start.value);
		const show = {
			team_username : "TBD",
			show_name : form.show_name.value,
			contact_name : form.contact_name.value,
			contact_email : form.contact_email.value,
			contact_phone : form.contact_phone.value,
			show_start_date : "00-00-0000",
			show_end_date: "11-11-1111",
			show_start_time: form.show_start_time.value,
			show_end_time: form.show_end_time.value,
			tech_start_date : "33-33-3333", 
			tech_end_date: "44-44-4444",
			tech_start_time: form.tech_start_time.value,
			tech_end_time: form.tech_end_time.value,
			show_notes : form.show_detail.value
		}
		console.log(show);

		if (!show.show_name || !show.contact_name || !show.contact_email || !show.contact_phone){
			setError('Only Details can be left empty. Please fill in everything else.');
		}else{
			$.post('/node_add_show', {show:show}).done((data)=>{
				if(data.message === 'success'){
	
					//navigate to show breakdown
					//history.push('/show PATHNAME TBD', {show:show})
					console.log(data.show._id);
					setError('navigation not in place');
				}else{
					setError(data.message.message);
				}
			});
		}
	}

	return (
		<section id="add_show">
			<div className="row">
				<h1>Add Show</h1>
			</div>
			<div className="row">
				<h5 id="team_name"></h5>
			</div>

			<div className="row" id="add_form">
				<form onSubmit={saveShow} method="POST">
					<div className="row" id="header">
						<div className="col-md-3 name">
							<h5>Info</h5>
						</div>
						<div className="col-md-3 show">
							<h5>Show</h5>
						</div>
						<div className="col-md-3 tech">
							<h5>Tech</h5>
						</div>
						<div className="col-md-3 det"></div>
					</div>
					
					<div className="row inputs">
						<div className="col-md-9 boxes">
							<div className="row" id="form1">
								<div className="col-md-4 name">
									<label for="show_name" className="form-label">
										Show Name:
									</label>
									<input type="text" className="form-control" id="show_name" placeholder="Show Name" name="show_name"/>
								</div>
								<div className="col-md-4 show">
									<label for="show_start" className="form-label">
										Start Date:
									</label>
									<input type="date" id="show_start" name="show_start" value="" className="form-control"/>
								</div>
								<div className="col-md-4 tech">
									<label for="tech_start" className="form-label">
										Start Date:
									</label>
									<input type="date" id="tech_start" name="tech_start" value="" className="form-control"
									/>
								</div>
							</div>
							<div className="row" id="form2">
								<div className="col-md-4 name">
									<label for="contact_name" className="form-label">
										Contact Name:
									</label>
									<input type="text" name="contact_name" id="contact_name" className="form-control" placeholder="Contact Name"/>
								</div>
								<div className="col-md-4 show">
									<label for="show_end" className="form-label">
										End Date:
									</label>
									<input
										type="date"
										id="show_end"
										name="show_end"
										className="form-control"
									/>
								</div>
								<div className="col-md-4 tech">
									<label for="tech_end" className="form-label">
										End Date:
									</label>
									<input
										type="date"
										id="tech_end"
										name="tech_end"
										className="form-control"
									/>
								</div>
							</div>
							<div className="row" id="form3">
								<div className="col-md-4 name">
									<label for="contact_name" className="form-label">
										Email:
									</label>
									<input
										type="text"
										name="contact_email"
										placeholder="contact@email.com"
										id="contact_email"
										className="form-control"
									/>
								</div>
								<div className="col-md-4 show">
									<label for="show_start_time" className="form-label">
										Start Time:
									</label>
									<input
										type="time"
										id="show_start_time"
										name="show_start_time"
										min="09:00"
										max="24:00"
										className="form-control"
									/>
								</div>
								<div className="col-md-4 tech">
									<label for="tech_start_time" className="form-label">
										Start Time:
									</label>
									<input
										type="time"
										id="tech_start_time"
										name="tech_start_time"
										min="09:00"
										max="24:00"
										className="form-control"
									/>
								</div>
							</div>
							<div className="row" id="form4">
								<div className="col-md-4 name">
									<label for="contact_phone" className="form-label">
										Phone:
									</label>
									<input
										type="tel"
										id="contact_phone"
										name="contact_phone"
										placeholder="xxx-xxx-xxxx"
										pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
										className="form-control"
									/>
								</div>
								<div className="col-md-4 show">
									<label for="show_end_time" className="form-label">
										End Time:
									</label>
									<input
										type="time"
										id="show_end_time"
										name="show_end_time"
										min="09:00"
										max="24:00"
										className="form-control"
									/>
								</div>
								<div className="col-md-4 tech">
									<label for="tech_end_time" className="form-label">
										End Time:
									</label>
									<input
										type="time"
										id="tech_end_time"
										name="tech_end_time"
										min="09:00"
										max="24:00"
										className="form-control"
									/>
								</div>
							</div>
						</div>
						<div className="col-md-3 details">
							<label for="show_detail" className="form-label">
								Details:
							</label>
							<textarea
								type="text"
								id="show_detail"
								name="show_detail"
								placeholder="Any Comments"
								className="form-control"
								style={{ height: "85%", textAlign: "left" }}
							></textarea>
						</div>
					</div>
					<div className="row text-center">
						<p id="error_message" style={{color: "red"}}>{error}</p>
					</div>
					<div className="row button">
						<div className="col-12 text-center button_col">
							<button type="submit" className="btn btn-primary" style={{width: "20%"}}>Save Show</button>
						</div>
					</div>
				</form>
			</div>
		</section>
	);
}

export default EditShow;

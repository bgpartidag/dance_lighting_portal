import React, { useState } from "react";
import $ from "jquery";
import {useLocation, Link, useHistory} from 'react-router-dom';

function EditShow() {
	const location = useLocation();
	const [error, setError] = useState("");
	const history = useHistory();
	let show = {
		team_username: "TBD",
		show_name: "",
		contact_name: "",
		contact_email: "",
		contact_phone: "",
		show_start_date: "",
		show_end_date: "",
		show_start_time: "",
		show_end_time: "",
		tech_start_date: "",
		tech_end_date: "",
		tech_start_time:"",
		tech_end_time: "",
		show_notes: "",
	};
	// let show = {
	// 	team_username: "TBD",
	// 	show_name: "TEMPLATE",
	// 	contact_name: "TEMPLATE_CONTACT",
	// 	contact_email: "TEMPLATE@EMAIL.COM",
	// 	contact_phone: "123-456-7890",
	// 	show_start_date: "1111-11-11",
	// 	show_end_date: "2222-12-22",
	// 	show_start_time: "09:09",
	// 	show_end_time: "08:08",
	// 	tech_start_date: "3333-03-31",
	// 	tech_end_date: "4444-04-04",
	// 	tech_start_time:"07:07",
	// 	tech_end_time: "06:06",
	// 	show_notes: "NEED TO CREATE OR ACCESS SHOW",
	// };
	if (location.state !== undefined) {
		show = location.state.show;
	}
	const saveShow = (event) => {
		event.preventDefault();
		setError('');
        const form = event.target.elements;

		const show = {
			team_username: "TBD",
			show_name: form.show_name.value,
			contact_name: form.contact_name.value,
			contact_email: form.contact_email.value,
			contact_phone: form.contact_phone.value,
			show_start_date: form.show_start.value,
			show_end_date: form.show_end.value,
			show_start_time: form.show_start_time.value,
			show_end_time: form.show_end_time.value,
			tech_start_date: form.tech_start.value,
			tech_end_date: form.tech_end.value,
			tech_start_time: form.tech_start_time.value,
			tech_end_time: form.tech_end_time.value,
			show_notes: form.show_detail.value,
		};

		if (!show.show_name || !show.contact_name || !show.contact_email || !show.contact_phone){
			setError('Only Details can be left empty. Please fill in everything else.');
		}else{
			console.log("saving show")
			$.post('/node_add_show', {show:show}).done((data)=>{
				if(data.message === 'success'){
	
					//navigate to show breakdown
					//console.log(data.show._id);
					history.push('/show', {show:show , show_id: data.show._id})
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
						<div className="col-md-4 name">
							<h5>Info</h5>
						</div>
						<div className="col-md-4 show">
							<h5>Show</h5>
						</div>
						<div className="col-md-4 tech">
							<h5>Tech</h5>
						</div>
					</div>

					<div className="row inputs">

							{/* Card 1: Contact info */}
								<div className="col-md-4 name">
								<div className="card">
									<div className='card-body'>
									<label for="show_name" className="form-label">
										Show Name:
									</label>
									<input
										type="text"
										name="show_name"
										id="show_name"
										className="form-control"
										placeholder='Show'
										defaultValue={show.show_name}
									/>
									<label for="contact_name" className="form-label">
										Contact Name:
									</label>
									<input
										type="text"
										name="contact_name"
										id="contact_name"
										className="form-control"
										placeholder='Contact'
										defaultValue={show.contact_name}
									/>
									<label for="contact_name" className="form-label">
										Email:
									</label>
									<input
										type="text"
										name="contact_email"
										id="contact_email"
										className="form-control"
										placeholder='contact@email.com'
										defaultValue={show.contact_email}
									/>
									<label for="contact_phone" className="form-label">
										Phone:
									</label>
									<input
										type="tel"
										id="contact_phone"
										name="contact_phone"
										pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
										className="form-control"
										placeholder='xxx-xxx-xxxx'
										defaultValue={show.contact_phone}
									/>
								</div>
								</div>
								</div>
								{/* End of card 1 */}

								{/* Card 2: Show Info */}
								<div className="col-md-4 show">
									<div className="card">
									<div className='card-body'>
									<label for="show_start" className="form-label">
										Start Date:
									</label>
									<input
										type="date"
										id="show_start"
										name="show_start"
										className="form-control"
										defaultValue={show.show_start_date}
									/>
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
										defaultValue={show.show_start_time}
									/>
									<label for="show_end" className="form-label">
										End Date:
									</label>
									<input
										type="date"
										id="show_end"
										name="show_end"
										className="form-control"
										defaultValue={show.show_end_date}
									/>
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
										defaultValue={show.show_end_time}
									/>
								</div>
								</div>
								</div>
								{/* End of card 2 */}

								{/* Card 3: Tech info */}
								<div className="col-md-4 tech">
									<div className='card'>
									<div className='card-body'>
									<label for="tech_start" className="form-label">
										Start Date:
									</label>
									<input
										type="date"
										id="tech_start"
										name="tech_start"
										className="form-control"
										defaultValue={show.tech_start_date}
									/>
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
										defaultValue={show.tech_start_time}
									/>
									<label for="tech_end" className="form-label">
										End Date:
									</label>
									<input
										type="date"
										id="tech_end"
										name="tech_end"
										className="form-control"
										defaultValue={show.tech_end_date}
									/> 
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
										defaultValue={show.tech_end_time}
									/>
								</div>
								{/* End of card 3 */}
								</div>
								</div>
							</div>

						{/* The comment section */}
						<br/>
						<div className='row'>
						<div className='col-md-3'></div>
						<div className="col-md-6 details">
							<h5 style={{textAlign:'center'}}>
								Details
							</h5>
							<textarea
								type="text"
								id="show_detail"
								name="show_detail"
								placeholder="Any Comments"
								className="form-control"
								placeholder="Details..."
								style={{ height: "85%", textAlign: "left"}}
								defaultValue={show.show_notes}
							></textarea>
						</div>
						</div>


					<br/>
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
								Save Show
							</button>
						</div>
					</div>
				</form>
			</div>
		</section>
	);
}

export default EditShow;

import React from "react";
import $ from "jquery";
import { Link } from "react-router-dom";

function EditShow() {
	return (
		<section id="add_show">
			<div className="row">
				<h1>Add Show</h1>
			</div>
			<div className="row">
				<h5 id="team_name"></h5>
			</div>
			<div className="row" id="add_form">
				<form>
					<div className="row" id="header">
						<div className="col-md-3 name">
							<h5>Info:</h5>
						</div>
						<div className="col-md-3 show">
							<h5>Show:</h5>
						</div>
						<div className="col-md-3 tech">
							<h5>Tech:</h5>
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
									<input
										type="text"
										name="show_name"
										value=""
										id="show_name"
										className="form-control"
									/>
								</div>
								<div className="col-md-4 show">
									<label for="show_start" className="form-label">
										Start Date:
									</label>
									<input
										type="date"
										id="show_start"
										name="show_start"
										value=""
										className="form-control"
									/>
								</div>
								<div className="col-md-4 tech">
									<label for="tech_start" className="form-label">
										Start Date:
									</label>
									<input
										type="date"
										id="tech_start"
										name="tech_start"
										value=""
										className="form-control"
									/>
								</div>
							</div>
							<div className="row" id="form2">
								<div className="col-md-4 name">
									<label for="contact_name" className="form-label">
										Contact Name:
									</label>
									<input
										type="text"
										name="contact_name"
										value=""
										id="contact_name"
										className="form-control"
									/>
								</div>
								<div className="col-md-4 show">
									<label for="show_end" className="form-label">
										End Date:
									</label>
									<input
										type="date"
										id="show_end"
										name="show_end"
										value=""
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
										value=""
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
										value=""
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
										pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
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
								className="form-control"
								style={{ height: "85%", textAlign: "left" }}
							></textarea>
						</div>
					</div>
					<div className="row">
						<p id="error_message"></p>
					</div>
					<div className="row button">
						<div className="col-12 text-center button_col">
							<input
								type="button"
								className="btn btn-dark"
								value="Create Show"
								onclick="addShow()"
								style={{ width: "20%" }}
							/>
						</div>
					</div>
				</form>
			</div>
		</section>
	);
}

export default EditShow;

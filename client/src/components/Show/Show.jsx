import React, { useState, useEffect } from 'react'
import { useLocation, Link, useHistory } from 'react-router-dom';
import DanceItem from "../Dance/DanceItem";
import $ from 'jquery';

function Show() {
	const location = useLocation();
	const show = location.state.show;
	const show_id = location.state.show_id;
	const [isLoaded, setIsLoaded] = useState(false);
	const [error, setError] = useState('');
	const [dances, setDances] = useState([]);

	useEffect(() => { //sorta like on document ready
		if (!isLoaded) {
			// contact nodejs to get movies
			// console.log(show_id);
			$.get('/node_get_all_dances_by_show', { show_id: show_id }).done((data) => {
				if (data.message === 'success') {
					console.log(data.data);
					setDances(data.data);
					setIsLoaded(true);
				} else {
					setError(data.message);
				}
			});
		}
	})

	const defaultDance = {
		parent_show: show_id,
		dance_name: '',
		dance_length: "00:00",
		choreographer: '',
		dance_notes: '',
		status: "incomplete"
	};
	
	return (
		<section id="edit_que">
			<div className="container">
				<div className="row">
					<h1>{show.show_name}</h1>
				</div>
				<div className="row">
					<div className="col-md-3">
						<div className="card">
							<div className="card-body">
								<h5 style={{ textAlign: "left" }}>Group:</h5>
								<p>{show.team_username}</p>
								<br />
								<h5 style={{ textAlign: "left" }}>Show Dates:</h5>
								<p>
									Start: {show.show_end_date} at {show.show_start_time}
								</p>
								<p>
									End: {show.show_end_date} at {show.show_end_time}
								</p>
								<br />
								<h5 style={{ textAlign: "left" }}>Tech Dates:</h5>
								<p>
									Start: {show.tech_start_date} at at {show.tech_start_time}
								</p>
								<p>
									End: {show.show_end_date} at {show.tech_end_time}
								</p>
							</div>
						</div>
					</div>
					<div className="col-md-7">
						<div className="card">
							<div className="card-body">
								<ul className="list-group">
									{dances.map(function (d, idx) {
										return (
											<li className="list-group-item" key={d._id}>
												<DanceItem
													dance={d}
													dance_id={d._id}
													show={show}
													show_id={show_id}
													evenOdd={idx % 2 === 0 ? "even_row" : "odd_row"}
												/>
											</li>
										);
									})}
								</ul>
							</div>
						</div>
						<div className="row text-center">
							<p id="error_message" style={{ color: "red" }}>{error}</p>
						</div>
						<Link type="button" className="btn btn-primary" style={{ width: "20%" }} to={{
							pathname: "/edit_dance", state: { show: show , dance: defaultDance, show_id: show_id}
						}}>Add Dance</Link>
					</div>
					<div className="col-md-2">
						<form>
							<label for="dance_detail" className="form-label">
								Details:
								<textarea
									type="text"
									id="dance_detail"
									name="dance_detail"
									className="form-control"
									style={{ height: "100%", textAlign: "left" }}
									value={show.show_notes}
								></textarea>
							</label>
							<button type="submit" className="btn btn-primary">
								Save Details
							</button>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Show;

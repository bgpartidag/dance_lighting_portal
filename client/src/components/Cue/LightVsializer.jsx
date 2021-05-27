import React from "react";
import $ from "jquery";
import { Link } from "react-router-dom";

function LightVisualizer() {
	return (
		<div class="card">
			<div className="btn-group" data-toggle="buttons">
				<div className="container">
					<div className="row">
						<label className="btn col btn-primary active">
							<input type="radio" name="lights" id="backspot1" defaultChecked />{" "}
							Back-Left Spot
						</label>
						<label className="btn col btn-primary">
							<input type="radio" name="lights" id="backspot1" /> Back-Center
							Spot
						</label>
						<label className="btn col btn-primary">
							<input type="radio" name="lights" id="backspot1" /> Back-Right
							Spot
						</label>
					</div>
					<div className="row">
						<label className="btn col btn-primary">
							<input type="radio" name="lights" id="leftspot" /> Left Spot
						</label>
						<label className="btn col btn-primary">
							<input type="radio" name="lights" id="mannedspot" /> Manned Spot
						</label>
						<label className="btn col btn-primary">
							<input type="radio" name="lights" id="rightspot" /> Right Spot
						</label>
					</div>
					<div className="row">
						<div className="col-2"></div>
						<div className="col-8">
							<div className="row">
								<label className="btn col btn-primary">
									<input type="radio" name="lights" id="leftflood" />
									Left Flood
								</label>
								<label className="btn col btn-primary">
									<input type="radio" name="lights" id="rightflood" /> Right
									Flood
								</label>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default LightVisualizer;

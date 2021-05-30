import React from "react";
import $ from "jquery";
import { Link } from "react-router-dom";
import LightCard from "./LightCard";

function LightVisualizer() {
	return (
		<div className="card">
			<div class="card-body">
				<div className="container">
					<div className="row">
						<div className="col-sm-4">
							<LightCard name="Back-Left Spot" hasColor="false" />
						</div>
						<div className="col-sm-4">
							<LightCard name="Back-Center Spot" hasColor="false" />
						</div>
						<div className="col-sm-4">
							<LightCard name="Back-Right Spot" hasColor="false" />
						</div>
					</div>
					<div className="row">
						<div className="col-sm-4">
							<LightCard name="Left Spot" hasColor="false" />
						</div>
						<div className="col-sm-4">
							<LightCard name="Manned Spot" hasColor="false" />
						</div>
						<div className="col-sm-4">
							<LightCard name="Right Spot" hasColor="false" />
						</div>
					</div>
					<div className="row">
						<div className="col-2"></div>
						<div className="col-8">
							<div className="row">
								<div className="col-sm-6">
									<LightCard name="Left Flood" hasColor="true" />
								</div>
								<div className="col-sm-6">
									<LightCard name="Right Flood" hasColor="true" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default LightVisualizer;

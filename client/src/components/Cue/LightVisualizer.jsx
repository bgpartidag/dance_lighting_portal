import React from "react";
import $ from "jquery";
import { Link } from "react-router-dom";
import LightCard from "./LightCard";

function LightVisualizer(props) {
	const cue = props.cue;
	console.log(cue);
	return (
		<div className="light_visualizer">
			<div className="card">
				<div class="card-body">
					<div className="container">
						<div className="row">
							<div className="col-lg-4 light_card">
								<LightCard
									name="Back-Left Spot"
									ID="back_left_spot"
									cue={cue}
									hasColor="false"
								/>
							</div>
							<div className="col-lg-4 light_card">
								<LightCard
									name="Back-Center Spot"
									ID="back_center_spot"
									cue={cue}
									hasColor="false"
								/>
							</div>
							<div className="col-lg-4 light_card">
								<LightCard
									name="Back-Right Spot"
									ID="back_right_spot"
									cue={cue}
									hasColor="false"
								/>
							</div>
						</div>
						<div className="row">
							<div className="col-lg-4 light_card">
								<LightCard
									name="Left Spot"
									ID="left_spot"
									cue={cue}
									hasColor="false"
								/>
							</div>
							<div className="col-lg-4 light_card">
								<LightCard
									name="Manned Spot"
									ID="manned_spot"
									cue={cue}
									hasColor="false"
								/>
							</div>
							<div className="col-lg-4 light_card">
								<LightCard
									name="Right Spot"
									ID="right_spot"
									cue={cue}
									hasColor="false"
								/>
							</div>
						</div>
						<div className="row">
							<div className="col-2"></div>
							<div className="col-8">
								<div className="row">
									<div className="col-lg-6 light_card">
										<LightCard
											name="Left Flood"
											ID="left_flood"
											cue={cue}
											hasColor="true"
											placeholder='Color'
										/>
									</div>
									<div className="col-lg-6 light_card">
										<LightCard
											name="Right Flood"
											ID="right_flood"
											cue={cue}
											hasColor="true"
										/>
									</div>
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

import React from "react";

function LightCard(props) {
	const name = props.name;
	const hasColor = props.hasColor;
	const cue = props.cue;
	const ID = props.ID;
	// get the current light if it has a value
	const findLight = cue.lights.find((l) => l.light_name === ID);
	// default light
	let light = {
		brightness: 0,
		color: "",
	};
	// replace teh default light with result of find
	if (findLight) {
		light = findLight;
		console.log(light);
	}
	// flood light case
	if (hasColor === "true") {
		// get cue by name

		return (
			<div class="card">
				<div class="card-body">
					<input
						type="checkbox"
						className="btn-check"
						id={ID + "_button"}
						autocomplete="off"
					/>
					<label
						className="btn btn-outline-dark form-control"
						for={ID + "_button"}
					>
						{name}
					</label>
					<br />
					<p style={{ textAlign: "center" }}>Brightness:</p>
					<div className="row">
						<input
							id={ID + "_brightness"}
							classname="form-control-range"
							type="range"
							min="0"
							max="100"
							style={{ alignItems: "center" }}
							defaultValue={light.brightness}
						/>
					</div>
					<p style={{ textAlign: "center" }}>Color:</p>
					<input
						type="text"
						name="color"
						id={ID + "_color"}
						className="form-control"
						defaultValue={light.color}
					/>
				</div>
			</div>
		);
	}
	// spot light case
	else {
		return (
			<div class="card">
				<div class="card-body">
					<input
						type="checkbox"
						className="btn-check"
						id={ID + "_button"}
						autocomplete="off"
					/>
					<label
						className="btn btn-outline-dark form-control"
						for={ID + "_button"}
					>
						{name}
					</label>
					<br />
					<div className="row">
						<p style={{ textAlign: "center" }}>Brightness:</p>
						<input
							id={ID + "_brightness"}
							classname="form-control-range"
							type="range"
							min="0"
							max="100"
							defaultValue={light.brightness}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default LightCard;

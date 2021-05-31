import React from "react";

function LightCard(props) {
	const name = props.name;
	const hasColor = props.hasColor;
	const cue = props.cue;
	const ID = props.ID;
	const findLight = cue.lights.find((l) => l.light_name === ID);
	let light = {
		brightness: 0,
		color: "",
	};
	if (findLight) {
		light = findLight;
		console.log(light);
	}
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
						className="btn btn-outline-primary form-control"
						for={ID + "_button"}
					>
						{name}
					</label>
					<br />
					<label for={ID + "_brightness"} className="form-label">
						Brightness:
						<input
							id={ID + "_brightness"}
							classname="custom-range"
							type="range"
							min="0"
							max="100"
							defaultValue={light.brightness}
						/>
					</label>
					<label for={ID + "_color"} className="form-label">
						Color:
						<input
							type="text"
							name="color"
							id={ID + "_color"}
							className="form-control"
							defaultValue={light.color}
						/>
					</label>
				</div>
			</div>
		);
	} else {
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
						className="btn btn-outline-primary form-control"
						for={ID + "_button"}
					>
						{name}
					</label>
					<br />
					<label for={ID + "_brightness"} className="form-label">
						Brightness:
						<input
							id={ID + "_brightness"}
							classname="custom-range"
							type="range"
							min="0"
							max="100"
							defaultValue={light.brightness}
						/>
					</label>
				</div>
			</div>
		);
	}
}

export default LightCard;

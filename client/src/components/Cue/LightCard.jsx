import React from "react";

function LightCard(props) {
	const name = props.name;
	const hasColor = props.hasColor;

	if (hasColor === "true") {
		return (
			<div class="card">
				<div class="card-body">
					<input
						type="checkbox"
						className="btn-check"
						id={name + "-button"}
						autocomplete="off"
					/>
					<label
						className="btn btn-outline-primary form-control"
						for={name + "-button"}
					>
						{name}
					</label>
					<br />
					<label for="brightness" className="form-label">
						Brightness:
						<input
							id="brightness"
							classname="custom-range"
							type="range"
							min="0"
							max="100"
						/>
					</label>
					<label for="color" className="form-label">
						Color:
						<input
							type="text"
							name="color"
							value=""
							id="color"
							className="form-control"
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
						id={name + "-button"}
						autocomplete="off"
					/>
					<label
						className="btn btn-outline-primary form-control"
						for={name + "-button"}
					>
						{name}
					</label>
					<br />
					<label for="brightness" className="form-label">
						Brightness:
						<input
							id="brightness"
							classname="custom-range"
							type="range"
							min="0"
							max="100"
						/>
					</label>
				</div>
			</div>
		);
	}
}

export default LightCard;

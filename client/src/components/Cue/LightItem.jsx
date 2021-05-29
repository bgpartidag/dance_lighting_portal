import React from "react";

function LightItem(props) {
	const light = props.light;

	return (
		<div>
			<div className="col-lg-4">
				<p>{light.name}</p>
			</div>
			<div className="col-lg-4">
				<p>Brightness: {light.brightness}</p>
			</div>
			<div className="col-lg-4">
				<p>Color: {light.color}</p>
			</div>
		</div>
	);
}

export default LightItem;

import React from "react";

function LightItem(props) {
	const light = props.light;

	return (
		<div className="row">
			<div className="col-md-4">
				<p>{light.light_name}</p>
			</div>
			<div className="col-md-4">
				<p>Brightness: {light.brightness}</p>
			</div>
			<div className="col-md-4">
				<p>Color: {light.color}</p>
			</div>
		</div>
	);
}

export default LightItem;

import React from 'react';
import './Card.css'

function Card({name}) {
	return(
		<div className="card">
			<h2>{name}</h2>
		</div>
	);
}

export default Card;
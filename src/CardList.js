import React from 'react';
import Card from './Card';

function CardList({entries}) {
	return(
		<div className='isotope-container'>
			{
				entries.map((entry, i) => {
					return (
						<Card entry={entry} key={i} datakey={i} />
					);
				})
			}
		</div>
	);
}

export default CardList;
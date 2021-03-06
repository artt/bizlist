import React from 'react';
import Card from './Card';

function CardList({entries}) {
	return(
		<div className='container'>
			{
				entries.map((entry, i) => {
					return (<Card
										key={i}
										entry={entry}
									/>);
				})
			}
		</div>
	);
}

export default CardList;
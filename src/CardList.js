import React from 'react';
import Card from './Card';

function CardList({entries}) {
	return(
		<div>
			{
				entries.map((entry, i) => {
					return (<Card
										entry={entries[i]}
									/>);
				})
			}
		</div>
	);
}

export default CardList;
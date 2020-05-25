import React from 'react';
import './style.css';
import * as myutil from './myutil.js';

function Card({entry}) {
	return(
		<div className='card'>
			<div className='title'>{entry.fullname.t + (entry.remark.t && (' (' + entry.remark.t + ')'))}</div>
			<div>{ entry.call.t &&
				entry.call.t.split('\n').map((item, i) => {
					return (
						<a href={`tel:${myutil.trimPhone(item)}`} key={i}>
							<span className='phone'>
								{item}<br />
							</span>
						</a>
					);
				})
			}</div>
			<div>{ entry.website.t &&
				<a href={entry.website.t} target='_blank'>
					<span className='website'>
						{myutil.trimURL(entry.website.t)}
					</span>
				</a>
			}</div>
		</div>
	);
}

export default Card;
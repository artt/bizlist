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
				<a href={entry.website.t} target='_blank' rel='noopener noreferrer'>
					<span className='website'>
						{myutil.trimURL(entry.website.t)}
					</span>
				</a>
			}</div>
			<div className='colorbar'>
				<svg>
					<path d='M 250 0
									 v 80
									 h -250
									 C 100 80, 250 80, 250 0'
								stroke='none'
								fill={`${entry.color.t}`} />
				</svg>
			</div>
			<div className='colorbar1'>
				<svg>
					<path d='M 150 0
									 v 100
									 h -150
									 C 100 100, 150 50, 150 0'
								stroke='none'
								fill={`${entry.color.t}`} />
				</svg>
			</div>
			<div className='colorbar2'>
				<svg>
					<path d='M 100 0
									 v 150
									 h -100
									 C 100 150, 100 20, 100 0'
								stroke='none'
								fill={`${entry.color.t}`} />
				</svg>
			</div>
		</div>
	);
}

export default Card;
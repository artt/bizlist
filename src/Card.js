import React from 'react';
import './style.css';
import * as myutil from './myutil.js';



function Card({entry}) {
	return(
		<div className='card'>
			{/* call={entry.call} color={entry.color} email={entry.email}
							facebook={entry.facebook} fullname={entry.fullname}
							keyword={entry.keyword} line={entry.line}
							name={entry.name} remark={entry.remark} website={entry.website}*/}
			
			{/* title */}
			<div className='title'>{entry.fullname + (entry.remark && (' (' + entry.remark + ')'))}</div>
			
			{/* phone */}
			<div>{ entry.call &&
				entry.call.split('\n').map((item, i) => {
					return (
						<a href={`tel:${myutil.trimPhone(item)}`} key={i}>
							<span className='ts'>
								{item} <i className="fas fa-phone"></i>&nbsp;
							</span>
						</a>
					);
				})
			}</div>

			{/* website, facebook, line */}
			<div>
				{ entry.website &&
					<a href={entry.website} target='_blank' rel='noopener noreferrer'>
						<span className='ts'>
							{myutil.trimURL(entry.website)} <i className="fas fa-external-link-alt"></i>
						</span>
					</a>
				}
			</div>
			<div>
				{ entry.facebook &&
					<span className='ts facebook'>
						<a href={entry.facebook} target='_blank' rel='noopener noreferrer'>
							facebook <i className="fab fa-facebook-square" />
						</a>
					</span>
				}
				{ entry.line &&
					<span className='ts line'>
						&nbsp;<a href={`http://line.me/ti/p/${entry.line}`} target='_blank' rel='noopener noreferrer'>
							 LINE <i className="fab fa-line" />
						</a>
					</span>
				}
			</div>
			{/* add QR for line https://quickchart.io/qr?text=http://ine.me/ti/p/@Bangkokbank&size=150 */}

			{/* colorbar */}
			<div className='colorbar bar0'>
				<svg>
					<path d='M 250 0
									 v 80
									 h -250
									 C 100 80, 250 80, 250 0'
								fill={`${entry.color}`} />
				</svg>
			</div>
			<div className='colorbar bar1'>
				<svg>
					<path d='M 150 0
									 v 100
									 h -150
									 C 100 100, 150 50, 150 0'
								fill={`${entry.color}`} />
				</svg>
			</div>
			<div className='colorbar bar2'>
				<svg>
					<path d='M 100 0
									 v 150
									 h -100
									 C 100 150, 100 20, 100 0'
								fill={`${entry.color}`} />
				</svg>
			</div>
		</div>
	);
}

export default Card;
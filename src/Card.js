import React from 'react';
import './style.css';

// name, fullname, remark, call, website, keyword, facebook, line, email, color

function trimURL(fullurl) {
	const tmp = fullurl.indexOf('www.')   
	let startPos = tmp + 4  
	if (tmp === -1) {  
		startPos = fullurl.indexOf('//') + 2    
	}   
	let endPos = fullurl.indexOf('/', startPos) 
	if (endPos == -1) { 
		endPos = fullurl.length 
	}   
	return fullurl.substring(startPos, endPos)  
}

function trimPhone(phonetext) {
	phonetext = phonetext.trim()
	const patt = /(\d{4}|\d-\d{4}-\d{4}|\d{3}-\d{3}-\d{4}|\d{3}-\d{3}-\d{3})/;
	const tocall = phonetext.match(patt)[0];
	return tocall;
}

function Card({entry}) {
	return(
		<div className="card">
			<div className="title">{entry.fullname.t + (entry.remark.t && (' (' + entry.remark.t + ')'))}</div>
			<div>{ entry.call.t &&
				entry.call.t.split('\n').map((item, i) => {
					return (
						<a href={`tel:${trimPhone(item)}`}>
						<span className="phone">
							{item}<br />
						</span>
						</a>
					);
				})
			}</div>
			<div className="website">{ entry.website.t &&
				<a href={entry.website.t} target='_blank'>{trimURL(entry.website.t)}</a>
			}</div>
		</div>
	);
}

export default Card;
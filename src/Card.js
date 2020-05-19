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
			<h2>{entry.fullname.t + (entry.remark.t === '' ? '' : ' (' + entry.remark.t + ')')}</h2>
			<p>{
				entry.call.t.split('\n').map((item, i) => {
					return (
						<span>
							<a href={`tel:${trimPhone(item)}`}>{item}</a><br />
						</span>
					);
				})
			}</p>
			<p><a href={entry.website.t} target='_blank'>{trimURL(entry.website.t)}</a></p>
		</div>
	);
}

export default Card;
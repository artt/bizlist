import React from 'react';

function SearchBox({searchchange}) {
	return(
		<div>
			<input
				className='searchbox'
				type='search'
				placeholder='company name'
				onChange={searchchange}
				onFocus={handlefocus}
			/>
		</div>
	);
}

function handlefocus(event) {
	event.target.select();
}

export default SearchBox;
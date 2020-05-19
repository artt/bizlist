import React from 'react';

function SearchBox({searchchange}) {
	return(
		<div>
			<input
				type='search'
				placeholder='company name'
				onChange={searchchange}
			/>
		</div>
	);
}

export default SearchBox;
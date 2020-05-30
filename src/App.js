import React, {useState, useEffect} from 'react';
import SearchBox from './SearchBox';
import CardList from './CardList';
import Logo from './Logo';
import './style.css';
import * as myutil from './myutil';

function App() {

	useEffect(() => {
		console.log('fetch')
		fetch('https://spreadsheets.google.com/feeds/list/' + 
				'***REMOVED***/***REMOVED***/public/values?alt=json')
			.then(response => response.text())
			.then(responsetext => processResponse(responsetext));
	}, []);

	const [entries, setEntries] = useState([]);
	const [searchfield, setSearchfield] = useState('');

	console.log('render...')
	if (!entries.length) {
		return <h1>Loading</h1>
	}
	else {
		return (
			<div className='App'>
				<div id='area-logo'>
					<div id='logo-background' />
					<div id='logo-wrapper'>
						<Logo />
						<SearchBox searchchange={onSearchChange} />
					</div>
				</div>
				<div id='area-content'>
					<CardList entries={filterEntries(entries, searchfield)} />
				</div>
			</div>
		);
	}

	function filterEntries(entries, sf) {
		let tmp = [];
		console.log(sf)
		for (const e of entries) {
			let score = scoreEntry(e, sf);
			if (score > 0) {
				tmp.push(Object.assign(e, {'score': score}));
			}
		}
		tmp = tmp.sort((a, b) => b.score - a.score);
		return tmp;
	}

	/* 
	 * Takes in an entry and gives a match score [0–1] based on the searchfield.
	 */
	function scoreEntry(entry, sf) {
		
		const score_names = 1;
		const score_keywords = 0.8;
		const score_others = 0.3;

		// top entries
		let ref_names = [entry.name, entry.fullname];
		if (entry.fullname.substring(0, 6) === 'ธนาคาร') {
			ref_names = ref_names.concat(entry.fullname.substring(6));
		}
		// keywords
		let ref_keywords = [];
		if (entry.keyword) {
			ref_keywords = ref_keywords.concat(entry.keyword.split(',').map((x) => x.trim()));
		}

		// find from top entries and keywords first
		const result_names = ref_names.map((x) => indexToScore(x, sf) * score_names);
		const result_keywords = ref_keywords.map((x) => indexToScore(x, sf) * score_keywords);
		const tmp = Math.max(...result_names, ...result_keywords);
		if (tmp) {
			return tmp;
		}

		// then find from other things
		let ref_others = [myutil.trimURLplus(entry.website),
											myutil.trimFacebook(entry.facebook),
											entry.line,
											entry.call.split('\n').map((x) => x.trim())];
		const result_others = ref_others.map((x) => indexToScore(x, sf) * score_others);
		return Math.max(...result_others);
		
	}

	function indexToScore(str, sf) {
		const idx = str.toString().toLowerCase().replace(/[, -\.]/g,'').indexOf(sf);
		if (idx === -1) {
			return 0
		}
		else if (idx === 0) {
			return 0.5 + 0.5 * (sf.length / str.length);
		}
		return 0.5;
	}

	function processResponse(response) {
		let reducedResponse = JSON.parse(response.replace(/gsx\$|\$/g,'')).feed.entry.filter(entry => {return entry.display.t === 'x'});
		setEntries(reducedResponse.map((e) => {
			return({
				call: e.call.t,
				color: e.color.t,
				email: e.email.t,
				facebook: e.facebook.t,
				fullname: e.fullname.t,
				keyword: e.keyword.t,
				line: e.line.t,
				name: e.name.t,
				remark: e.remark.t,
				website: e.website.t,
				score: 1
			});
		}));
	}

	function onSearchChange(event) {
		console.log('searchchange...')
		setSearchfield(event.target.value.toLowerCase().replace(/[, -\.]/g,''));
	}

}

export default App;

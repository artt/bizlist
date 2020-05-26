import React from 'react';
import SearchBox from './SearchBox';
import CardList from './CardList';
import Logo from './Logo';
import './style.css';
import * as myutil from './myutil';

class App extends React.Component {

	constructor() {
		super();
		this.state = {
			entries: [],
			searchfield: ''
		};
	}

	onSearchChange = (event) => {
		console.log('searchchange...')
		this.setState({searchfield: event.target.value.toLowerCase()})
	}

	filterEntries(entries, sf) {
		let tmp = [];
		console.log(sf)
		for (const [i, e] of entries.entries()) {
			let score = this.scoreEntry(e, sf);
			if (score > 0) {
				tmp.push(Object.assign(e, {'score': score}));
			}
		}
		tmp = tmp.sort((a, b) => b.score - a.score);
		return tmp;
	}

	/* 
	 *Takes in an entry and gives a match score [0–1] based on the searchfield.
	 */
	scoreEntry(entry, sf) {
		
		const score_names = 1;
		const score_keywords = 0.8;
		const score_others = 0.3;

		// top entries
		let ref_names = [entry.name.t, entry.fullname.t];
		if (entry.name.t.substring(0, 6) === 'ธนาคาร') {
			ref_names = ref_names.concat(entry.name.t.substring(6));
		}
		// keywords
		let ref_keywords = [];
		if (entry.keyword.t) {
			ref_keywords = ref_keywords.concat(entry.keyword.t.split(',').map((x) => x.trim()));
		}

		// find from top entries and keywords first
		const result_names = ref_names.map((x) => this.indexToScore(x, sf) * score_names);
		const result_keywords = ref_keywords.map((x) => this.indexToScore(x, sf) * score_keywords);
		const tmp = Math.max(...result_names, ...result_keywords);
		if (tmp) {
			return tmp;
		}

		// then find from other things
		let ref_others = [myutil.trimURLplus(entry.website.t),
											myutil.trimFacebook(entry.facebook.t),
											entry.line.t,
											entry.call.t.split('\n').map((x) => x.trim())];
		const result_others = ref_others.map((x) => this.indexToScore(x, sf) * score_others);
		return Math.max(...result_others);
		
	}

	indexToScore(str, sf) {
		const idx = str.toString().toLowerCase().indexOf(sf);
		if (idx === -1) {
			return 0
		}
		else if (idx === 0) {
			return 0.5 + 0.5 * (sf.length / str.length);
		}
		return 0.5;
	}

	render() {
		console.log('render...')
		const {entries, searchfield} = this.state;
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
							<SearchBox searchchange={this.onSearchChange} />
						</div>
					</div>
					<div id='area-content'>
						<CardList entries={this.filterEntries(entries, searchfield)} />
					</div>
				</div>
			);
		}
	}

	processResponse(response) {
		let reducedResponse = JSON.parse(response.replace(/gsx\$|\$/g,'')).feed.entry.filter(entry => {return entry.display.t === 'x'});
		this.setState({entries: reducedResponse.map(({call, color, email, facebook, fullname, keyword, line, name, remark, website}) => 
																								({call, color, email, facebook, fullname, keyword, line, name, remark, website}))})
	}

	componentDidMount() {
		fetch('https://spreadsheets.google.com/feeds/list/' + 
				'1d9-1TwVhteX5xHlAdGvqhia6Lhcz4rwctGuBH6vDMgo/o9wnly8/public/values?alt=json')
			.then(response => response.text())
			.then(responsetext => this.processResponse(responsetext));
	}

}

export default App;

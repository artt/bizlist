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
		this.setState({searchfield: event.target.value.toLowerCase()})
	}

	filterEntry(entry) {
		// this.scoreEntry(entry)
		return entry.name.t.toLowerCase().includes(this.state.searchfield)
			|| entry.fullname.t.toLowerCase().includes(this.state.searchfield)
			|| entry.keyword.t.toLowerCase().includes(this.state.searchfield)
			|| entry.facebook.t.toLowerCase().includes(this.state.searchfield)
			|| entry.line.t.toLowerCase().includes(this.state.searchfield)
			|| entry.website.t.toLowerCase().includes(this.state.searchfield)
	}

	/* 
	 *Takes in an entry and gives a match score [0–1] based on the searchfield.
	 */
	scoreEntry(entry) {
		
		const sf = this.state.searchfield;
		const idxName = entry.name.t.toLowerCase().indexOf(sf);
		const idxNameFull = entry.fullname.t.toLowerCase().indexOf(sf);
		// deal with banks
		let idxNameBank = -1;
		if (entry.name.t.substring(0, 6) === 'ธนาคาร') {
			idxNameBank = entry.name.t.substring(0, 6).indexOf(sf);
		}

		// process other entries
		
		let ref = [entry.name.t, entry.fullname.t]
		if (entry.name.t.substring(0, 6) === 'ธนาคาร') {
			ref = ref.concat(entry.name.t.substring(6))
		}
		ref = ref.concat(entry.keyword.t.split(','))
			.concat(myutil.trimURL(entry.website.t))
			.concat(myutil.trimFacebook(entry.facebook.t))
			.concat(entry.line.t)
			.concat(entry.call.t.split('\n'))

		
	}

	render() {
		const {entries} = this.state;
		const filteredEntries = entries.filter(entry => this.filterEntry(entry));
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
						<CardList entries={filteredEntries} />
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

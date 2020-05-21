import React from 'react';
import SearchBox from './SearchBox'
import CardList from './CardList'
import './style.css';

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
		return entry.name.t.toLowerCase().includes(this.state.searchfield)
			|| entry.fullname.t.toLowerCase().includes(this.state.searchfield)
			|| entry.keyword.t.toLowerCase().includes(this.state.searchfield)
			|| entry.facebook.t.toLowerCase().includes(this.state.searchfield)
			|| entry.line.t.toLowerCase().includes(this.state.searchfield)
			|| entry.website.t.toLowerCase().includes(this.state.searchfield)
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
					<div id='left'>
						<div className='logo'>BizList</div>
						<SearchBox searchchange={this.onSearchChange} />
					</div>
					<div id='right'>
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

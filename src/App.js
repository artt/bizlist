import React from 'react';
import './App.css';
import SearchBox from './SearchBox'
import Card from './Card'

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      entries: [],
      searchfield: ''
    };
  }

  onSearchChange = (event) => {
    this.setState({searchfield: event.target.value})
    console.log(this.searchfield)
  }

  render() {
    console.log(this.state);
    if (!this.state.entries.length) {
      return <h1>Loading</h1>
    }
    else {
      return (
        <div className="App">
          <h1>Hiiii</h1>
          <Card name={this.state.entries[0].name.t} />
          <SearchBox searchchange={this.onSearchChange} />
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
        '***REMOVED***/***REMOVED***/public/values?alt=json')
      .then(response => response.text())
      .then(responsetext => this.processResponse(responsetext));
  }

}

export default App;

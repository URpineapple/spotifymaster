import React, { Component } from 'react'
import './App.css'
import { FormGroup, InputGroup, FormControl } from 'react-bootstrap'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: ''
        }
    }

    search() {
        const BASE_URL = "https://api.spotify.com/v1/search?"
        const FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`
        console.log('this.state', this.state)
        console.log('FETCH_URL', FETCH_URL)
    }

    render() {
        return (
            <div className="App">
                <div className="App-title">Music Master</div>
                <FormGroup>
                    <InputGroup>
                        <FormControl type="text"
                            placeholder="Search for an artist..."
                            value={this.state.query}
                            onChange={event => { this.setState({ query: event.target.value }) }}
                            onKeyPress={event => {
                                if (event.key === 'Enter') {
                                    this.search()
                                }
                            }} />
                        <button onClick={() => this.search()}>Submit</button>
                    </InputGroup>

                </FormGroup>
                <div className="Profile">
                    <div>Artist Profile</div>
                    <div>Artist Name</div>
                </div>
                <div className="gallery">Gallery</div>
            </div>
        )
    }
}

export default App;
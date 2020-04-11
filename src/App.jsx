import React, { Component } from 'react'
import './App.css'
import { FormGroup, InputGroup, FormControl } from 'react-bootstrap'
import Profile from './Profile'
import queryString from 'query-string'
import Gallery from './Gallery'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            artist: null,
            tracks: [],
            accessToken: ''
        }
    }

    componentDidMount() {
        const parsed = queryString.parse(window.location.search);
        this.setState({
            accessToken: parsed.access_token
        })
        let token = this.state.accessToken
        if (!token)
            return;
        else
            console.log('accesstoken', token)
    }

    search() {
        const BASE_URL = "https://api.spotify.com/v1/search?"
        let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`
        const ALBUM_URL = "https://api.spotify.com/v1/artists/"

        fetch(FETCH_URL, {
            headers: { 'Authorization': 'Bearer ' + this.state.accessToken },
            method: 'GET'
        }).then(response => response.json())
            .then(json => {
                const artist = json.artists.items[0]
                this.setState({ artist })

                FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`
                fetch(FETCH_URL, {
                    headers: { 'Authorization': 'Bearer ' + this.state.accessToken },
                    method: 'GET'
                }).then(response => response.json())
                    .then(json => {
                        console.log('artist\'s top tracks', json)
                        const { tracks } = json
                        this.setState({ tracks })
                    })
            })
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
                {this.state.artist && <Profile artist={this.state.artist} />}
                <Gallery tracks={this.state.tracks} />
            </div>
        )
    }
}

export default App;
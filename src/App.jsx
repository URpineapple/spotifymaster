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
            accessToken: '',
        }
    }

    componentDidMount() {
        const parsed = queryString.parse(window.location.search);
        this.setState({
            accessToken: parsed.access_token
        })
        let token = this.state.accessToken
        console.log('token', token)
        if (!token)
            return;
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
                this.setState({ artist, serverData: { user: { name: json.display_name } } })
                console.log('serverData', this.state.serverData)
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
                {this.state.accessToken ?
                    <div>
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
                    : <div>
                        <button className="btn btn-primary" onClick={() => { window.location = window.location.href.includes('localhost') ? "http://localhost:8888/login" : "https://musicmasters-backend.herokuapp.com/login" }}>Sign in to spotify</button>
                    </div>
                }
            </div>
        )
    }
}

export default App;
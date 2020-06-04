import React, { Component } from 'react'
import './App.css'
import './styles/tablet.css'
import queryString from 'query-string'
import defaultImg from './images/defaultImg.jpg'
import ArtistProfile from './components/ArtistProfile'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PlaylistPage from './components/PlaylistPage'


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            artists: null,
            accessToken: '',
        }
    }

    componentDidMount() {
        const parsed = queryString.parse(window.location.search);
        console.log('parsed', parsed)
        this.setState({
            accessToken: parsed.access_token
        })
        let token = this.state.accessToken
        if (!token)
            return;
    }

    searchArtist = async (e) => {
        const BASE_URL = "https://api.spotify.com/v1/search?"
        let FETCH_URL = `${BASE_URL}q=${e}&type=artist&limit=8`

        this.setState({ query: e })
        if (e) {
            const artistResponse = await fetch(FETCH_URL, {
                headers: { 'Authorization': 'Bearer ' + this.state.accessToken },
                method: 'GET'
            })
            const artistResults = await artistResponse.json()

            const artists = artistResults.artists.items
            this.setState({ artists })
        }
    }


    render() {
        return (
            <div>
                {this.state.accessToken
                    ? <div className="App">
                        <Router>
                            <Navbar />
                            <Switch>
                                <Route exact path="/" render={() =>
                                    <div id="main" className="container">
                                        <div className="App-title">Music Master</div>
                                        <div>
                                            <input id="searchBar" type="text"
                                                placeholder="Search for an artist..."
                                                value={this.state.query}
                                                onChange={event => this.searchArtist(event.target.value)}
                                                onKeyPress={event => {
                                                    if (event.key === 'Enter') {
                                                        this.searchArtist()
                                                    }
                                                }} />
                                        </div>

                                        {this.state.artists
                                            && <div className="row">
                                                {
                                                    this.state.artists.map((artist, index) =>
                                                        <div className="col-6 col-md-3 profile-wrapper" key={index}>
                                                            <div>
                                                                <Link to={`/artist/${artist.id}`}>
                                                                    {
                                                                        artist.images[0]
                                                                            ? <img
                                                                                alt="Artist Profile"
                                                                                className="profile-img"
                                                                                src={artist.images[0].url} />
                                                                            : <img
                                                                                alt="Aritst with no profile"
                                                                                className="profile-img"
                                                                                src={defaultImg} />
                                                                    }
                                                                </Link>
                                                            </div>
                                                            <div className="profile-name">
                                                                <Link to={`/artist/${artist.id}`}>{artist.name}</Link>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        }
                                    </div>
                                }
                                />
                                <Route exact path="/artist/:artistId" render={(props) =>
                                    <div>
                                        <ArtistProfile {...props} accessToken={this.state.accessToken} />
                                    </div>}

                                />
                                <Route exact path="/playlist/:playlistId" render={(props) =>
                                    <div>
                                        <PlaylistPage {...props} accessToken={this.state.accessToken} />
                                    </div>}

                                />
                            </Switch>

                        </Router>
                    </div>
                    : <div className="login">
                        <div className="login-btn">
                            <div className="login-btn-text">Music Master</div>
                            <button
                                onClick={() => { window.location = window.location.href.includes('localhost') ? "http://localhost:8888/login" : "https://musicmasters-backend.herokuapp.com/login" }}>
                                Sign In
                            </button>
                        </div>
                    </div>
                }
            </div>
        )
    }
}


export default App;
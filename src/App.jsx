import React, { Component } from 'react'
import './App.css'
import './styles/tablet.css'
import queryString from 'query-string'
import ArtistProfile from './components/Artist/ArtistProfile'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PlaylistPage from './components/Playlist/PlaylistPage'
import MyPage from './components/Profile/MyPage'
import EditingPlaylist from './components/Editing';

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
        const { accessToken } = this.state
        return (
            <div>
                {accessToken
                    ? <div className="App dark" id="App">
                        <Router>
                            <Navbar />
                            <Switch>
                                <Route exact path="/" render={() => <MyPage accessToken={accessToken} />}
                                />
                                <Route path="/playlist/:playlistId" render={(props) =>
                                    <PlaylistPage {...props} accessToken={accessToken} showEditing={true} />}
                                />
                                <Route path="/editing/:playlistId" render={(props) =>
                                    <EditingPlaylist {...props} accessToken={accessToken} />} />

                            </Switch>
                        </Router>
                    </div>
                    : <div className="login">
                        <div className="login-btn">
                            <div className="login-btn-text">PlaylistPro</div>
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
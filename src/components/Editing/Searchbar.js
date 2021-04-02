import React, { Component } from 'react';
import { withRouter } from "react-router";
import ArtistDisplay from './ArtistDisplay';
import AlbumDisplay from './AlbumDisplay';
import TrackDisplay from './TrackDisplay';

const myXOR = (foo, bar) => (foo && !bar) || (!foo && bar)
const BASE_URL = "https://api.spotify.com/v1/search?";

class Searchbar extends Component {
    state = {
        query: '',
        artists: [],
        albums: [],
        tracks: [],
        showTracksOnly: false,
        showAlbumsOnly: false,
        showArtistsOnly: false,
        showAll: true,
        playlistId: ''
    }

    searchData = async (e) => {
        const query = e.target.value
        const FETCH_URL = `${BASE_URL}q=${query}&type=track,artist,album&limit=6`

        this.setState({
            query,
            showTracksOnly: false,
            showAlbumsOnly: false,
            showArtistsOnly: false,
            showAll: true
        })
        if (query) {
            const artistResponse = await fetch(FETCH_URL, {
                headers: { 'Authorization': 'Bearer ' + this.props.accessToken },
                method: 'GET'
            })
            const searchResults = await artistResponse.json()

            const artists = searchResults?.artists?.items
            const tracks = searchResults?.tracks?.items
            const albums = searchResults?.albums?.items
            this.setState({ artists, albums, tracks })
        }
    }

    showMoreTracks = async () => {
        const FETCH_URL = `${BASE_URL}q=${this.state.query}&type=track&limit=50`
        const response = await fetch(FETCH_URL, {
            headers: { 'Authorization': 'Bearer ' + this.props.accessToken },
            method: 'GET'
        })
        const searchResults = await response.json()
        const tracks = searchResults?.tracks?.items
        this.setState({ tracks, showTracksOnly: true, showAll: false })
    }

    showMoreArtists = async () => {
        const FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=50`
        const response = await fetch(FETCH_URL, {
            headers: { 'Authorization': 'Bearer ' + this.props.accessToken },
            method: 'GET'
        })
        const searchResults = await response.json()
        const artists = searchResults?.artists?.items
        this.setState({ artists, showArtistsOnly: true, showAll: false })
    }

    showMoreAlbums = async () => {
        const FETCH_URL = `${BASE_URL}q=${this.state.query}&type=album&limit=50`
        const response = await fetch(FETCH_URL, {
            headers: { 'Authorization': 'Bearer ' + this.props.accessToken },
            method: 'GET'
        })
        const searchResults = await response.json()
        const albums = searchResults?.albums?.items
        this.setState({ albums, showAlbumsOnly: true, showAll: false })
    }

    render() {
        const { url } = this.props.match;
        const { tracks, artists, albums, showTracksOnly, showAlbumsOnly, showArtistsOnly, showAll } = this.state
        return (
            <div id="main" className="container">
                <div>
                    <input id="searchBar" type="text"
                        placeholder="Search for Songs, Artists or Albums..."
                        value={this.state.query}
                        onChange={this.searchData}
                        onKeyPress={e => {
                            if (e.key === 'Enter') {
                                this.searchData()
                            }
                        }} />
                </div>
                {myXOR(showTracksOnly, showAll) &&
                    <TrackDisplay tracks={tracks}
                        accessToken={this.props.accessToken}
                        showMoreTracks={this.showMoreTracks}
                        showTracksOnly={showTracksOnly}
                        playlistId={this.props.playlistId}
                        updatePlaylist={this.props.updatePlaylist}
                        pathname={url}
                    />
                }
                {myXOR(showArtistsOnly, showAll) &&
                    <ArtistDisplay artists={artists} url={url}
                        showMoreArtists={this.showMoreArtists}
                        showArtistsOnly={showArtistsOnly}
                    />
                }
                {myXOR(showAlbumsOnly, showAll) &&
                    <AlbumDisplay albums={albums} url={url}
                        showMoreAlbums={this.showMoreAlbums}
                        showAlbumsOnly={showAlbumsOnly}
                    />
                }
            </div>
        );
    }
}

export default withRouter(Searchbar);
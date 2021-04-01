import { Link } from "react-router-dom";
import defaultImg from '../images/defaultImg.jpg';
import React, { Component } from 'react';
import Track from '../track';
import { withRouter } from "react-router";

const ArtistDisplay = ({ artists, url, showMoreArtists, showArtistsOnly }) =>
    <>
        { artists?.length > 0 &&
            <div className="result-divider">
                <span className="title">Artists</span>
                {!showArtistsOnly &&
                    <span className="showMore" onClick={showMoreArtists}>See More</span>
                }
            </div>
        }
        <div className="editing-row">
            {
                artists?.map((artist, index) =>
                    <div key={index}>
                        <Link to={`${url}/artist/${artist.id}`}>
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
                        <div className="profile-name">
                            <Link to={`${url}/artist/${artist.id}`}>{artist.name}</Link>
                        </div>
                    </div>)
            }
        </div>
    </>

const AlbumDisplay = ({ albums, url, showMoreAlbums, showAlbumsOnly }) =>
    <>
        {albums?.length > 0 &&
            <div className="result-divider">
                <span className="title">Albums</span>
                {!showAlbumsOnly &&
                    <span className="showMore" onClick={showMoreAlbums}>See More</span>
                }
            </div>
        }
        <div className="editing-row">
            {albums?.map((album, index) =>
                <div className="editing-album" key={index}>
                    <Link to={`${url}/album/${album.id}`}>
                        <img src={album?.images[1]?.url} alt={`cover of ${album.name}`} />
                        <p>{album.name}</p>
                    </Link>
                </div>
            )}
        </div>
    </>


const TrackDisplay = ({ tracks, accessToken, showMoreTracks, showTracksOnly, playlistId, updatePlaylist}) =>
    <>
        {tracks?.length > 0 &&
            <div className="result-divider">
                <span className="title">Tracks</span>
                {!showTracksOnly &&
                    <span className="showMore" onClick={showMoreTracks}>See More</span>
                }
            </div>}
        <div className="row">
            {
                tracks?.map((track, index) =>
                    <div className="col-12" key={index}>
                        <Track index={index} track={track} accessToken={accessToken} draggable="true" playlistId={playlistId} updatePlaylist={updatePlaylist}/>
                    </div>
                )
            }
        </div>
    </>

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
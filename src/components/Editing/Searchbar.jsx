import { Link } from "react-router-dom";
import defaultImg from '../images/defaultImg.jpg';
import React, { Component } from 'react';
import Track from '../track';

const ArtistDisplay = ({ artist }) => {
    return (
        <div className="col-6 col-md-4" >
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
        </div>)
}

const AlbumDisplay = ({ album }) => {
    return (
        <div className="col-6 col-md-4" >
            <img src={album?.images[1]?.url} alt={`cover of ${album.name}`} />
            <p>{album.name}</p>

        </div>
    )
}

const TrackDisplay = ({ track, accessToken}) => {
    return (
        <div className="col-12" >
           <Track index={0} track={track}  accessToken={accessToken}/>
        </div>
    )
}

class Searchbar extends Component {
    state = {
        query: '',
        artists: [],
        albums: [],
        tracks: []
    }


    searchArtist = async (e) => {
        const query = e.target.value
        const BASE_URL = "https://api.spotify.com/v1/search?"
        const FETCH_URL = `${BASE_URL}q=${query}&type=track,artist,album&limit=6`

        this.setState({ query })
        if (query) {
            const artistResponse = await fetch(FETCH_URL, {
                headers: { 'Authorization': 'Bearer ' + this.props.accessToken },
                method: 'GET'
            })
            const searchResults = await artistResponse.json()

            const artists = searchResults?.artists?.items
            const tracks = searchResults?.tracks?.items
            const albums = searchResults?.albums?.items
            console.log('result', tracks)
            this.setState({ artists, albums, tracks })
        }
    }

    render() {
        return (
            <div id="main" className="container">
                <div className="App-title">PlaylistPro</div>
                <div>
                    <input id="searchBar" type="text"
                        placeholder="Search for an artist..."
                        value={this.state.query}
                        onChange={this.searchArtist}
                        onKeyPress={event => {
                            if (event.key === 'Enter') {
                                this.searchArtist()
                            }
                        }} />
                </div>
                <div className="row">
                    {
                        this.state.tracks.map((track, index) =>
                            <TrackDisplay key={index} track={track} accessToken={this.props.accessToken} />
                        )
                    }
                </div>
                <div className="row">
                    {
                        this.state.artists.map((artist, index) =>
                            <ArtistDisplay key={index} artist={artist} />
                        )

                    }
                </div>
                <div className="row">
                    {
                        this.state.albums.map((album, index) =>
                            <AlbumDisplay key={index} album={album} />
                        )
                    }
                </div>

            </div>
        );
    }
}

export default Searchbar;
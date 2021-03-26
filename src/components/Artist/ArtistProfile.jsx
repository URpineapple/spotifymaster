import React, { Component } from 'react'
import Album from './Album'
import defaultImg from '../images/defaultImg.jpg'
import TopButton from '../TopButton'
import Track from '../track'
import MyPlaylist from '../Playlist/MyPlaylist'
import { connect } from 'react-redux';

class ArtistProfile extends Component {
    state = {
        albums: [],
        playlists: [],
        toptracks: [],
        artist: null,
    }

    componentDidMount() {
        this.getTopTracks()
        this.getArtist()
        this.getAlbums()
    }

    getArtist = async () => {
        const accessToken = this.props.accessToken
        const artistId = this.props.match.params.artistId;
        const BASE_URL = `https://api.spotify.com/v1/artists/${artistId}`
        let artistResponse = await fetch(BASE_URL, {
            headers: { 'Authorization': 'Bearer ' + accessToken },
            method: 'GET'
        })
        let artistResult = await artistResponse.json()
        this.setState({ artist: artistResult })
    }

    getAlbums = async () => {
        const accessToken = this.props.accessToken
        const artistId = this.props.match.params.artistId;
        const ALBUM_URL = "https://api.spotify.com/v1/artists/"

        let FETCH_URL = `${ALBUM_URL}${artistId}/albums?country=US&include_groups=album&limit=50`
        let albumResponse = await fetch(FETCH_URL, {
            headers: { 'Authorization': 'Bearer ' + accessToken },
            method: 'GET'
        })
        let albumResult = await albumResponse.json()
        let items = albumResult.items
        this.setState({ albums: items })
    }

    getTopTracks = async () => {
        const accessToken = this.props.accessToken
        const artistId = this.props.match.params.artistId;
        const BASE_URL = `https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=US`
        let toptrackResponse = await fetch(BASE_URL, {
            headers: { 'Authorization': 'Bearer ' + accessToken },
            method: 'GET'
        })
        let toptrackResult = await toptrackResponse.json()
        this.setState({ toptracks: toptrackResult.tracks })
    }

    showPlaylist = (uri) => {
        const popup = document.querySelector(".playlist")
        popup.style.display = "block"
        this.setState({ uri })
    }


    render() {
        return (
            <div className="artistProfile">
                {
                    this.state.artist
                    &&
                    <div className="profile row">
                        <div className="profile-artist">
                            {
                                this.state.artist.images[0]
                                    ? <img
                                        alt="Spotify Artist Profile"
                                        className="profile-artist-img"
                                        src={this.state.artist.images[0].url} />
                                    : <img
                                        alt="Deafult Profile"
                                        className="profile-artist-img"
                                        src={defaultImg} />
                            }
                        </div>

                        <div className="profile-info">
                            <div className="profile-info-name">{this.state.artist.name}</div>
                            <div className="profile-info-followers">{this.state.artist.followers.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} followers</div>
                        </div>
                    </div>
                }
                {
                    this.state.toptracks
                        ? <div className="profile-toptracks">
                            <div className="row profile-toptracks-title">Popular</div>
                            {
                                this.state.toptracks.map((toptrack, index) =>
                                    <Track key={index} index={index} track={toptrack} accessToken={this.props.accessToken} />
                                )
                            }
                        </div>
                        : <div></div>
                }
                {
                    this.state.albums
                        ? <div>
                            {
                                this.state.albums.map((album, index) =>
                                    <Album key={index} album={album} albumId={album.id} accessToken={this.props.accessToken} />)
                            }
                        </div>
                        : <div></div>
                }
                <TopButton />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        uri: state.uri
    }
}


export default connect(mapStateToProps)(ArtistProfile);
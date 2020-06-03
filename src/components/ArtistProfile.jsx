import React, { Component } from 'react'
import Album from './Album'
import defaultImg from '../images/defaultImg.jpg'
import TopButton from './TopButton'

export default class ArtistProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            albums: [],
            playlists: [],
            toptracks: [],
            artist: null,
            playing: false,
            playingUrl: '',
            audio: null
        }
        this.playSong = this.playSong.bind(this)
        this.pauseSong = this.pauseSong.bind(this)
        this.pauseCurrentAudio = this.pauseCurrentAudio.bind(this)
        this.switchSong = this.switchSong.bind(this)
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
        console.log('toptrackResult', toptrackResult)
        this.setState({ toptracks: toptrackResult.tracks })
    }

    playSong(currAudio, previewUrl) {
        this.setState({
            playingUrl: previewUrl,
            playing: true,
            audio: currAudio
        })
    }

    pauseSong() {
        this.setState({
            playingUrl: '',
            playing: false
        })
    }

    pauseCurrentAudio() {
        this.state.audio.pause()
    }

    switchSong(currAudio, previewUrl) {
        this.setState({
            playingUrl: previewUrl,
            audio: currAudio
        })
    }

    handleTrackPlay(previewUrl) {
        let audio = new Audio(previewUrl)
        if (!this.state.playing) {
            audio.play()
            this.playSong(audio, previewUrl)
        } else {
            if (this.state.playingUrl == previewUrl) {
                this.pauseCurrentAudio()
                this.pauseSong()
            } else {
                this.pauseCurrentAudio()
                audio.play()
                this.switchSong(audio, previewUrl)
            }
        }
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
                            <div className="profile-info-followers">{this.state.artist.followers.total} followers</div>
                        </div>
                    </div>
                }
                {
                    this.state.toptracks
                        ? <div className="profile-toptracks">
                            <div className="row profile-toptracks-title">Popular</div>
                            {
                                this.state.toptracks.map((toptrack, index) =>
                                    <div id={`${toptrack.name}${index}`} className="row album-tracks">
                                        <div className="col-1">
                                            <div className="album-tracks-index">{index + 1}</div>
                                            <div className="album-tracks-playButton">{
                                                toptrack.preview_url == null
                                                    ? <div className="album-tracks-play--disable">
                                                        <i className="far fa-times-circle"></i>
                                                    </div>
                                                    : <div className="album-tracks-play">
                                                        {this.state.playingUrl == toptrack.preview_url
                                                            ? <i className="far fa-pause-circle" onClick={() => this.handleTrackPlay(toptrack.preview_url)}></i>
                                                            : <i className="far fa-play-circle" onClick={() => this.handleTrackPlay(toptrack.preview_url)}></i>
                                                        }
                                                    </div>
                                            }
                                            </div>
                                        </div>
                                        <div className="col-10 album-tracks-title">{toptrack.name}</div>
                                        <div id={this.state.uri} className="col-1 album-tracks-add" onClick={(event) => this.showPlaylist(event.target.id)}>
                                            <i className="fa fa-plus"></i>
                                        </div>
                                    </div>)
                            }
                        </div>
                        : <div></div>

                }

                {
                    this.state.albums
                        ? <div>
                            {
                                this.state.albums.map((album, index) =>
                                    <Album key={index} album={album} albumId={album.id} playing={this.state.playing} accessToken={this.props.accessToken} playingUrl={this.state.playingUrl} pauseSong={this.pauseSong} playSong={this.playSong} switchSong={this.switchSong} pauseCurrentAudio={this.pauseCurrentAudio} />)
                            }
                        </div>
                        :
                        <div></div>
                }
                <TopButton />
            </div>
        )
    }
}

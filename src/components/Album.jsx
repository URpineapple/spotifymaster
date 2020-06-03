import React, { Component } from 'react'
import MyPlaylist from './MyPlaylist'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { playAudio, pauseAudio, switchAudio, pauseCurrentAudio } from '../actions'

class Album extends Component {
    state = {
        tracks: [],
        uri: null
    }

    componentDidMount() {
        this.getTracks()
    }

    getTracks = async () => {
        const accessToken = this.props.accessToken

        const albumId = this.props.albumId;
        const BASE_URL = `https://api.spotify.com/v1/albums/${albumId}/tracks?limit=50`
        let trackResponse = await fetch(BASE_URL, {
            headers: { 'Authorization': 'Bearer ' + accessToken },
            method: 'GET'
        })
        let trackResult = await trackResponse.json()
        this.setState({ tracks: trackResult.items })
    }

    handlePlay(previewUrl) {
        if (!this.props.audioState.playing) {
            this.playSong(previewUrl)
        } else {
            if (this.props.audioState.playingUrl == previewUrl) {
                this.pauseSong()
            } else {
                this.pauseSong()
                this.switchSong(previewUrl)
            }
        }
    }

    playSong(previewUrl) {
        this.props.playAudio(previewUrl)
    }

    pauseSong() {
        this.props.pauseAudio()
    }

    switchSong(previewUrl) {
        this.props.switchAudio(previewUrl)
    }

    showPlaylist = (uri) => {
        const popup = document.querySelector(".playlist")
        popup.style.display = "block"
        this.setState({ uri })
    }


    render() {
        const { album } = this.props
        return (
            <div className="container album">
                <div className="row">
                    <div className="col-md-3 album-cover"><img alt="album cover" className="album-cover-img" src={album.images[1].url} /></div>
                    <div className="col-md-9 album-info">
                        <div className="album-info-year">{album.release_date.slice(0, 4)}</div>
                        <div className="album-info-name">{album.name}</div>
                    </div>
                </div>
                <div className="tracks-section">
                    <div className="row album-tracks0">
                        <div className="col-1 album-tracks-index0">#</div>
                        <div className="col-11 album-tracks-title0">TITLE</div>
                    </div>
                    {
                        this.state.tracks &&
                        this.state.tracks.map((track, index) =>
                            <div id={`${track.name}${index}`} className="row album-tracks">
                                <div className="col-1">
                                    <div className="album-tracks-index">{index + 1}</div>
                                    <div className="album-tracks-playButton">{
                                        track.preview_url == null
                                            ? <div className="album-tracks-play--disable">
                                                <i className="far fa-times-circle"></i>
                                            </div>
                                            : <div className="album-tracks-play">
                                                {this.props.playingUrl == track.preview_url
                                                    ? <i className="far fa-pause-circle" onClick={() => this.handlePlay(track.preview_url)}></i>
                                                    : <i className="far fa-play-circle" onClick={() => this.handlePlay(track.preview_url)}></i>
                                                }
                                            </div>
                                    }
                                    </div>
                                </div>
                                <div className="col-10 album-tracks-title">{track.name}</div>
                                <div id={this.state.uri} className="col-1 album-tracks-add" onClick={(event) => this.showPlaylist(event.target.id)}>
                                    <i className="fa fa-plus"></i>
                                </div>
                            </div>)
                    }
                </div>
                <MyPlaylist uri={this.state.uri} accessToken={this.props.accessToken} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        audioState: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        playAudio: playAudio,
        pauseAudio: pauseAudio,
        switchAudio: switchAudio,
        pauseCurrentAudio: pauseCurrentAudio
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Album);
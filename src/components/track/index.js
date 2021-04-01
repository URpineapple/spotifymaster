import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { playAudio, pauseAudio, switchAudio, getURI } from '../../actions'
import './track.css';

class Track extends Component {
    state = {
        playingUrl: '',
        audio: null
    }

    handlePlay(previewUrl) {
        if (!this.props.playing) {
            this.playSong(previewUrl)
        } else {
            if (this.props.playingUrl == previewUrl) {
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

    showPlaylist = uri => {
        const popup = document.querySelector(".playlist")
        popup.style.display = "flex"
        this.props.getURI(uri)
    }

    dragTrack = (e) => {
        e.dataTransfer.setData('text', this.props.track.uri);
    }

    durationCovert = (time) => {
        let min = Math.round((time / 1000) / 60)
        let sec = Math.round((time / 1000) % 60)
        sec = sec <= 9 ? 0 + sec.toString() : sec
        return min + ':' + sec
    }

    addSongtoPlaylist = async (trackUri, playlistId) => {
        const accessToken = this.props.accessToken;
        const URL = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${trackUri}`
        let response = await fetch(URL, {
            headers: { 'Authorization': 'Bearer ' + accessToken },
            method: 'POST',
        })
        this.props.updatePlaylist()
    }

    render() {
        const { name, previewUrl, uri, duration_ms, artists } = this.props.track
        const { playlistId, draggable } = this.props
        return (
            <div id={name}
                className="row album-tracks"
                draggable={draggable}
                onDragStart={e => this.dragTrack(e)}>
                <div className="col-1">
                    {this.props.playingUrl == previewUrl && previewUrl
                        ? <div className="album-tracks-index">
                            <i className="fa fa-volume-up"></i>
                        </div>
                        : <div className="album-tracks-index">
                            {this?.props?.index + 1}
                        </div>
                    }
                    <div className="album-tracks-playButton">{
                        previewUrl == null
                            ? <div className="album-tracks-play--disable">
                                <i className="far fa-times-circle"></i>
                            </div>
                            : <div className="album-tracks-play">
                                {this.props.playingUrl == previewUrl
                                    ? <i className="far fa-pause-circle" onClick={() => this.handlePlay(this.props.previewUrl)}></i>
                                    : <i className="far fa-play-circle" onClick={() => this.handlePlay(this.props.previewUrl)}></i>
                                }
                            </div>
                    }
                    </div>
                </div>
                <div className="col-9 album-tracks-title">
                    <div>{name}</div>
                    <div className="tracks-artist">
                        {artists.map((artist, index) =>
                            <span key={index}>
                                {artist.name}
                                {index != artists.length - 1 && ', '}
                            </span>
                        )}
                    </div>
                </div>
                <div className="col-1">
                    {this.durationCovert(duration_ms)}
                </div>
                <div className="col-1 album-tracks-add">
                    <i className="fa fa-plus" onClick={() => this.addSongtoPlaylist(uri, playlistId)}></i>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        playing: state.playing,
        playingUrl: state.playingUrl,
        audio: state.audio
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        playAudio: playAudio,
        pauseAudio: pauseAudio,
        switchAudio: switchAudio,
        getURI: getURI
    }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Track)

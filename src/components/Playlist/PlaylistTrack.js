import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { playAudio, pauseAudio, switchAudio } from '../../actions'
import './playlist.css';

class PlaylistTrack extends Component {
    state = {
        playingUrl: '',
        audio: null
    }

    handlePlay(previewUrl, index) {
        if (!this.props.playing) {
            this.playSong(previewUrl, index)
        } else {
            if (this.props.playingUrl == previewUrl && index == this.props.playingIndex) {
                this.pauseSong()
            } else {
                this.pauseSong()
                this.switchSong(previewUrl, index)
            }
        }
    }

    playSong(previewUrl, index) {
        this.props.changePlayingIndex(index)
        this.props.playAudio(previewUrl)
    }

    pauseSong() {
        this.props.changePlayingIndex(null)
        this.props.pauseAudio()
    }

    switchSong(previewUrl, index) {
        this.props.changePlayingIndex(index)
        this.props.switchAudio(previewUrl)
    }

    isPlaying(previewUrl, index) {
        return this.props.playingUrl == previewUrl && previewUrl && index == this.props.playingIndex
    }

    durationCovert = (time) => {
        let min = Math.round((time / 1000) / 60)
        let sec = Math.round((time / 1000) % 60)
        sec = sec <= 9 ? 0 + sec.toString() : sec
        return min + ':' + sec
    }

    render() {
        const { track, index } = this.props
        const { name, preview_url, uri, duration_ms, artists } = this.props.track
        return (
            <div id={`${track.name}${index}`} className="row playlist-tracks">
                <div className="col-1">
                    <div className="playlist-tracks-index">
                        {
                            this.isPlaying(preview_url, index)
                                ? <i className="fa fa-volume-up"></i>
                                : index + 1
                        }
                    </div>
                    <div className="playlist-tracks-playButton">{
                        preview_url == null
                            ? <div className="playlist-tracks-play--disable">
                                <i className="far fa-times-circle"></i>
                            </div>
                            : <div className="playlist-tracks-play">
                                <i className={this.isPlaying(preview_url, index)
                                    ? "far fa-pause-circle"
                                    : "far fa-play-circle"}
                                    onClick={() => this.handlePlay(preview_url, index)}>
                                </i>
                            </div>
                    }
                    </div>
                </div>
                <div className="col-9 playlist-tracks-title">
                    <div>{name}</div>
                    <div className="playlist-tracks-artist">
                        {artists.map((artist, i) =>
                            <span key={i}>
                                {artist.name}{i != artists.length - 1 && ', '}
                            </span>
                        )}
                    </div>
                </div>
                <div className="col-1">
                    {this.durationCovert(duration_ms)}
                </div>
                <div className="col-1 playlist-tracks-add"
                    onClick={() => this.props.deleteTrack(uri, index)}>
                    <i className="fa fa-times"></i>
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
        switchAudio: switchAudio
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistTrack)

import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { playAudio, pauseAudio, switchAudio } from '../actions'

class PlaylistTrack extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playingUrl: '',
            audio: null,
            playingIndex: null
        }
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

    isPlaying(previewUrl, index){
        return this.props.playingUrl = this.props.playingUrl == previewUrl && previewUrl
    }

    render() {
        const { track } = this.props
        return (
            <div id={`${this.props.name}${this.props.index}`} className="row album-tracks">
                <div className="col-1">
                    {this.props.playingUrl == track.preview_url && track.preview_url
                        ? <div className="album-tracks-index">
                            <i className="fa fa-volume-up"></i>
                        </div>
                        : <div className="album-tracks-index">
                            {this.props.index + 1}
                        </div>
                    }
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
                <div className="col-1 album-tracks-add">
                    <i className="fa fa-plus"></i>
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

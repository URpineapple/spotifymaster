import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { playAudio, pauseAudio, switchAudio } from '../../actions'

class PlaylistTrack extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playingUrl: '',
            audio: null
        }
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

    render() {
        const { track, index } = this.props
        return (
            <div id={`${track.name}${index}`} className="row album-tracks">
                <div className="col-1">
                    {this.isPlaying(track.preview_url, index)
                        ? <div className="album-tracks-index">
                            <i className="fa fa-volume-up"></i>
                        </div>
                        : <div className="album-tracks-index">
                            {index + 1}
                        </div>
                    }
                    <div className="album-tracks-playButton">{
                        track.preview_url == null
                            ? <div className="album-tracks-play--disable">
                                <i className="far fa-times-circle"></i>
                            </div>
                            : <div className="album-tracks-play">
                                {this.isPlaying(track.preview_url, index)
                                    ? <i className="far fa-pause-circle" onClick={() => this.handlePlay(track.preview_url, index)}></i>
                                    : <i className="far fa-play-circle" onClick={() => this.handlePlay(track.preview_url, index)}></i>
                                }
                            </div>
                    }
                    </div>
                </div>
                <div className="col-10 album-tracks-title">{track.name}</div>
                <div className="col-1 album-tracks-add">
                    <i className="fa fa-times" onClick={() => this.props.deleteTrack(track.uri, index)}></i>
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

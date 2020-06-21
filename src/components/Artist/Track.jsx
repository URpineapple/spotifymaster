import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { playAudio, pauseAudio, switchAudio, getURI } from '../../actions'

class Track extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playingUrl: '',
            audio: null
        }
        // this.showPlaylist = this.showPlaylist.bind(this)
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

    render() {
        return (
            <div id={`${this.props.name}${this.props.index}`} className="row album-tracks">
                <div className="col-1">
                    {this.props.playingUrl == this.props.previewUrl && this.props.previewUrl
                        ? <div className="album-tracks-index">
                            <i className="fa fa-volume-up"></i>
                        </div>
                        : <div className="album-tracks-index">
                            {this.props.index + 1}
                        </div>
                    }
                    <div className="album-tracks-playButton">{
                        this.props.previewUrl == null
                            ? <div className="album-tracks-play--disable">
                                <i className="far fa-times-circle"></i>
                            </div>
                            : <div className="album-tracks-play">
                                {this.props.playingUrl == this.props.previewUrl
                                    ? <i className="far fa-pause-circle" onClick={() => this.handlePlay(this.props.previewUrl)}></i>
                                    : <i className="far fa-play-circle" onClick={() => this.handlePlay(this.props.previewUrl)}></i>
                                }
                            </div>
                    }
                    </div>
                </div>
                <div className="col-10 album-tracks-title">{this.props.name}</div>
                <div className="col-1 album-tracks-add">
                    <i id={this.props.spotifyURI} className="fa fa-plus" onClick={event => this.showPlaylist(event.target.id)}></i>
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

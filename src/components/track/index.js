import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { playAudio, pauseAudio, switchAudio, getURI } from '../../actions'
import './track.css';

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

    dragTrack = (e) => {
        e.dataTransfer.setData('text', this.props.track.uri);
    }

    render() {
        // console.log('track', this.props.track)
        const {name, previewUrl, spotifyURI} = this.props.track
        return (
            <div id={`${name}`} 
            className="row album-tracks" 
            draggable={this.props.draggable} 
            onDragStart={e => this.dragTrack(e)}>
                <div className="col-1">
                    {this.props.playingUrl == previewUrl && previewUrl
                        ? <div className="album-tracks-index">
                            <i className="fa fa-volume-up"></i>
                        </div>
                        : <div className="album-tracks-index">
                            {0 + 1}
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
                <div className="col-10 album-tracks-title">{name}</div>
                <div className="col-1 album-tracks-add">
                    <i id={spotifyURI} className="fa fa-plus" onClick={event => this.showPlaylist(event.target.id)}></i>
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

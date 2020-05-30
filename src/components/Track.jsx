import React, { Component } from 'react'

export default class Track extends Component {
    constructor(props){
        super(props);
        this.state = {
            playingUrl: '',
            audio: null
        }
    }
    


    playAudio(previewUrl) {
        console.log('previewUrl', previewUrl)
        let audio = new Audio(previewUrl)
        if (!this.props.playing) {
            audio.play()
            this.setState({
                playingUrl: previewUrl,
                audio
            })
            this.props.togglePlaying();
        } else {
            if (this.state.playingUrl == previewUrl) {
                this.state.audio.pause()
                this.setState({
                    playingUrl: ''
                })
                this.props.togglePlaying();
            } else {
                this.state.audio.pause()
                audio.play()
                this.setState({
                    playingUrl: previewUrl,
                    audio
                })
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
            <div id={`${this.props.name}${this.props.index}`} className="row album-tracks">
                <div className="col-1">
                    <div className="album-tracks-index">{this.props.index + 1}</div>
                    <div className="album-tracks-playButton">{
                        this.props.previewUrl == null
                            ? <div className="album-tracks-play--disable">
                                <i className="far fa-times-circle"></i>
                            </div>
                            : <div className="album-tracks-play">
                                {this.state.playingUrl == this.props.previewUrl
                                    ? <i className="far fa-pause-circle" onClick={() => this.playAudio(this.props.previewUrl)}></i>
                                    : <i className="far fa-play-circle" onClick={() => this.playAudio(this.props.previewUrl)}></i>
                                }
                            </div>
                    }
                    </div>
                </div>
                <div className="col-10 album-tracks-title">{this.props.name}</div>
                <div id={this.props.uri} className="col-1 album-tracks-add" onClick={(event) => this.showPlaylist(event.target.id)}>
                    <i className="fa fa-plus"></i>
                </div>
            </div>
        )
    }
}

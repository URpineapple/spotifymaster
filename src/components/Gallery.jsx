import React, { Component } from 'react'

export default class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playingUrl: '',
            audio: null,
            playing: false,
            albumId: null,
        }
    }

    getTracks() {
        const { albumId } = this.state
        const BASE_URL = "https://api.spotify.com/v1"
        const TRACKS_URL = `${BASE_URL}/albums/${albumId}/tracks`
    }

    playAudio(previewUrl) {
        let audio = new Audio(previewUrl)
        if (!this.state.playing) {
            audio.play()
            this.setState({
                playing: true,
                playingUrl: previewUrl,
                audio
            })
        } else {
            if (this.state.playingUrl == previewUrl) {
                this.state.audio.pause()
                this.setState({
                    playing: false,
                    playingUrl: ''
                })
            } else {
                this.state.audio.pause()
                audio.play()
                this.setState({
                    playingUrl: previewUrl,
                    playing: true,
                    audio
                })
            }
        }

    }
    render() {
        const { tracks } = this.props
        return (
            <div className="gallery">
                {
                    tracks.map((track, index) => {
                        const trackImg = track.album.images[0].url;
                        return (
                            <div key={index} className="track" onClick={() => this.playAudio(track.preview_url)}>
                                <img src={trackImg} alt="track" className="track-img" />
                                <div className="track-play">
                                    {track.preview_url == null
                                        ? <div className="track-play-inner bg-red"><span>X</span></div>
                                        : <div className="track-play-inner bg-default">
                                            {this.state.playingUrl == track.preview_url
                                                ? <span>| |</span>
                                                : <span><i className="fa fa-play"></i></span>
                                            }
                                        </div>
                                    }
                                </div>
                                <p className="track-text">{track.name}</p>
                            </div>
                        )

                    })
                }
            </div>
        )
    }
}

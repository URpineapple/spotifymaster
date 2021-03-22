import React, { Component } from 'react'
import Track from '../track'

class Album extends Component {
    state = {
            tracks: [],
            uri: null
    }
    // this.showPlaylist = this.showPlaylist.bind(this)
    
    componentDidMount() {
        this.getTracks()
    }

    getTracks = async () => {
        const accessToken = this.props.accessToken
        const albumId = this.props.albumId ? this.props.albumId : this.props.match.params.albumId;
        const BASE_URL = `https://api.spotify.com/v1/albums/${albumId}`
        let trackResponse = await fetch(BASE_URL, {
            headers: { 'Authorization': 'Bearer ' + accessToken },
            method: 'GET'
        })
        let trackResult = await trackResponse.json()
        this.setState({ album: trackResult, tracks: trackResult.tracks.items })
    }

    showPlaylist(uri) {
        const popup = document.querySelector(".playlist")
        popup.style.display = "block"
        this.setState({ uri })
    }


    render() {
        const { album } = this.state;
        return (
            <div className="container album">
                <div className="row">
                    <div className="col-md-3 album-cover"><img alt="album cover" className="album-cover-img" src={album?.images[1]?.url} /></div>
                    <div className="col-md-9 album-info">
                        <div className="album-info-year">{album?.release_date.slice(0, 4)}</div>
                        <div className="album-info-name">{album?.name}</div>
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
                            <Track key={index} index={index} name={track.name} spotifyURI={track.uri} previewUrl={track.preview_url} accessToken={this.props.accessToken}/>
                        )
                    }
                </div>
            </div>
        )
    }
}


export default Album;
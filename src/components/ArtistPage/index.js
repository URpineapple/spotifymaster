import React, { Component } from 'react';
import defaultImg from '../images/defaultImg.jpg';
import Track from '../track';
import TrackHeader from '../track/trackHeader';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import './artist.css';

const AlbumDisplay = ({ album, url }) =>
    <div className="artist-album">
        <Link to={`${url}/album/${album.id}`}>
            <img src={album?.images[1]?.url} alt={`cover of ${album.name}`} />
            <p>{album.name}</p>
        </Link>
    </div>


class ArtistProfile extends Component {
    state = {
        albums: [],
        toptracks: [],
        artist: null,
    }

    componentDidMount() {
        this.getArtistData()
    }
    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.match.params.artistId !== prevProps.match.params.artistId) {
            this.getArtistData()
        }
      }

    getArtistData = async () => {
        const accessToken = this.props.accessToken
        const artistId = this.props.match.params.artistId;
        const BASE_URL = `https://api.spotify.com/v1/artists/`;
        const ARTIST_URL = `https://api.spotify.com/v1/artists/${artistId}`;
        const ALBUM_URL = `${BASE_URL}${artistId}/albums?country=US&include_groups=album&limit=6`;
        const TOPTRACKS_URL = `https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=US`;

        //get artist data
        let artistResponse = await fetch(ARTIST_URL, {
            headers: { 'Authorization': 'Bearer ' + accessToken },
            method: 'GET'
        })
        let artistResult = await artistResponse.json()

        //get top tracks of the artist
        let toptrackResponse = await fetch(TOPTRACKS_URL, {
            headers: { 'Authorization': 'Bearer ' + accessToken },
            method: 'GET'
        })
        let toptrackResult = await toptrackResponse.json()

        //get the top 6 albums of the artist
        let albumResponse = await fetch(ALBUM_URL, {
            headers: { 'Authorization': 'Bearer ' + accessToken },
            method: 'GET'
        })
        let albumResult = await albumResponse.json()
        let albums = albumResult.items

        this.setState({ artist: artistResult, albums, toptracks: toptrackResult.tracks })
    }

    showAllAlbums = async () => {
        const accessToken = this.props.accessToken
        const artistId = this.props.match.params.artistId;
        const BASE_URL = `https://api.spotify.com/v1/artists/`;
        const ALBUM_URL = `${BASE_URL}${artistId}/albums?country=US&include_groups=album`;
        let albumResponse = await fetch(ALBUM_URL, {
            headers: { 'Authorization': 'Bearer ' + accessToken },
            method: 'GET'
        })
        let albumResult = await albumResponse.json()
        let albums = albumResult.items
        this.setState({ albums })
    }

    render() {
        const { pathname, accessToken, playlistId } = this.props;
        const { toptracks, albums, artist } = this.state;
        return (
            <>
                <div className="artistProfile">
                    {
                        this.state.artist &&
                        <div className="profile row">
                            <div className="profile-artist">
                                {
                                    artist?.images[0]
                                        ? <img
                                            alt="Spotify Artist Profile"
                                            className="profile-artist-img"
                                            src={artist.images[0].url} />
                                        : <img
                                            alt="Deafult Profile"
                                            className="profile-artist-img"
                                            src={defaultImg} />
                                }
                            </div>
                            <div className="profile-info">
                                <div className="profile-info-name">{this.state.artist.name}</div>
                                <div className="profile-info-followers">
                                    {artist?.followers?.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} followers
                                </div>
                            </div>
                        </div>
                    }
                    <div className="profile-toptracks">
                        <div className="row profile-toptracks-title">Popular</div>
                        <TrackHeader />
                        {
                            toptracks.map((toptrack, index) =>
                                <Track key={index}
                                    index={index}
                                    track={toptrack}
                                    draggable="true"
                                    accessToken={accessToken}
                                    playlistId={playlistId}
                                    updatePlaylist={this.props.updatePlaylist}
                                    pathname={pathname} />)
                        }
                    </div>
                    <div className="album-titlerow">
                        <span className="title">Albums</span>
                        <span className="showAll" onClick={this.showAllAlbums}>Show All</span>
                    </div>
                    <div className="album-row">
                        {
                            albums.map((album, index) =>
                                <AlbumDisplay key={index} album={album} url={pathname} />)
                        }
                    </div>
                </div>

            </>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        uri: state.uri
    }
}


export default connect(mapStateToProps)(ArtistProfile);
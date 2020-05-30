import React, { Component } from 'react'

export default class Profile extends Component {
    render() {
        return (
            <div className="row profile">
                {
                    this.props.artists.map(artist =>
                        <div className="col-3 profile-wrapper">
                            <div className="">{artist.images[0] && <img
                                alt="Profile"
                                className="profile-img"
                                src={artist.images[0].url} />}</div>
                            <div className="profile-name">{artist.name}</div>
                        </div>
                    )
                }
            </div>
        )
    }
}

import { Link } from "react-router-dom";
import defaultImg from '../images/defaultImg.jpg';
import React from 'react';

export default function ArtistDisplay({ artists, url, showMoreArtists, showArtistsOnly }) {
    return (
        <>
            { artists?.length > 0 &&
                <div className="result-divider">
                    <span className="title">Artists</span>
                    {!showArtistsOnly &&
                        <span className="showMore" onClick={showMoreArtists}>See More</span>
                    }
                </div>
            }
            <div className="editing-row">
                {
                    artists?.map((artist, index) =>
                        <div key={index}>
                            <Link to={`${url}/artist/${artist.id}`}>
                                {
                                    artist.images[0]
                                        ? <img
                                            alt="Artist Profile"
                                            className="profile-img"
                                            src={artist.images[0].url} />
                                        : <img
                                            alt="Aritst with no profile"
                                            className="profile-img"
                                            src={defaultImg} />
                                }
                            </Link>
                            <div className="profile-name">
                                <Link to={`${url}/artist/${artist.id}`}>{artist.name}</Link>
                            </div>
                        </div>)
                }
            </div>
        </>
    )
}

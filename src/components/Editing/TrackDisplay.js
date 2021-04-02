import React from 'react';
import Track from '../track';
import TrackHeader from '../track/trackHeader';

export default function TrackDisplay({ tracks, accessToken, showMoreTracks, showTracksOnly, playlistId, updatePlaylist, pathname }) {
    return (
        <>
            {tracks?.length > 0 &&
                <>
                    <div className="result-divider">
                        <span className="title">Tracks</span>
                        {!showTracksOnly &&
                            <span className="showMore" onClick={showMoreTracks}>See More</span>
                        }
                    </div>
                    <TrackHeader />
                </>
            }
            <div className="row">
                {
                    tracks?.map((track, index) =>
                        <div className="col-12" key={index}>
                            <Track index={index} track={track} accessToken={accessToken} draggable="true" playlistId={playlistId} updatePlaylist={updatePlaylist} pathname={pathname} />
                        </div>
                    )
                }
            </div>
        </>
    )
}
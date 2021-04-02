import React from 'react';
import './track.css'

export default function TrackHeader() {
    return (
        <div className="row album-tracks0">
            <div className="col-1 album-tracks-index0">#</div>
            <div className="col-9 album-tracks-title0">TITLE</div>
            <div className="col-1 album-tracks-time"><i className="far fa-clock"></i></div>
            <div className="col-1"></div>
        </div>
    )
}
import { Link } from "react-router-dom";
import React from 'react';

export default function AlbumDisplay({ albums, url, showMoreAlbums, showAlbumsOnly }){
    return (
        <>
            {albums?.length > 0 &&
                <div className="result-divider">
                    <span className="title">Albums</span>
                    {!showAlbumsOnly &&
                        <span className="showMore" onClick={showMoreAlbums}>See More</span>
                    }
                </div>
            }
            <div className="editing-row">
                {albums?.map((album, index) =>
                    <div className="editing-album" key={index}>
                        <Link to={`${url}/album/${album.id}`}>
                            <img src={album?.images[1]?.url} alt={`cover of ${album.name}`} />
                            <p>{album.name}</p>
                        </Link>
                    </div>
                )}
            </div>
        </>
    )
}

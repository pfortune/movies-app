import React, { useState, useCallback } from "react";
import { BaseMediaProps, Review } from "../types/interfaces";

interface MediaContextInterface {
    favourites: number[];
    addToFavourites: (media: BaseMediaProps) => void;
    removeFromFavourites: (media: BaseMediaProps) => void;
    addReview: (media: BaseMediaProps, review: Review) => void;
    reviews: { [key: number]: Review };
    playlist: number[];
    addToPlaylist: (media: BaseMediaProps) => void;
    removeFromPlaylist: (media: BaseMediaProps) => void;
}

const initialContextState: MediaContextInterface = {
    favourites: [],
    reviews: {},
    playlist: [],
    addToFavourites: () => { },
    removeFromFavourites: () => { },
    addReview: () => { },
    addToPlaylist: () => { },
    removeFromPlaylist: () => { },
};

export const MediaContext = React.createContext<MediaContextInterface>(initialContextState);

const MediaContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [favourites, setFavourites] = useState<number[]>([]);
    const [reviews, setReviews] = useState<{ [key: number]: Review }>({});
    const [playlist, setPlaylist] = useState<number[]>([]);

    const addReview = useCallback((media: BaseMediaProps, review: Review) => {
        setReviews((prevReviews) => ({ ...prevReviews, [media.id]: review }));
    }, []);

    const addToFavourites = useCallback((media: BaseMediaProps) => {
        setFavourites((prevFavourites) => {
            if (!prevFavourites.includes(media.id)) {
                return [...prevFavourites, media.id];
            }
            return prevFavourites;
        });
    }, []);

    const removeFromFavourites = useCallback((media: BaseMediaProps) => {
        setFavourites((prevFavourites) => prevFavourites.filter((mId) => mId !== media.id));
    }, []);

    const addToPlaylist = useCallback((media: BaseMediaProps) => {
        setPlaylist((prevPlaylist) => {
            if (!prevPlaylist.includes(media.id)) {
                console.log("Adding media to playlist:", media);
                return [...prevPlaylist, media.id];
            }
            return prevPlaylist;
        });
    }, []);

    const removeFromPlaylist = useCallback((media: BaseMediaProps) => {
        setPlaylist((prevPlaylist) => prevPlaylist.filter((mId) => mId !== media.id));
    }, []);

    return (
        <MediaContext.Provider
            value={{
                favourites,
                reviews,
                playlist,
                addToFavourites,
                removeFromFavourites,
                addReview,
                addToPlaylist,
                removeFromPlaylist,
            }}
        >
            {children}
        </MediaContext.Provider>
    );
};

export default MediaContextProvider;

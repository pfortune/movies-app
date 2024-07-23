import React, { useState, useCallback } from "react";
import { BaseMovieProps, Review } from "../types/interfaces";

interface MovieContextInterface {
    favourites: number[];
    addToFavourites: (movie: BaseMovieProps) => void;
    removeFromFavourites: (movie: BaseMovieProps) => void;
    addReview: (movie: BaseMovieProps, review: Review) => void;
    reviews: { [key: number]: Review };
    playlist: number[];
    addToPlaylist: (movie: BaseMovieProps) => void;
    removeFromPlaylist: (movie: BaseMovieProps) => void;
}

const initialContextState: MovieContextInterface = {
    favourites: [],
    reviews: {},
    playlist: [],
    addToFavourites: () => { },
    removeFromFavourites: () => { },
    addReview: () => { },
    addToPlaylist: () => { },
    removeFromPlaylist: () => { },
};

export const MoviesContext = React.createContext<MovieContextInterface>(initialContextState);

const MoviesContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [favourites, setFavourites] = useState<number[]>([]);
    const [reviews, setReviews] = useState<{ [key: number]: Review }>({});
    const [playlist, setPlaylist] = useState<number[]>([]);

    const addReview = useCallback((movie: BaseMovieProps, review: Review) => {
        setReviews((prevReviews) => ({ ...prevReviews, [movie.id]: review }));
    }, []);

    const addToFavourites = useCallback((movie: BaseMovieProps) => {
        setFavourites((prevFavourites) => {
            if (!prevFavourites.includes(movie.id)) {
                return [...prevFavourites, movie.id];
            }
            return prevFavourites;
        });
    }, []);

    const removeFromFavourites = useCallback((movie: BaseMovieProps) => {
        setFavourites((prevFavourites) => prevFavourites.filter((mId) => mId !== movie.id));
    }, []);

    const addToPlaylist = useCallback((movie: BaseMovieProps) => {
        setPlaylist((prevPlaylist) => {
            if (!prevPlaylist.includes(movie.id)) {
                console.log("Adding movie to playlist:", movie);
                return [...prevPlaylist, movie.id];
            }
            return prevPlaylist;
        });
    }, []);

    const removeFromPlaylist = useCallback((movie: { id: number; title?: string }) => {
        setPlaylist((prevPlaylist) => prevPlaylist.filter((mId) => mId !== movie.id));
    }, []);


    return (
        <MoviesContext.Provider
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
        </MoviesContext.Provider>
    );
};

export default MoviesContextProvider;

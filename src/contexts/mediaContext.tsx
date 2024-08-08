import React, { useState, useEffect, useCallback } from "react";
import { BaseMediaProps, Review } from "../types/interfaces";
import { useAuth } from "../hooks/useAuth";
import { createClient } from "@supabase/supabase-js";

// Supabase client setup
const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY
);

interface FantasyMovieFormData {
    title: string;
    description: string;
    genreId: string;
    genreName: string;
    releaseDate: string;
    runtime: number | string;
    director: string;
    cast: string[];
    oscarWinner: boolean;
    posterFile: File | null;
    poster: string | null;
    productionCompany: string;
}

interface MediaContextInterface {
    favourites: number[];
    addToFavourites: (media: BaseMediaProps) => void;
    removeFromFavourites: (media: BaseMediaProps) => void;
    addReview: (media: BaseMediaProps, review: Review) => void;
    getReview: (mediaId: number) => Promise<Review | null>;
    reviews: { [key: number]: Review };
    playlist: number[];
    addToPlaylist: (media: BaseMediaProps) => void;
    removeFromPlaylist: (media: BaseMediaProps) => void;
    saveFantasyMovie: (movie: FantasyMovieFormData) => Promise<void>;
    getFantasyMovies: () => Promise<FantasyMovieFormData[]>;
}

const initialContextState: MediaContextInterface = {
    favourites: [],
    reviews: {},
    playlist: [],
    addToFavourites: () => { },
    removeFromFavourites: () => { },
    addReview: () => { },
    getReview: async () => Promise.resolve(null),
    addToPlaylist: () => { },
    removeFromPlaylist: () => { },
    saveFantasyMovie: async () => { },
    getFantasyMovies: async () => [],
};

export const MediaContext = React.createContext<MediaContextInterface>(initialContextState);

const MediaContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { user } = useAuth();
    const [favourites, setFavourites] = useState<number[]>([]);
    const [reviews, setReviews] = useState<{ [key: number]: Review }>({});
    const [playlist, setPlaylist] = useState<number[]>([]);

    // Fetch favourites, playlist, and reviews from Supabase on load
    useEffect(() => {
        if (user) {
            const fetchUserData = async () => {
                const { data: favData } = await supabase
                    .from("favourites")
                    .select("media_id")
                    .eq("user_id", user.id);

                const { data: playlistData } = await supabase
                    .from("playlist")
                    .select("media_id")
                    .eq("user_id", user.id);

                const { data: reviewData } = await supabase
                    .from("reviews")
                    .select("id, media_id, content, author, agree, rating")
                    .eq("user_id", user.id);

                if (favData) {
                    setFavourites(favData.map((item) => item.media_id));
                }

                if (playlistData) {
                    setPlaylist(playlistData.map((item) => item.media_id));
                }

                if (reviewData) {
                    const reviewsMap = reviewData.reduce((acc, review) => {
                        acc[review.media_id] = {
                            id: review.id,
                            content: review.content,
                            author: review.author,
                            agree: review.agree,
                            rating: review.rating,
                            movieId: review.media_id,
                        };
                        return acc;
                    }, {} as { [key: number]: Review });
                    setReviews(reviewsMap);
                }
            };

            fetchUserData();
        }
    }, [user]);

    // Add to favourites and sync with Supabase
    const addToFavourites = useCallback(async (media: BaseMediaProps) => {
        if (!user) return;

        setFavourites((prevFavourites) => {
            if (!prevFavourites.includes(media.id)) {
                supabase
                    .from("favourites")
                    .insert({ user_id: user.id, media_id: media.id })
                    .then(({ error }) => {
                        if (error) {
                            console.error("Error inserting favourite:", error.message);
                        }
                    });

                return [...prevFavourites, media.id];
            }
            return prevFavourites;
        });
    }, [user, setFavourites]);

    // Remove from favourites and sync with Supabase
    const removeFromFavourites = useCallback(async (media: BaseMediaProps) => {
        if (!user) return;

        setFavourites((prevFavourites) => {
            const updatedFavourites = prevFavourites.filter((mId) => mId !== media.id);
            return updatedFavourites;
        });

        try {
            const { error } = await supabase
                .from("favourites")
                .delete()
                .eq("user_id", user.id)
                .eq("media_id", media.id);

            if (error) {
                console.error("Error removing favourite:", error.message);
                setFavourites((prevFavourites) => [...prevFavourites, media.id]);
            }
        } catch (err) {
            console.error("Error in removeFromFavourites:", err);
            setFavourites((prevFavourites) => [...prevFavourites, media.id]);
        }
    }, [user]);

    // Add to playlist and sync with Supabase
    const addToPlaylist = useCallback(async (media: BaseMediaProps) => {
        if (!user) return;

        setPlaylist((prevPlaylist) => {
            if (!prevPlaylist.includes(media.id)) {
                return [...prevPlaylist, media.id];
            }
            return prevPlaylist;
        });

        try {
            const { error } = await supabase
                .from("playlist")
                .insert({ user_id: user.id, media_id: media.id });

            if (error) {
                console.error("Error adding to playlist:", error.message);
                setPlaylist((prevPlaylist) => prevPlaylist.filter((id) => id !== media.id));
            }
        } catch (err) {
            console.error("Error in addToPlaylist:", err);
            setPlaylist((prevPlaylist) => prevPlaylist.filter((id) => id !== media.id));
        }
    }, [user]);

    // Remove from playlist and sync with Supabase
    const removeFromPlaylist = useCallback(async (media: BaseMediaProps) => {
        if (!user) return;

        setPlaylist((prevPlaylist) => {
            const updatedPlaylist = prevPlaylist.filter((mId) => mId !== media.id);
            return updatedPlaylist;
        });

        try {
            const { error } = await supabase
                .from("playlist")
                .delete()
                .eq("user_id", user.id)
                .eq("media_id", media.id);

            if (error) {
                console.error("Error removing from playlist:", error.message);
                setPlaylist((prevPlaylist) => [...prevPlaylist, media.id]);
            }
        } catch (err) {
            console.error("Error in removeFromPlaylist:", err);
            setPlaylist((prevPlaylist) => [...prevPlaylist, media.id]);
        }
    }, [user]);

    // Add review to Supabase
    const addReview = useCallback(async (media: BaseMediaProps, review: Review) => {
        if (!user) return;

        console.log("Submitting review:", {
            user_id: user.id,
            media_id: media.id,
            media_type: "movie",
            content: review.content,
            author: review.author,
            agree: review.agree,
            rating: review.rating,
        });

        try {
            const { data, error } = await supabase
                .from("reviews")
                .upsert({
                    user_id: user.id,
                    media_id: media.id,
                    media_type: "movie",
                    content: review.content,
                    author: review.author,
                    agree: review.agree,
                    rating: review.rating,
                });

            if (error) {
                console.error("Error inserting review:", error.message);
            } else {
                console.log("Review inserted successfully:", data);
            }
        } catch (err) {
            console.error("Error in addReview:", err);
        }
    }, [user, setReviews]);

    // Get review from Supabase
    const getReview = useCallback(async (mediaId: number): Promise<Review | null> => {
        if (!user) {
            // If the user is not logged in, return null wrapped in a resolved Promise
            return Promise.resolve(null);
        }

        let review = reviews[mediaId];

        if (!review) {
            try {
                const { data, error } = await supabase
                    .from("reviews")
                    .select("*")
                    .eq("user_id", user?.id)
                    .eq("media_id", mediaId)
                    .single();

                if (error) {
                    console.error("Error fetching review:", error.message);
                    return null;
                }

                if (data) {
                    review = {
                        id: data.id,
                        content: data.content,
                        author: data.author,
                        agree: data.agree,
                        rating: data.rating,
                        movieId: data.media_id,
                    };
                    setReviews((prevReviews) => ({
                        ...prevReviews,
                        [mediaId]: review,
                    }));
                }
            } catch (err) {
                console.error("Error in getReview:", err);
                return null;
            }
        }

        return review || null;
    }, [reviews, user]);

    // Save a fantasy movie to Supabase
    const saveFantasyMovie = useCallback(async (movie: FantasyMovieFormData) => {
        if (!user) {
            alert("You need to be logged in to save your movie.");
            return;
        }

        let posterUrl = movie.poster;

        // Upload the poster if a file was selected
        if (movie.posterFile) {
            const fileName = `${Date.now()}_${movie.posterFile.name}`;
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from("fantasy-movie-posters")
                .upload(fileName, movie.posterFile);

            if (uploadError) {
                console.error("Error uploading image:", uploadError.message);
                alert("There was an error uploading the movie poster.");
                return;
            }

            if (uploadData) {
                const { data: publicUrlData } = supabase.storage
                    .from("fantasy-movie-posters")
                    .getPublicUrl(fileName);

                posterUrl = publicUrlData.publicUrl;
            }
        }

        // Save the movie data with the uploaded poster URL
        try {
            const { error } = await supabase.from("fantasy_movies").insert({
                user_id: user.id,
                title: movie.title,
                description: movie.description,
                genre_id: movie.genreId,
                genre_name: movie.genreName,
                release_date: movie.releaseDate,
                runtime: movie.runtime,
                director: movie.director,
                cast_members: movie.cast,
                oscar_winner: movie.oscarWinner,
                poster: posterUrl, // Use the URL or null
                production_company: movie.productionCompany,
            });

            if (error) {
                console.error("Error saving movie:", error.message);
                alert("There was an error saving your movie.");
            } else {
                alert("Fantasy movie saved successfully!");
            }
        } catch (err) {
            console.error("Error in saveFantasyMovie:", err);
            alert("There was an error saving your movie.");
        }
    }, [user]);


    // Fetch all fantasy movies for the logged-in user
    const getFantasyMovies = useCallback(async () => {
        if (!user) return [];

        try {
            const { data, error } = await supabase
                .from("fantasy_movies")
                .select("*")
                .eq("user_id", user.id);

            if (error) {
                console.error("Error fetching fantasy movies:", error.message);
                return [];
            }

            return data || [];
        } catch (err) {
            console.error("Error in getFantasyMovies:", err);
            return [];
        }
    }, [user]);

    return (
        <MediaContext.Provider
            value={{
                favourites,
                reviews,
                playlist,
                addToFavourites,
                removeFromFavourites,
                addReview,
                getReview,
                addToPlaylist,
                removeFromPlaylist,
                saveFantasyMovie, // Add this
                getFantasyMovies, // And this
            }}
        >
            {children}
        </MediaContext.Provider>
    );
};

export default MediaContextProvider;

import React, { useContext } from "react";
import PageTemplate from "../components/Templates/TemplateMovieListPage";
import { MediaContext } from "../contexts/mediaContext";
import { useQueries } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/UI/Spinner";
import RemoveFromPlaylist from "../components/Media/CardIcons/RemoveFromPlaylist";
import AddToFavouritesIcon from "../components/Media/CardIcons/AddToFavourites";

const PlaylistPage: React.FC = () => {
    const { playlist: movieIds } = useContext(MediaContext);

    const playlistMovieQueries = useQueries({
        queries: movieIds.map((movieId) => ({
            queryKey: ["movie", movieId],
            queryFn: () => getMovie(movieId.toString()),
        })),
    });

    const isLoading = playlistMovieQueries.some((m) => m.isLoading);

    if (isLoading) {
        return <Spinner />;
    }

    const allPlaylistMovies = playlistMovieQueries.map((q) => q.data).filter(Boolean);

    return (
        <>
            <PageTemplate
                title="Playlist"
                movies={allPlaylistMovies}
                action={(movie) => (
                    <>
                        <RemoveFromPlaylist movie={movie} />
                        <AddToFavouritesIcon movie={movie} />
                    </>
                )}
            />
        </>
    );
};

export default PlaylistPage;

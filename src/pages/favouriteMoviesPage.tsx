import React, { useContext } from "react";
import PageTemplate from "../components/Templates/TemplateMovieListPage";
import { MediaContext } from "../contexts/mediaContext";
import { useQueries } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/UI/Spinner";
import RemoveFromFavourites from "../components/Media/CardIcons/RemoveFromFavourites";
import WriteReview from "../components/Media/CardIcons/WriteReview";

const FavouriteMoviesPage: React.FC = () => {
    const { favourites: movieIds } = useContext(MediaContext);

    const favouriteMovieQueries = useQueries({
        queries: movieIds.map((movieId) => ({
            queryKey: ["movie", movieId],
            queryFn: () => getMovie(movieId.toString()),
        })),
    });

    const isLoading = favouriteMovieQueries.some((m) => m.isLoading);

    if (isLoading) {
        return <Spinner />;
    }

    const allFavourites = favouriteMovieQueries.map((q) => q.data).filter(Boolean);

    return (
        <>
            <PageTemplate
                title="Favourite Movies"
                movies={allFavourites}
                action={(movie) => (
                    <>
                        <RemoveFromFavourites movie={movie} />
                        <WriteReview movie={movie} />
                    </>
                )}
            />
        </>
    );
};

export default FavouriteMoviesPage;

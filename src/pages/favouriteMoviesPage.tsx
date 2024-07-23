import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
    titleFilter,
    genreFilter,
} from "../components/movieFilterUI";
import RemoveFromFavourites from "../components/cardIcons/removeFromFavourites";
import WriteReview from "../components/cardIcons/writeReview";

const titleFiltering = {
    name: "title",
    value: "",
    condition: titleFilter,
};
const genreFiltering = {
    name: "genre",
    value: "0",
    condition: genreFilter,
};

const FavouriteMoviesPage: React.FC = () => {
    const { favourites: movieIds } = useContext(MoviesContext);
    const { filterValues, setFilterValues, filterFunction } = useFiltering(
        [titleFiltering, genreFiltering]
    );

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
    const displayedMovies = filterFunction(allFavourites);

    const changeFilterValues = (type: string, value: string) => {
        const changedFilter = { name: type, value: value };
        const updatedFilterSet =
            type === "title" ? [changedFilter, filterValues[1]] : [filterValues[0], changedFilter];
        setFilterValues(updatedFilterSet);
    };

    return (
        <>
            <PageTemplate
                title="Favourite Movies"
                movies={displayedMovies}
                action={(movie) => (
                    <>
                        <RemoveFromFavourites movie={movie} />
                        <WriteReview movie={movie} />
                    </>
                )}
            />
            <MovieFilterUI
                onFilterValuesChange={changeFilterValues}
                titleFilter={filterValues[0].value}
                genreFilter={filterValues[1].value}
            />
        </>
    );
};

export default FavouriteMoviesPage;

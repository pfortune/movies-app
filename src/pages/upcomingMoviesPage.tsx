import React from "react";
import PageTemplate from "../components/Templates/TemplateMovieListPage";
import { BaseMovieProps } from "../types/interfaces";
import { getUpcomingMovies } from "../api/tmdb-api";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/UI/Spinner";
import AddToPlaylistIcon from "../components/Media/CardIcons/AddToPlaylist";

const UpcomingMoviesPage: React.FC = () => {
    const { data, error, isLoading, isError } = useQuery<BaseMovieProps[], Error>({
        queryKey: ['upcoming'],
        queryFn: getUpcomingMovies,
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 30,   // 30 minutes
        refetchOnWindowFocus: false,
    });

    console.log("Fetched Data:", data);

    const movies = data || [];
    console.log("Movies Array:", movies);

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>Error: {error.message}</h1>;
    }

    if (movies.length === 0) {
        return <h2>No movies found</h2>;
    }

    return (
        <>
            <PageTemplate
                title='Upcoming Movies'
                movies={movies}
                action={(movie: BaseMovieProps) => <><AddToPlaylistIcon {...movie} /></>}
            />
        </>
    );
};

export default React.memo(UpcomingMoviesPage);
